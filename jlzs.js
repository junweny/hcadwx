var BusinessObject = new UCML.BusinessUnit();
BusinessObject.BPOName = "jlzs";
BusinessObject.fitWindow =false;
var ShortCutKeyList = [];
var VC_jlsjForm;
var VC_jlsjFormColumns;
var BC_jlsjBase;
var BC_jlsjColumns;
function onInit()
{
    BC_jlsjBase = new UCML.BusinessComponent();
    BC_jlsjBase.BusinessObject = BusinessObject;
    BC_jlsjBase.TableName = "jlsj";
    BC_jlsjBase.BCName = "BC_jlsj";
    BC_jlsjBase.fIDENTITYKey = false;
    BC_jlsjBase.AllowModifyJION = false;
    BC_jlsjBase.fHaveUCMLKey = true;
    BC_jlsjBase.PrimaryKey = "jlsjOID";
    BC_jlsjBase.loaded = true;
    BC_jlsjBase.columns = BC_jlsjColumns;
    BC_jlsjBase.BPOName = "jlzs";
    BC_jlsjBase.ChangeOnlyOwnerBy = false;
    BC_jlsjBase.EnabledEdit=true;
    BC_jlsjBase.EnabledAppend=false;
    BC_jlsjBase.EnabledDelete=false;
    BC_jlsjBase.RecordOwnerType=0;
    BC_jlsjBase.open();

    VC_jlsjForm = new UCML.Edit("VC_jlsjForm");
    VC_jlsjForm.BusinessObject = BusinessObject;
    VC_jlsjForm.dataTable = BC_jlsjBase;
    VC_jlsjForm.columns = VC_jlsjFormColumns;
            VC_jlsjForm.enabledEdit=true;
    VC_jlsjForm.haveMenu=true;
    VC_jlsjForm.HiddenID="";
    VC_jlsjForm.fHidden="false";
    VC_jlsjForm.alignHeight="false";
    VC_jlsjForm.alignWidth="false";
    VC_jlsjForm.parentNodeID="";
    VC_jlsjForm.IsJQMPage=false;
    VC_jlsjForm.JQMPageTheme="";


VC_jlsjForm.haveMenu = false;


    VC_jlsjForm.open();
    UCML.on("TUCMLMButton1","click", TUCMLMButton1_onclick,Form1.TUCMLMButton1);
    UCML.on("TUCMLMButton2","click", TUCMLMButton2_onclick,Form1.TUCMLMButton2);
}
function VC_jlsjFormExtMenuClick(cmd)
{
}

function VC_jlsjFormmenuready()
{
}
function InitCustomInput()
{
}
function onRender()
{

}
function onBeforeOpen()
{


}
function BusinessInit()
{
//UCML说明,类型:VC,对象ID:13909,方法类型:事件,方法名:OnJsInit,对象名称:VC_jlsjForm


//UCML说明结束
//UCML说明,类型:BPO,对象ID:16522,方法类型:事件,方法名:OnJsInit,对象名称:jlzs
Callfn_Getsfzsyl();

//UCML说明结束
//UCML说明,类型:BC,对象ID:11877,方法类型:事件,方法名:OnJsInit,对象名称:BC_jlsj


//UCML说明结束
}

function BeforeSubmit()
{




    return true
}


 function AfterSubmit()
{




}

function CanSubmit()
{
    var result=true
    for ( var i=0;i<this.UseTableList.length;i++)
    {
        result = this.UseTableList[i].Valiate();
        if (result==false) break;
    }


    return result;
}

function BC_jlsjOnFieldChange(e)
{
}

function Callcount(zstxm)
{
    var config ={methodName:"count", params:{zstxm:zstxm}, onSuccess:this.succeeded_count, onFailure:this.failed_count};
    return this.invoke(config);
}
function succeeded_count(obj, text, methodName)
{
if(text==0)
{
    $("#sid").text("未找到证书，请24小时后再查，如还未查到，请与发证单位联系!");
    $("#sid").show();
}
else
{
$("#sid").hide();
}
}

function failed_count(obj, text, methodName)
{
    alert(text);
}

