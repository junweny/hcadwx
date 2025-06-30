var RuleList = new Array();
RegisterRules();
//前端规则
//前端常用校验
//前端调用服务端
//唯一值检查
function CheckUniqueID(inputParams)
{
    Value = inputParams[0];
    BCName = inputParams[1];
    FieldName = inputParams[2];
	var OID=inputParams[3];

    //输入校验代码
    var ret = CheckUniqueID_Inner(BCName,FieldName,Value,OID);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret == 0)
        outputParams.ReturnCode="OK";
    else
        outputParams.ReturnCode = "FAIL";
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="值已存在";
    }
    return outputParams;
}

function CheckUniqueID_Inner(BCName,FieldName,Value,OID){
	var config = {methodName:"CheckUniqueID",params:{BCName:BCName,FieldName:FieldName,Value:Value,KeyValue:OID},async:false};
	return this.invoke(config);
}

//身份证的验证
function CheckCidInfo(inputParams) {
	value = inputParams[0];
	// 输入校验代码

	// 返回结果代码
	var outputParams = new Object();
	// 定义返回码
	outputParams.ReturnCode = CheckCidInfo_Inner(value);

	if (outputParams.ReturnCode == "OK") {
		outputParams.ReturnDescText = "合法";
	}
	if (outputParams.ReturnCode == "FAIL") {
		outputParams.ReturnDescText = "非法";
	}
	if (outputParams.ReturnCode == "FAIL_1") {
		outputParams.ReturnDescText = "Error:身份证号码出生日期超出范围或含有非法字符!";
	}
	if (outputParams.ReturnCode == "FAIL_2") {
		outputParams.ReturnDescText = "Error:身份证号码校验错误!";
	}
	if (outputParams.ReturnCode == "FAIL_3") {
		outputParams.ReturnDescText = "Error:身份证地区非法!";
	}
	return outputParams;
}

function CheckCidInfo_Inner(id_value) {
	var idcard = id_value.Trim();
	var Errors = new Array("OK", "FAIL", "FAIL_1", "FAIL_2", "FAIL_3");
	var area = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	};
	var idcard, Y, JYM;
	var S, M;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	if (area[parseInt(idcard.substr(0, 2))] == null) {
		// alert(Errors[4]);
		return Errors[4];
	}
	switch (idcard.length) {
		case 15 :
			if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0
					|| ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard
							.substr(6, 2)) + 1900)
							% 4 == 0)) {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; // 测试出生日期的合法性
			} else {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; // 测试出生日期的合法性
			}
			if (ereg.test(idcard)) {
				// alert(Errors[0] + " 15位身份证");
				return Errors[0];
			} else {
				// alert(Errors[2]);
				return Errors[2];
			}
			break;
		case 18 :
			// 18位身份号码检测
			// 出生日期的合法性检查
			// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
			// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
			if (parseInt(idcard.substr(6, 4)) % 4 == 0
					|| (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard
							.substr(6, 4))
							% 4 == 0)) {
				ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
			} else {
				ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
			}
			if (ereg.test(idcard)) { // 测试出生日期的合法性
				// 计算校验位
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
						* 7
						+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
						* 9
						+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
						* 10
						+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
						* 5
						+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
						* 8
						+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
						* 4
						+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
						* 2 + parseInt(idcard_array[7]) * 1
						+ parseInt(idcard_array[8]) * 6
						+ parseInt(idcard_array[9]) * 3;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1);
				if (M == idcard_array[17]) {
					// alert(Errors[0] + " 18位身份证");
					return Errors[0];
				} else {
					// alert(Errors[3]);
					return Errors[3];
				}
			} else {
				// alert(Errors[2]);
				return Errors[2];
			}
			break;
		default : // alert(Errors[1]);
			return Errors[1];
	}
}
// 扩展方法，去除字符串空格
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
//电子邮件地址验证
//电子邮件验证1
function check_email(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = checkemail_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else if (ret=="FAIL_0")
        outputParams.ReturnCode="FAIL_0";
    else if (ret=="FAIL_1")
        outputParams.ReturnCode="FAIL_1";
    else
        outputParams.ReturnCode = "OK";
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    if (outputParams.ReturnCode == "FAIL_0")
    {
       outputParams.ReturnDescText="输入为空";
    }
    if (outputParams.ReturnCode == "FAIL_1")
    {
       outputParams.ReturnDescText="输入不合规范";
    }
    return outputParams;
}

