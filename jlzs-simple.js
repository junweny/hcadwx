// 简化版本的计量证书查询系统
// 移除UCML依赖，使用纯JavaScript实现

$(document).ready(function() {
    // 页面加载完成后初始化
    initPage();
    
    // 绑定按钮点击事件
    $("#TUCMLMButton1").on("click", function() {
        TUCMLMButton1_onclick();
    });
    
    $("#TUCMLMButton2").on("click", function() {
        TUCMLMButton2_onclick();
    });
    
    // 绑定回车键事件
    $("#cx").on("keypress", function(e) {
        if (e.which === 13) {
            TUCMLMButton1_onclick();
        }
    });
});

// 页面初始化
function initPage() {
    // 检查URL参数
    var a = getQueryString("a");
    var b = getQueryString("b");
    
    if (a != null) {
        if (fsql(a)) {
            $("#sid").text("url参数中不能包含非法字符!");
            $("#sid").show();
            return false;
        } else {
            queryLocalJSON(a);
        }
    }
    
    if (b != null) {
        if (fsql(b)) {
            $("#sid").text("url参数中不能包含非法字符!");
            $("#sid").show();
            return false;
        } else {
            queryLocalJSON(b);
        }
    }
    
    // 默认隐藏证书预览按钮
    $("#TUCMLMButton2").parent().hide();
}

// 查询按钮点击事件
function TUCMLMButton1_onclick() {
    var zstxm = $("#cx").val();
    if (zstxm == "") {
        $("#sid").show();
        $("#sid").text("请输入查询条件!");
        return false;
    } else {
        if (fsql(zstxm)) {
            $("#sid").text("查询条件中不能包含非法字符!");
            $("#sid").show();
            return false;
        } else {
            // 请求本地JSON接口
            queryLocalJSON(zstxm);
        }
    }
}

// 请求本地JSON接口
function queryLocalJSON(queryValue) {
    // 隐藏错误信息
    $("#sid").hide();
    
    // 显示加载状态
    $("#TUCMLMButton1").val("查询中...").prop("disabled", true);
    
    // 显示加载中的图片和文字
    showLoadingIndicator();

    // 延迟1秒后再执行AJAX查询
    setTimeout(function() {
        $.ajax({
            url: "data/certificates.json",
            type: "GET",
            dataType: "json",
            success: function(response) {
                // 隐藏加载指示器
                hideLoadingIndicator();
                $("#TUCMLMButton1").val("查询").prop("disabled", false);
                
                if (response.success) {
                    // 在数据中查找匹配的记录
                    var matchedRecord = null;
                    for (var i = 0; i < response.data.length; i++) {
                        var record = response.data[i];
                        // 匹配证书条码、证书编号、系统单号+序号
                        if (record.zstxm === queryValue || 
                            record.zsbh === queryValue || 
                            (record.dh + record.xh) === queryValue) {
                            matchedRecord = record;
                            break;
                        }
                    }
                    
                    if (matchedRecord) {
                        // 填充表单数据
                        fillFormData(matchedRecord);
                        $("#sid").hide();
                    } else {
                        // 未找到匹配记录
                        $("#sid").text("未找到证书，请24小时后再查，如还未查到，请与发证单位联系!");
                        $("#sid").show();
                        clearFormData();
                    }
                } else {
                    $("#sid").text("查询失败：" + response.message);
                    $("#sid").show();
                }
            },
            error: function(xhr, status, error) {
                // 隐藏加载指示器
                hideLoadingIndicator();
                $("#TUCMLMButton1").val("查询").prop("disabled", false);
                $("#sid").text("网络错误，请稍后重试");
                $("#sid").show();
                console.error("AJAX Error:", error);
            }
        });
    }, 1000); // 1000毫秒 = 1秒
}

// 填充表单数据
function fillFormData(data) {
    $("#zsbhEdit").val(data.zsbh || "");
    $("#dhEdit").val(data.dh || "");
    $("#xhEdit").val(data.xh || "");
    $("#wtdhEdit").val(data.wtdh || "");
    $("#qymcEdit").val(data.qymc || "");
    $("#jcrqEdit").val(data.jcrq || "");
    $("#yqmcEdit").val(data.yqmc || "");
    $("#ccbhEdit").val(data.ccbh || "");
    $("#zqdjdjEdit").val(data.zqdjdj || "");
    
    // 不显示证书预览按钮
    // $("#TUCMLMButton2").parent().show();
}

// 清空表单数据
function clearFormData() {
    $("#zsbhEdit").val("");
    $("#dhEdit").val("");
    $("#xhEdit").val("");
    $("#wtdhEdit").val("");
    $("#qymcEdit").val("");
    $("#jcrqEdit").val("");
    $("#yqmcEdit").val("");
    $("#ccbhEdit").val("");
    $("#zqdjdjEdit").val("");
    
    // 隐藏证书预览按钮
    $("#TUCMLMButton2").parent().hide();
}

// 显示证书内容按钮点击事件
function TUCMLMButton2_onclick() {
    var dh = $("#dhEdit").val();
    var xh = $("#xhEdit").val();
    
    if (dh != "" && xh != "") {
        // 这里可以添加证书预览的逻辑
        alert("证书预览功能：\n单号：" + dh + "\n序号：" + xh + "\n\n此功能需要根据实际需求实现");
    } else {
        $("#sid").show();
        $("#sid").text("没有对应的证书文件可预览!");
    }
}

// 获取URL参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); 
    return null;
}

// SQL注入检查
function fsql(str) {
    var inj_str = "'|and|exec|insert|select|delete|primary key|table|from|all|create|update|count|*|%|chr|mid|master|truncate|alter|drop|char|1=1|1=2|declare|;|or|+|,";
    var inj_stra = inj_str.split("|");
    for (var i = 0; i < inj_stra.length; i++) {
        if (str.toLowerCase().includes(inj_stra[i].toLowerCase())) {
            return true;
        }
    }
    return false;
}

// 显示加载指示器
function showLoadingIndicator() {
    var html = `
        <div id="loadingIndicator" class="loading-box">
            <span style="color:#2266bb;font-size:18px;">正在装入数据,请等待……</span>
            <img src="Images/message_panel.gif" alt="loading">
        </div>
    `;
    $('body').append(html);
}

// 隐藏加载指示器
function hideLoadingIndicator() {
    $('#loadingIndicator').remove();
} 