function getQueryString(name) {
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
var r = window.location.search.substr(1).match(reg);
if (r != null) return unescape(r[2]); return null;
}
function Callfn_Getsfzsyl()
{
    var config ={methodName:"fn_Getsfzsyl", params:{}, onSuccess:this.succeeded_fn_Getsfzsyl, onFailure:this.failed_fn_Getsfzsyl};
    return this.invoke(config);
}
function succeeded_fn_Getsfzsyl(obj, text, methodName)
{
    if(text=="1")
	{
	   $("#TUCMLMButton2").parent().css('display','display');
	}else
	{
	    $("#TUCMLMButton2").parent().css('display','none');
	}
	
	
	
	var a=getQueryString("a");
	var b=getQueryString("b");
	
	if(a!=null)
	{
	if(fsql(a))
	{
	    $("#sid").text("url参数中不能包含非法字符!");
	    $("#sid").show();
	     return false;
	}else
	{
		var SqlCondi="(jlsj.zstxm='"+a+"') or (jlsj.zsbh='"+a+"') or (jlsj.dh+jlsj.xh='"+a+"') or (jlsj.mxsid='"+a+"')"
		condiQuery("", "", "", SqlCondi);
		Callcount(a);
	}
	}
	if(b!=null)
	{
   if(fsql(b))
	{
	    $("#sid").text("url参数中不能包含非法字符!");
	    $("#sid").show();
	     return false;
	}else
	{
		var SqlCondi="(jlsj.zstxm='"+b+"') or (jlsj.zsbh='"+b+"') or (jlsj.dh+jlsj.xh='"+b+"') or (jlsj.mxsid='"+b+"')"
		condiQuery("", "", "", SqlCondi);
		Callcount(b);
	}
	}
	$("#TUCMLMButton1").parent().addClass("ui-btn-active");
}

function failed_fn_Getsfzsyl(obj, text, methodName)
{
    alert(text);
}

function fsql(str)
{
   var inj_str = "'|and|exec|insert|select|delete|primary key|table|from|all|create|update|count|*|%|chr|mid|master|truncate|alter|drop|char|1=1|1=2|declare|;|or|+|,";
   var inj_stra= inj_str.split("|");
   for (var i=0; i < inj_stra.length; i++ )
   {
       if (str.toLowerCase().includes(inj_stra[i].toLowerCase()))
       {
        return true;
       }
   }
   return false;
}
function TUCMLMButton1_onclick( Sender)
{
	var zstxm=$("#cx").val();
	if(zstxm=="")
	{
	 $("#sid").show();
	 $("#sid").text("请输入查询条件!");
	 return false;
	}else
	{
	if(fsql(zstxm))
	{
	
		$("#sid").text("查询条件中不能包含非法字符!");
		$("#sid").show();
		return false;
	}else
	{
	var SqlCondi="(jlsj.zstxm='"+zstxm+"') or (jlsj.zsbh='"+zstxm+"') or (jlsj.dh+jlsj.xh='"+zstxm+"') or (jlsj.mxsid='"+zstxm+"')"
	condiQuery("", "", "", SqlCondi);
	}
	
	//var count=BC_jlsjBase.getRecordCount();
	
	Callcount(zstxm);
	}
}

function TUCMLMButton2_onclick( Sender)
{
	if(BC_jlsjBase.getFieldValue("dh")!="" && BC_jlsjBase.getFieldValue("dh")!="")
	{
		//var clsbbh="123";
		var mxsid = BC_jlsjBase.getFieldValue("mxsid");
		var url = "zsjs/"+mxsid+".pdf";
		var url = "BPO_zsyl.aspx?url="+url;
	    var w = OpenWindow(url,"在线预览",3);
	    if(w && w.on){
	    	w.on("close",function(){BC_jlsjBase.Refresh();
	    	})
	    }
	}
	else
	{
        $("#sid").show();
		$("#sid").text("没有对应的证书文件可预览!");
	}
}