function checkemail_Inner(value ) {
    var re = /^[_a-zA-Z0-9\-\.]+@([\-_a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,3}$/;
    if ( (value == "") ) {
        return "FAIL_0";
    } else if (!value.match(re))    {
       return "FAIL_1";
    } else {
       return "OK";
    }
}

//电子邮件验证2
function validateEmail(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = validateEmail_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = "OK";

    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}

function validateEmail_Inner(value)
{
  var bAlert=false;
  var emailStr = value;
  var re=/^[\w.-]+@([0-9a-z][\w-]+\.)+[a-z]{2,3}$/i;
  //或 var re=new RegExp("^[\\w.-]+@([0-9a-z][\\w-]+\\.)+[a-z]{2,3}$","i");
  if(re.test(emailStr))
  {
    return "OK";
  }
  else
  {
    if(bAlert)
    {
      alert("无效email地址!");
    }
    return "FAIL";
  }
}
//日期时间验证
//日期验证(形如 :DD/MM/YYYY)
function dateCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = dateCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else if (ret=="FAIL_1")
        outputParams.ReturnCode="FAIL_1";
    else
        outputParams.ReturnCode = "OK";
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    if (outputParams.ReturnCode == "FAIL_1")
    {
       outputParams.ReturnDescText="请输入 DD/MM/YYYY 日期格式";
    }
    return outputParams;
}

function dateCheck_Inner(value)
{
    var re = new RegExp("^([0-9]{1,2})[./]{1}([0-9]{1,2})[./]{1}([0-9]{4})$");
    var ar;
    var res = true;
    if ((ar = re.exec(value)) != null){
        var i;
        i = parseFloat(ar[1]);
        // verify dd
        if (i <= 0 || i > 31){
            res = false;
        }
        i = parseFloat(ar[2]);
        // verify mm
        if (i <= 0 || i > 12){
            res = false;
        }
    }
    else
    {
        res = false;
    }
    if (!res)
    {
        res= "FAIL_1";
    }
    else
    {
        res= "OK";
    }
    return res;
}

//时间验证(形如 :13:04:06)
function timeCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = timeCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else if (ret=="FAIL_1")
        outputParams.ReturnCode="FAIL_1";
    else if (ret=="FAIL_2")
        outputParams.ReturnCode="FAIL_2";
    else if (ret=="FAIL_3")
        outputParams.ReturnCode="FAIL_3";
    else
        outputParams.ReturnCode = "OK";
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    if (outputParams.ReturnCode == "FAIL_1")
    {
       outputParams.ReturnDescText="输入的参数不是时间格式";
    }
    if (outputParams.ReturnCode == "FAIL_2")
    {
       outputParams.ReturnDescText="时间格式不对";
    }
    return outputParams;
}


function timeCheck_Inner(value)
{
    var a = value.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
    if (a == null) { return "FAIL_1";}
    if (a[1]>24 || a[3]>60 || a[4]>60)
    {
        return "FAIL_2"
    }
    return "OK";
}

//日期验证(形如 :2003-12-05)
function strDateCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = strDateCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = "OK";
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}

function strDateCheck_Inner(value)
{
    var r = value.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(r==null)return "FAIL";
    var d= new Date(r[1], r[3]-1, r[4]);
    if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
    return "OK";
    else
    return "FAIL";
}

//长日期验证(形如 :2003-12-05 13:04:06)
function datetimeCheck(inputParams)
{
        value = inputParams[0];
    //输入校验代码
    var ret = datetimeCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = "OK";
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}


function datetimeCheck_Inner(value)
{
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var r = value.match(reg);
    if(r==null)return "FAIL";
    var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);
    if (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7])
        return "OK";
    else
        return "FAIL"
}

//日期验证(YYYY-MM-DD)
function checkDate(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = checkDate_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else if (ret=="FAIL_0")
        outputParams.ReturnCode="FAIL_0";
    else if (ret=="FAIL_21")
        outputParams.ReturnCode="FAIL_21";
    else if (ret=="FAIL_22")
        outputParams.ReturnCode="FAIL_22";
    else if (ret=="FAIL_4")
        outputParams.ReturnCode="FAIL_4";
    else if (ret=="FAIL_6")
        outputParams.ReturnCode="FAIL_6";
    else if (ret=="FAIL_9")
        outputParams.ReturnCode="FAIL_9";
    else if (ret=="FAIL_11")
        outputParams.ReturnCode="FAIL_11";
    else
        outputParams.ReturnCode = "OK";
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    if (outputParams.ReturnCode == "FAIL_0")
    {
       outputParams.ReturnDescText="请按以下格式填写日期: YYYY-MM-DD";
    }
    if (outputParams.ReturnCode == "FAIL_21")
    {
       outputParams.ReturnDescText="闰年二月只有２９天";
    }
    if (outputParams.ReturnCode == "FAIL_22")
    {
       outputParams.ReturnDescText="平年二月只有２８天";
    }
    if (outputParams.ReturnCode == "FAIL_4")
    {
       outputParams.ReturnDescText="四月只有３０天";
    }
    if (outputParams.ReturnCode == "FAIL_6")
    {
       outputParams.ReturnDescText="六月只有３０天";
    }
    if (outputParams.ReturnCode == "FAIL_9")
    {
       outputParams.ReturnDescText="九月只有３０天";
    }
    if (outputParams.ReturnCode == "FAIL_11")
    {
       outputParams.ReturnDescText="十一月只有３０天";
    }
    return outputParams;
}




function checkDate_Inner(value)
{
	var str = value;
	var re=/^\d{4}-\d{1,2}-\d{1,2}$/;
	var r=value.match(re);
	if (r==null)
    {
	    return "FAIL_0";
    }
    else
    {
		var s=str.split("-");
	    var years = parseInt(s[0]);
		var months = parseInt(s[1]);
		var days = parseInt(s[2]);
		if (parseInt(s[0].substring(0,2))<19 || months>12 || months<1 || days>31 || days<1)
		{
			return "FAIL_0";
		}

		switch(months)
		{
			case 2:
				if((years%4 == 0 && years%100 != 0) || (years%400 == 0))
				{
					if(days > 29)
					{
						return "FAIL_21";
					}
				}
				else
				{
					if(days > 28)
					{
						return "FAIL_22";
					}
				}
				break;

			case 4:
				if(days > 30)
				{
					return "FAIL_4";
				}
				break;
			case 6:
				if(days > 30)
				{
					return "FAIL_6";
				}
				break;
			case 9:
				if(days > 30)
				{
					return "FAIL_9";

				}
				break;
			case 11:
				if(days > 30)
				{
				return "FAIL_11";
				}
				break;
			}
		return "OK";
	}
}
//IP地址验证
//IP地址验证
function IPCheck(inputParams)
{
        value = inputParams[0];
    //输入校验代码
    var ret = IPCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else if (ret=="FAIL_1")
        outputParams.ReturnCode="FAIL_1";
    else
        outputParams.ReturnCode = "OK";
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    if (outputParams.ReturnCode == "FAIL_1")
    {
       outputParams.ReturnDescText="输入IP错误，IP的第一个和最后一个数字不能小于1，其它数字不能小于0，且所有数字不能大于254 例如：192.168.0.1";
    }
    return outputParams;
}

function IPCheck_Inner(value)
{
	var re =/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	if(re.test(value))
	{
		if(RegExp.$1<1 ||RegExp.$1>254||RegExp.$2<0||RegExp.$2>254||RegExp.$3<0||RegExp.$3>254||RegExp.$4<1||RegExp.$4>254)
		{
			//alert("输入开IP错误，IP的第一个和最后一个数字不能小于1，其它数字不能小于0，且所有数字不能大于254 例如：192.168.0.1");
			return "FAIL_1";
		}
		else
		{
			return "OK";
		}
	}      else{
	 return "FAIL";
	}
}

//金额转换
//数字转为大写
function numberToChinese(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = numberToChinese_Inner(value);

    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = ret;
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    if (outputParams.ReturnCode == ret)
    {
       outputParams.ReturnDescText=ret;
    }
    return outputParams;
}