function PrepareColumn() 
{
    BC_jlsjColumns = new Array();
    objColumn = new Object();
    objColumn.fieldName = "jlsjOID";
    objColumn.caption = "主键 ";
    objColumn.length = 0;
    objColumn.decLength = 0;
    objColumn.fieldType = "UCMLKey";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = false;
    objColumn.defaultValue = "";
    objColumn.allowModify = false;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "mxsid";
    objColumn.caption = "mxsid ";
    objColumn.length = 50;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "dh";
    objColumn.caption = "单号 ";
    objColumn.length = 50;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "xh";
    objColumn.caption = "序号 ";
    objColumn.length = 50;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "tele";
    objColumn.caption = "tele ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "wtdh";
    objColumn.caption = "委托单号 ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "qymc";
    objColumn.caption = "企业名称 ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "sjrq";
    objColumn.caption = "sjrq ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "yqmc";
    objColumn.caption = "仪器名称 ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "ccbh";
    objColumn.caption = "出厂编号 ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "xhgg";
    objColumn.caption = "xhgg ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "zqdjdj";
    objColumn.caption = "管理编号 ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "zsbh";
    objColumn.caption = "证书编号 ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "zszt";
    objColumn.caption = "zszt ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "zzcj";
    objColumn.caption = "zzcj ";
    objColumn.length = 500;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "zstxm";
    objColumn.caption = "证书条形码 ";
    objColumn.length = 50;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "jcrq";
    objColumn.caption = "接收日期 ";
    objColumn.length = 50;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "yxrq";
    objColumn.caption = "yxrq ";
    objColumn.length = 50;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "jdry";
    objColumn.caption = "jdry ";
    objColumn.length = 100;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "shry";
    objColumn.caption = "shry ";
    objColumn.length = 100;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "sqry";
    objColumn.caption = "sqry ";
    objColumn.length = 100;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "jdjg";
    objColumn.caption = "jdjg ";
    objColumn.length = 100;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "cjks";
    objColumn.caption = "cjks ";
    objColumn.length = 100;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "xgsjsj";
    objColumn.caption = "xgsjsj ";
    objColumn.length = 50;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "jcfy";
    objColumn.caption = "jcfy ";
    objColumn.length = 20;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "sfzt";
    objColumn.caption = "sfzt ";
    objColumn.length = 20;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "";
    objColumn.isCodeTable = false;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "sfxsq";
    objColumn.caption = "是否显示全 ";
    objColumn.length = 50;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "mcxs";
    objColumn.isCodeTable = true;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "sfzsyl";
    objColumn.caption = "是否显示证书预览按钮 ";
    objColumn.length = 50;
    objColumn.decLength = 0;
    objColumn.fieldType = "VarChar";
    objColumn.codeTable = "CodeT_FixFlow";
    objColumn.isCodeTable = true;
    objColumn.allowNull = true;
    objColumn.defaultValue = "";
    objColumn.allowModify = true;
    objColumn.foreignKeyField = "";
    objColumn.lookupKeyField = "";
    objColumn.lookupDataSet = "";
    objColumn.lookupResultField = "";
    objColumn.isForeignKey = false;
    objColumn.fieldKind = 0;
    objColumn.isMultiValueField = false;
    objColumn.multiValueTable = "";
    objColumn.isFunctionInitValue = false;
    objColumn.initValueFunc = "";
    objColumn.excelColNo = 0;
    objColumn.IsImageBase64Data = false;
    objColumn.QueryRefColumn = "";
    objColumn.dateTimeFormat = "";
    BC_jlsjColumns[BC_jlsjColumns.length] = objColumn;

    VC_jlsjFormColumns = new Array();
    objColumn = new Object();
    objColumn.fieldName = "zsbh";
    objColumn.caption = "证书编号 ";
    objColumn.display = true;
    objColumn.allowModify = true;
    objColumn.width = 210;
    objColumn.isFixColumnValue = false;
    objColumn.fixColumnValue = "";
    objColumn.isCustomerControl = false;
    objColumn.align = "left";
    objColumn.customerControl = "";
    objColumn.controlID = "";
    objColumn.editContrl = "";
    objColumn.PromptText = "";
    objColumn.EditType = "UCML.TextBox";
    objColumn.mutiValueCol = false;
    objColumn.inputTip = "";
    VC_jlsjFormColumns[VC_jlsjFormColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "dh";
    objColumn.caption = "系统单号 ";
    objColumn.display = true;
    objColumn.allowModify = true;
    objColumn.width = 210;
    objColumn.isFixColumnValue = false;
    objColumn.fixColumnValue = "";
    objColumn.isCustomerControl = false;
    objColumn.align = "left";
    objColumn.customerControl = "";
    objColumn.controlID = "";
    objColumn.editContrl = "";
    objColumn.PromptText = "";
    objColumn.EditType = "UCML.TextBox";
    objColumn.mutiValueCol = false;
    objColumn.inputTip = "";
    VC_jlsjFormColumns[VC_jlsjFormColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "xh";
    objColumn.caption = "序号 ";
    objColumn.display = true;
    objColumn.allowModify = true;
    objColumn.width = 210;
    objColumn.isFixColumnValue = false;
    objColumn.fixColumnValue = "";
    objColumn.isCustomerControl = false;
    objColumn.align = "left";
    objColumn.customerControl = "";
    objColumn.controlID = "";
    objColumn.editContrl = "";
    objColumn.PromptText = "";
    objColumn.EditType = "UCML.TextBox";
    objColumn.mutiValueCol = false;
    objColumn.inputTip = "";
    VC_jlsjFormColumns[VC_jlsjFormColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "wtdh";
    objColumn.caption = "委托单号 ";
    objColumn.display = true;
    objColumn.allowModify = true;
    objColumn.width = 210;
    objColumn.isFixColumnValue = false;
    objColumn.fixColumnValue = "";
    objColumn.isCustomerControl = false;
    objColumn.align = "left";
    objColumn.customerControl = "";
    objColumn.controlID = "";
    objColumn.editContrl = "";
    objColumn.PromptText = "";
    objColumn.EditType = "UCML.TextBox";
    objColumn.mutiValueCol = false;
    objColumn.inputTip = "";
    VC_jlsjFormColumns[VC_jlsjFormColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "qymc";
    objColumn.caption = "证书单位 ";
    objColumn.display = true;
    objColumn.allowModify = true;
    objColumn.width = 210;
    objColumn.isFixColumnValue = false;
    objColumn.fixColumnValue = "";
    objColumn.isCustomerControl = false;
    objColumn.align = "left";
    objColumn.customerControl = "";
    objColumn.controlID = "";
    objColumn.editContrl = "";
    objColumn.PromptText = "";
    objColumn.EditType = "UCML.TextBox";
    objColumn.mutiValueCol = false;
    objColumn.inputTip = "";
    VC_jlsjFormColumns[VC_jlsjFormColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "jcrq";
    objColumn.caption = "接收日期 ";
    objColumn.display = true;
    objColumn.allowModify = true;
    objColumn.width = 210;
    objColumn.isFixColumnValue = false;
    objColumn.fixColumnValue = "";
    objColumn.isCustomerControl = false;
    objColumn.align = "left";
    objColumn.customerControl = "";
    objColumn.controlID = "";
    objColumn.editContrl = "";
    objColumn.PromptText = "";
    objColumn.EditType = "UCML.TextBox";
    objColumn.mutiValueCol = false;
    objColumn.inputTip = "";
    VC_jlsjFormColumns[VC_jlsjFormColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "yqmc";
    objColumn.caption = "仪器名称 ";
    objColumn.display = true;
    objColumn.allowModify = true;
    objColumn.width = 210;
    objColumn.isFixColumnValue = false;
    objColumn.fixColumnValue = "";
    objColumn.isCustomerControl = false;
    objColumn.align = "left";
    objColumn.customerControl = "";
    objColumn.controlID = "";
    objColumn.editContrl = "";
    objColumn.PromptText = "";
    objColumn.EditType = "UCML.TextBox";
    objColumn.mutiValueCol = false;
    objColumn.inputTip = "";
    VC_jlsjFormColumns[VC_jlsjFormColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "ccbh";
    objColumn.caption = "出厂编号 ";
    objColumn.display = true;
    objColumn.allowModify = true;
    objColumn.width = 210;
    objColumn.isFixColumnValue = false;
    objColumn.fixColumnValue = "";
    objColumn.isCustomerControl = false;
    objColumn.align = "left";
    objColumn.customerControl = "";
    objColumn.controlID = "";
    objColumn.editContrl = "";
    objColumn.PromptText = "";
    objColumn.EditType = "UCML.TextBox";
    objColumn.mutiValueCol = false;
    objColumn.inputTip = "";
    VC_jlsjFormColumns[VC_jlsjFormColumns.length] = objColumn;

    objColumn = new Object();
    objColumn.fieldName = "zqdjdj";
    objColumn.caption = "管理编号 ";
    objColumn.display = true;
    objColumn.allowModify = true;
    objColumn.width = 210;
    objColumn.isFixColumnValue = false;
    objColumn.fixColumnValue = "";
    objColumn.isCustomerControl = false;
    objColumn.align = "left";
    objColumn.customerControl = "";
    objColumn.controlID = "";
    objColumn.editContrl = "";
    objColumn.PromptText = "";
    objColumn.EditType = "UCML.TextBox";
    objColumn.mutiValueCol = false;
    objColumn.inputTip = "";
    VC_jlsjFormColumns[VC_jlsjFormColumns.length] = objColumn;

    PrepareExColumn();
}