function numberToChinese_Inner(currencyDigits)
{
	// Constants:
	var MAXIMUM_NUMBER = 99999999999.99;
	// Predefine the radix characters and currency symbols for output:
	var CN_ZERO = "零";
	var CN_ONE = "壹";
	var CN_TWO = "贰";
	var CN_THREE = "叁";
	var CN_FOUR = "肆";
	var CN_FIVE = "伍";
	var CN_SIX = "陆";
	var CN_SEVEN = "柒";
	var CN_EIGHT = "捌";
	var CN_NINE = "玖";
	var CN_TEN = "拾";
	var CN_HUNDRED = "佰";
	var CN_THOUSAND = "仟";
	var CN_TEN_THOUSAND = "万";
	var CN_HUNDRED_MILLION = "亿";
	var CN_SYMBOL = "人民币";
	//var CN_SYMBOL = "";
	var CN_DOLLAR = "元";
	var CN_TEN_CENT = "角";
	var CN_CENT = "分";
	var CN_INTEGER = "整";

	// Variables:
	var integral; // Represent integral part of digit number.
	var decimal; // Represent decimal part of digit number.
	var outputCharacters; // The output result.
	var parts;
	var digits, radices, bigRadices, decimals;
	var zeroCount;
	var i, p, d;
	var quotient, modulus;

	// Validate input string:
	currencyDigits = currencyDigits.toString();
	if (currencyDigits == "")
	{
		//alert("Empty input!");
		return "FAIL";
	}
	if (currencyDigits.match(/[^,.\d]/) != null)
	{
		//alert("Invalid characters in the input string!");
		return "FAIL";
	}
	if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null)
	{
		//alert("Illegal format of digit number!");
		return "FAIL";
	}

	// Normalize the format of input digits:
	currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
	currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
	// Assert the number is not greater than the maximum number.
	if (Number(currencyDigits) > MAXIMUM_NUMBER)
	{
		//alert("Too large a number to convert!");
		return "FAIL";
	}

	// Process the coversion from currency digits to characters:
	// Separate integral and decimal parts before processing coversion:
	parts = currencyDigits.split(".");
	if (parts.length > 1)
	{
		integral = parts[0];
		decimal = parts[1];
		// Cut down redundant decimal digits that are after the second.
		decimal = decimal.substr(0, 2);
	}
	else
	{
		integral = parts[0];
		decimal = "";
	}
	// Prepare the characters corresponding to the digits:
	digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
	radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
	bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
	decimals = new Array(CN_TEN_CENT, CN_CENT);
	// Start processing:
	outputCharacters = "";
	// Process integral part if it is larger than 0:
	if (Number(integral) > 0)
	{
		zeroCount = 0;
		for (i = 0; i < integral.length; i++)
		{
			p = integral.length - i - 1;
			d = integral.substr(i, 1);
			quotient = p / 4;
			modulus = p % 4;
			if (d == "0")
			{
				zeroCount++;
			}
			else
			{
				if (zeroCount > 0)
				{
					outputCharacters += digits[0];
				}
				zeroCount = 0;
				outputCharacters += digits[Number(d)] + radices[modulus];
			}
			if (modulus == 0 && zeroCount < 4)
			{
				outputCharacters += bigRadices[quotient];
			}
		}
		outputCharacters += CN_DOLLAR;
	}
	// Process decimal part if there is:
	if (decimal != "")
	{
		for (i = 0; i < decimal.length; i++)
		{
			d = decimal.substr(i, 1);
			if (d != "0")
			{
				outputCharacters += digits[Number(d)] + decimals[i];
			}
		}
	}
	// Confirm and return the final output string:
	if (outputCharacters == "")
	{
		outputCharacters = CN_ZERO + CN_DOLLAR;
	}
	if (decimal == "")
	{
		//outputCharacters += CN_INTEGER;
	}
	if(outputCharacters=="零元")
	{
		outputCharacters="";
	}
	else
	{
	//去掉前面加的"人民币"及"整"
	//outputCharacters = CN_SYMBOL + outputCharacters + CN_INTEGER ;
	}
	return outputCharacters;
}
//大写转为数字
function chineseToNumber(inputParams)
{
        value = inputParams[0];
    //输入校验代码
    var ret = chineseToNumber_Inner(value);

    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = ret;

    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    if (outputParams.ReturnCode == ret)
    {
       outputParams.ReturnDescText=ret;
    }
    return outputParams;
}


//以下是转换为数字
function chineseToNumber_Inner(num)
{
var numArray = new Array()
var unit = "亿万圆$"
for (var i=0; i<unit.length; i++)
{
var re = eval("/"+ (numArray[i-1] ? unit.charAt(i-1) : "") +"(.*)"+unit.charAt(i)+"/")
if (num.match(re))
{
numArray[i] = num.match(re)[1].replace(/^拾/, "壹拾")
numArray[i] = numArray[i].replace(/[零壹贰叁肆伍陆柒捌玖]/g, function ($1)
{
return "零壹贰叁肆伍陆柒捌玖".indexOf($1)
})
numArray[i] = numArray[i].replace(/[分角拾佰仟]/g, function ($1)
{
return "*"+Math.pow(10, "分角 拾佰仟 ".indexOf($1)-2)+"+"
}).replace(/^\*|\+$/g, "").replace(/整/, "0")
numArray[i] = "(" + numArray[i] + ")*"+Math.ceil(Math.pow(10, (2-i)*4))
}
else numArray[i] = 0
}
return eval(numArray.join("+"))
}
//电话号码验证
//电话号码只允许输入数字和"-"
function telNoCheck(inputParams)
{
    value = inputParams[0];
    var outputParams = new Object();

    //定义返回码
    outputParams.ReturnCode=TelNoCheck_Inner(value)

    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    if (outputParams.ReturnCode == "FAIL_0")
    {
       outputParams.ReturnDescText="输入为空";
    }
    return outputParams;
}
function TelNoCheck_Inner(value){
       var re = /^[0-9]{3,4}\-[0-9]{7,8}$/;
       if (value == "") {
            return "FAIL_0";
       }
        else {
            if (value.match(re)) {
                return "OK";
             }
             else {
                return "FAIL";
             }
        }
}
//字符验证
//字符全部由a-z或者A-Z的字母
function charCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = charCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = "OK";
        
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}



function charCheck_Inner(value)
{
   if(/[^a-zA-Z]/g.test(value))
   return "FAIL";
   else
   return "OK";
}

//判断字符由字母和数字组成
function charNumCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    outputParams.ReturnCode="1";
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}
//验证字符是否包括(~!%^&*();\"?><[]{}\\|,:/=+-)
function charValueCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = charValueCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="OK")
        outputParams.ReturnCode="OK";
    else if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = ret;
        
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    else if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    else
    {
       outputParams.ReturnDescText=ret;
    }
    return outputParams;
}


function charValueCheck_Inner(value)
{
  var str = value;
  var SPECIAL_STR = "~!%^&*();\"?><[]{}\\|,:/=+-";
  for(i=0;i<str.length;i++)
  if (SPECIAL_STR.indexOf(str.charAt(i)) !=-1)
  {
      return "您的输入中不能包含以下非法字符("+SPECIAL_STR+")，请重输入！";
  }
  return "OK";
}

//手机号/小灵通号
function MobileNoCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = MobileNoCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = "OK";
        
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}


function MobileNoCheck_Inner(value)
{
    var regMobile = /^\d{11,12}$/;
    if(regMobile.test(value))
    {
        return "OK";
    }
    return "FAIL";
}

//网址验证
//网址验证
function URLCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = URLCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = "OK";


    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}


function URLCheck_Inner(value)
{
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
	+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
	+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
	+ "|" // 允许IP和DOMAIN（域名）
	+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
	+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
	+ "[a-z]{2,6})" // first level domain- .com or .museum
	+ "(:[0-9]{1,4})?" // 端口- :80
	+ "((/?)|" // a slash isn't required if there is no file name
	+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var re=new RegExp(strRegex);
	if (re.test(value)){
            return "OK";
	}else{
	    return "FAIL";
	}
}

//中文字符验证
function CNCharCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = CNCharCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = "OK";
        
        
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}


function CNCharCheck_Inner(value)
{
   var RegExpPtn=/^[\u4e00-\u9fa5]+$/;
   if (!RegExpPtn.test(value))
   {
      return "FAIL";
   }
   else
   {
      return "OK";
   }
}

//英文字符验证
function ENCharCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = ENCharCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = "OK";


    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}


function ENCharCheck_Inner(value)
{
   var RegExpPtn=/^[A-Za-z]+$/;
   if (!RegExpPtn.test(value))
   {
      return "FAIL";
   }
   else
   {
      return "OK";
   }
}

//比较两个值是否相同
function IsRepeat(inputParams)
{
    obj1 = inputParams[0];
    obj2 = inputParams[1];
	var outputParams = new Object();
	var ret = IsRepeat_Inner(obj1, obj2);
	
	if(ret){
	   outputParams.ReturnCode="OK";
	}else{
       outputParams.ReturnCode="FAIL";
	}

	if (outputParams.ReturnCode == "OK") {
		outputParams.ReturnDescText = "相同";
	}
    if (outputParams.ReturnCode == "FAIL") {
		outputParams.ReturnDescText = "不同";
	}
	return outputParams;
}
function IsRepeat_Inner(obj1, obj2)
{
    if (obj1 != obj2)
    {
       return false;
    }
    return true;
}
//校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字
function IsRegisterUserName(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    outputParams.ReturnCode = IsRegisterUserName_Inner(value);
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}
function IsRegisterUserName_Inner(value)
{
    var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    if (!patrn.test(value))
        return "FAIL"
    else
        return "OK";
}
//校验用户姓名：只能输入1-30个以字母开头的字串
function IsTrueName(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    outputParams.ReturnCode = IsTrueName_Inner(value);
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}

function IsTrueName_Inner(value)
{
    var patrn=/^[a-zA-Z]{1,30}$/;
    if (!patrn.test(value))
        return "FAIL";
    else
        return "OK";
}
//校验密码：只能输入6-20个字母、数字、下划线
function IsPasswd(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    outputParams.ReturnCode = IsPasswd_Inner(value);
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="必须由6-20个字母、数字、下划线组成";
    }
    return outputParams;
}

function IsPasswd_Inner(value)
{
    var patrn=/^(\w){6,20}$/;
    if (patrn.test(value))
        return "OK";
    else
        return "FAIL";
}
//邮政编码
function IsPostalCode(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    outputParams.ReturnCode=IsPostalCode_Inner(value);
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}

function IsPostalCode_Inner(value)
{
     var patrn=/^[1-9]\d{5}$/;
     if (!patrn.test(value))
         return "FAIL";
     else
         return "OK";
}
//禁止输入空格
function forbidSpace(inputParams){
	value = inputParams[0];

	var outputParams = new Object();
	outputParams.ReturnCode = forbidSpace_Inner(value);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else if(outputParams.ReturnCode == "Fail"){
		outputParams.ReturnDescText = "不允许输入空格";
	}
	return outputParams;
}

function forbidSpace_Inner(value){
    var regEx = /^.*[\s]+.*$/;
    if(regEx.test(value)){
        return "FAIL";
    }else{
        return "OK";
    }
}
//空值验证
function IsEmpty(inputParams){
	value = inputParams[0];
	var outputParams = new Object();
	outputParams.ReturnCode = IsEmpty_Inner(value);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else if(outputParams.ReturnCode == "FAIL"){
		outputParams.ReturnDescText = "输入不能为空";
	}
	return outputParams;
}

function IsEmpty_Inner(value){
    if(value.Trim().length == 0){
		return "FAIL";
	}else{
		return "OK";
	}
}
//数字类型验证
//百分数验证
function percentage(inputParams){
	value = inputParams[0];
	var outputParams = new Object();
	outputParams.ReturnCode = percentage_Inner(value);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else{
		outputParams.ReturnDescText = "非法";
	}
	return outputParams;
}

function percentage_Inner(value){
	var regEx = /^((0.)|([1-9][0-9]+\.))([0-9]+)(\%)$/;
	if(regEx.test(value)){
		return "OK";
	}else{
		return "FAIL";
	}
}
//格式为数字和_
function numericF(inputParams){
	value = inputParams[0];
	var outputParams = new Object();
	outputParams.ReturnCode = numericF_Inner(value);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else{
		outputParams.ReturnDescText = "非法";
	}
	return outputParams;
}

function numericF_Inner(value){
	var regEx = /^[\d_]+$/;
	if(regEx.test(value)){
		return "OK";
	}else{
		return "FAIL";
	}
}
//格式必须仅为数字0-9
function OnlyNumeric(inputParams)
{
    //输入校验代码
     var value = inputParams[0];
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    outputParams.ReturnCode=OnlyNumeric_Inner(value);
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}
function OnlyNumeric_Inner(value)
{
     var strP=/^\d+$/;
     if(strP.test(value))
         return "OK";
     else
         return "FAIL";
}
//实数字符验证
function NUMCharCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = NUMCharCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = "OK";


    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}


function NUMCharCheck_Inner(value)
{
   var RegExpPtn=/^(\+|-)?\d+($|\.\d+$)/;
   if (!RegExpPtn.test(value))
   {
      return "FAIL";
   }
   else
   {
      return "OK";
   }
}

//格式为数字和点(.)
function numericD(inputParams){
	value = inputParams[0];
	var outputParams = new Object();
	outputParams.ReturnCode = numericD_Inner(value);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else{
		outputParams.ReturnDescText = "非法";
	}
	return outputParams;
}

function numericD_Inner(value){
	var regEx = /^[\d.]+$/;
	if(regEx.test(value)){
		return "OK";
	}else{
		return "FAIL";
	}
}
//格式为数字、点(.)和负号(-)
function numericDF(inputParams){
	value = inputParams[0];
	var outputParams = new Object();
	outputParams.ReturnCode = numericDF_Inner(value);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else{
		outputParams.ReturnDescText = "非法";
	}
	return outputParams;
}

function numericDF_Inner(value){
	var regEx = /^[\d.-]+$/;
	if(regEx.test(value)){
		return "OK";
	}else{
		return "FAIL";
	}
}
//格式为数字和逗号(,)
function numericB(inputParams){
	value = inputParams[0];
	var outputParams = new Object();
	outputParams.ReturnCode = numericB_Inner(value);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else{
		outputParams.ReturnDescText = "非法";
	}
	return outputParams;
}

function numericB_Inner(value){
	var regEx = /^[\d,]+$/;
	if(regEx.test(value)){
		return "OK";
	}else{
		return "FAIL";
	}
}
//限定不能输入的字符
function contain(inputParams){
	value = inputParams[0];
	strForbid = inputParams[1];
	var outputParams = new Object();
	outputParams.ReturnCode = contain_Inner(value,strForbid);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else{
		outputParams.ReturnDescText = "非法";
	}
	return outputParams;
}

function contain_Inner(value,strForbid){
	for(var i=0;i<strForbid.length;i++){
		if(value.indexOf(strForbid.charAt(i)) >= 0){
			return "FAIL";
		}else{
			return "OK";
		}
	}
}
//格式为数字、点(.)和逗号(,)
function numericDB(inputParams){
	value = inputParams[0];
	var outputParams = new Object();
	outputParams.ReturnCode = numericDB_Inner(value);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else{
		outputParams.ReturnDescText = "非法";
	}
	return outputParams;
}

function numericDB_Inner(value){
	var regEx = /^[\d.,]+$/;
	if(regEx.test(value)){
		return "OK";
	}else{
		return "FAIL";
	}
}
//格式为数字、负号(-)和逗号(,)
function numericFB(inputParams){
	value = inputParams[0];
	var outputParams = new Object();
	outputParams.ReturnCode = numericFB_Inner(value);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else{
		outputParams.ReturnDescText = "非法";
	}
	return outputParams;
}

function numericFB_Inner(value){
	var regEx = /^[\d-,]+$/;
	if(regEx.test(value)){
		return "OK";
	}else{
		return "FAIL";
	}
}
//格式为数字、点(.)、负号(-)和逗号(,)
function numericDFB(inputParams){
	value = inputParams[0];
	var outputParams = new Object();
	outputParams.ReturnCode = numericDFB_Inner(value);
	if(outputParams.ReturnCode == "OK"){
		outputParams.ReturnDescText = "合法";
	}else{
		outputParams.ReturnDescText = "非法";
	}
	return outputParams;
}

function numericDFB_Inner(value){
	var regEx = /^[\d-,]+$/;
	if(regEx.test(value)){
		return "OK";
	}else{
		return "FAIL";
	}
}
//电话号码/手机号/小灵通号
function telMobileNoCheck(inputParams)
{
    value = inputParams[0];
    //输入校验代码
    var ret = telMobileNoCheck_Inner(value);
    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    if (ret=="FAIL")
        outputParams.ReturnCode="FAIL";
    else
        outputParams.ReturnCode = "OK";


    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText="非法";
    }
    return outputParams;
}


function telMobileNoCheck_Inner(value)
{
    var regtelMobile = /^\d{11,12}$/;
    var re = /^[0-9]{3,4}\-[0-9]{7,8}$/;
    if (value != "") {
        if (regtelMobile.test(value) || value.match(re)) {
            return "OK";
        }
    }
    return "FAIL";
}

function IsPasswordLevel(inputParams)
{
    value = inputParams[0];
    level = inputParams[1];
    pwdlength = inputParams[3];
    //输入校验代码

    //返回结果代码
    var outputParams = new Object();
    //定义返回码
    outputParams.ReturnCode = IsPasswdLevel_Inner(value, level, pwdlength);
    if(outputParams.ReturnCode == "ERROR")
    {
        outputParams.ReturnDescText="密码长度不能少于"+pwdlength;
    }
    if (outputParams.ReturnCode == "OK")
    {
       outputParams.ReturnDescText="合法";
    }
    if (outputParams.ReturnCode == "FAIL")
    {
       outputParams.ReturnDescText=inputParams[2];
    }
    return outputParams;
}
function IsPasswdLevel_Inner(value, level, pwdlen)
{
    var pwdLevel = getPwdSecurityLevel(value, pwdlen);
    if(pwdLevel == -1)
        return "ERROR";
    if(pwdLevel > parseInt(level))
        return "OK";
    else
        return "FAIL";
}
function getPwdSecurityLevel(pwd, pwdlen)
{
    var securityLevel = 0;
    if(pwd.length < parseInt(pwdlen)) {
        return -1;
    }else {
        if(/[a-z]/.test(pwd)) {
            securityLevel++;
        }
        if(/[A-Z]/.test(pwd)) {
            securityLevel++;
        }
        if(/[0-9]/.test(pwd)) {
            securityLevel++;
        }
        if(containSpecialChar(pwd)) {
            securityLevel++;
        }
        return securityLevel;
    }
}
function containSpecialChar(str) {
    var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
    return (containSpecial.test(str));
}

function RegisterRules()
{
   var obj = new Object();
   obj.Function = "CheckUniqueID";
   obj.SuccessText = "";
   obj.ErrorText = "值已存在";
   obj.OtherResult = new Array();
   RuleList[0] = obj;

   var obj = new Object();
   obj.Function = "CheckCidInfo";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[1] = obj;

   var obj = new Object();
   obj.Function = "check_email";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[2] = obj;

   var obj = new Object();
   obj.Function = "validateEmail";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[3] = obj;

   var obj = new Object();
   obj.Function = "dateCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[4] = obj;

   var obj = new Object();
   obj.Function = "timeCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[5] = obj;

   var obj = new Object();
   obj.Function = "strDateCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[6] = obj;

   var obj = new Object();
   obj.Function = "datetimeCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[7] = obj;

   var obj = new Object();
   obj.Function = "checkDate";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[8] = obj;

   var obj = new Object();
   obj.Function = "IPCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[9] = obj;

   var obj = new Object();
   obj.Function = "numberToChinese";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[10] = obj;

   var obj = new Object();
   obj.Function = "chineseToNumber";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[11] = obj;

   var obj = new Object();
   obj.Function = "telNoCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[12] = obj;

   var obj = new Object();
   obj.Function = "charCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[13] = obj;

   var obj = new Object();
   obj.Function = "charNumCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[14] = obj;

   var obj = new Object();
   obj.Function = "charValueCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[15] = obj;

   var obj = new Object();
   obj.Function = "MobileNoCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[16] = obj;

   var obj = new Object();
   obj.Function = "URLCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[17] = obj;

   var obj = new Object();
   obj.Function = "CNCharCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[18] = obj;

   var obj = new Object();
   obj.Function = "ENCharCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[19] = obj;

   var obj = new Object();
   obj.Function = "IsRepeat";
   obj.SuccessText = "相同";
   obj.ErrorText = "不同";
   obj.OtherResult = new Array();
   RuleList[20] = obj;

   var obj = new Object();
   obj.Function = "IsRegisterUserName";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[21] = obj;

   var obj = new Object();
   obj.Function = "IsTrueName";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[22] = obj;

   var obj = new Object();
   obj.Function = "IsPasswd";
   obj.SuccessText = "合法";
   obj.ErrorText = "必须由6-20个字母、数字、下划线组成";
   obj.OtherResult = new Array();
   RuleList[23] = obj;

   var obj = new Object();
   obj.Function = "IsPostalCode";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[24] = obj;

   var obj = new Object();
   obj.Function = "forbidSpace";
   obj.SuccessText = "合法";
   obj.ErrorText = "不允许输入空格";
   obj.OtherResult = new Array();
   RuleList[25] = obj;

   var obj = new Object();
   obj.Function = "IsEmpty";
   obj.SuccessText = "合法";
   obj.ErrorText = "输入不能为空";
   obj.OtherResult = new Array();
   RuleList[26] = obj;

   var obj = new Object();
   obj.Function = "percentage";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[27] = obj;

   var obj = new Object();
   obj.Function = "numericF";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[28] = obj;

   var obj = new Object();
   obj.Function = "OnlyNumeric";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[29] = obj;

   var obj = new Object();
   obj.Function = "NUMCharCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[30] = obj;

   var obj = new Object();
   obj.Function = "numericD";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[31] = obj;

   var obj = new Object();
   obj.Function = "numericDF";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[32] = obj;

   var obj = new Object();
   obj.Function = "numericB";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[33] = obj;

   var obj = new Object();
   obj.Function = "contain";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[34] = obj;

   var obj = new Object();
   obj.Function = "numericDB";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[35] = obj;

   var obj = new Object();
   obj.Function = "numericFB";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[36] = obj;

   var obj = new Object();
   obj.Function = "numericDFB";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[37] = obj;

   var obj = new Object();
   obj.Function = "telMobileNoCheck";
   obj.SuccessText = "合法";
   obj.ErrorText = "非法";
   obj.OtherResult = new Array();
   RuleList[38] = obj;

    var obj = new Object();
   obj.Function = "IsPasswordLevel";
   obj.SuccessText = "合法";
   obj.ErrorText = "";
   obj.OtherResult = new Array();
   RuleList[39] = obj;
}

function FindRule(funcName)
{
	for (var i=0;i<RuleList.length;i++)
	{
		if (RuleList[i].Function == funcName)
		{
			return RuleList[i];
		}
	}
	return null;
}

function ExecuteRule(func,inputParams)
{
    var ruleObj=FindRule(func)
    if (ruleObj!=null)
    {
	      var objfunc = eval(func);
	      var res = objfunc(inputParams);
		    return res;
   }
}

