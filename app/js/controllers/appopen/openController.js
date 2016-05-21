define(["../../view/appopen/openView","../../tool/ajaxTool","../../tool/Utils"], function (view,ajax,utils) {
    function init() {
        setHeader();
        //form验证
        validateForm();
        //加载行业
        loadHY();
        //加载区域
        loadQY();
        //绑定select change事件
        bindEvents();
    }
    function setHeader(){
        var param = {
            "success":function(d){
                $("div.header .header-user").find('span').html(d.data.nickName || d.data.mobile)
            }
        };
        ajax.load("user",param);
    }
    function loadHY(){
        var _code = arguments.length == 0 ? "-1" : arguments[0];
        var index = arguments.length == 0 ? 0 : arguments[1];
        var param = {
            "query":{
                "code":_code
            },
            "success":function(data){
                view.renderHY(data,index);
            }
        };
        ajax.load("openHY",param);
    }
    function loadQY(){
        var _code = arguments.length == 0 ? "-1" : arguments[0];
        var index = arguments.length == 0 ? 0 : arguments[1];
        var param = {
            "query":{
                "code":_code
            },
            "success":function(data){
                view.renderQY(data,index);
            }
        };
        ajax.load("openQY", param);

    }
    function bindEvents(){
        var code,index;
        //行业下拉框change事件
        $(".page-open").find(".open-hy select").on("change",function(){
            code = $(this).find("option:selected").attr("code");
            index = $(this).attr("index");
            //判断是第几个select触发change事件，同级下的select清空，并且重新加载
            //code 为 下拉的行业代码
            if(!code){
                view.renderHY(null,index);
            }else {
                index && loadHY(code, index);
            }

        });
        //企业下拉框change事件
        $(".page-open").find(".open-qy select").on("change",function(){
            code = $(this).find("option:selected").attr("code");
            index = $(this).attr("index");
            if(!code){
                view.renderQY(null,index);
            }else {
                index && loadQY(code, index);
            }
        });
        //表格提交
        $(".page-open").find("#submitbutton").on("click",function(){
            if(!$('#signupForm').valid()) return;
            var code = $("#invitecode").val();
            var companyname = $("#companyname").val();
            var industrys = ($("#industrys1 select").find("option:selected").attr("code")+"-"+ $("#industrys2 select").find("option:selected").attr("code")+"-"+ $("#industrys3 select").find("option:selected").attr("code")).split("-");
            var areas = ($("#areas1 select").find("option:selected").attr("code")+"-"+ $("#areas2 select").find("option:selected").attr("code")+"-"+ $("#areas3 select").find("option:selected").attr("code")).split("-");
            var agreement = $(".agreement input[type=checkbox]").is(":checked");
            if(code &&companyname &&industrys.length==3&&areas.length==3 && agreement ){
                var _data = {
                    "inviteCode" : code,
                    "companyName" : companyname,
                    "industrys" : industrys,
                    "areas" : areas
                };
                var param = {
                    "data":JSON.stringify(_data),
                    "type":"post",
                    contentType: 'application/json',
                    "beforeSend" : function(){
                        $("#loading").show();
                    },
                    "success":function(d){
                        $("#loading").hide();
                        if(d.status == 200){
                            location.href= "/index.html";
                        }else{
                            alert("开通失败" + d.subMsg);
                        }
                    }
                };
                ajax.load("openapplication",param);
                return false;
            }
        });
    }
    function validateForm(){
        $.validator.addMethod(
            "allInput",     //自定义规则方法名
            function(value , element , param){   //自定义规则体
                var flag = true;
                var val;
                $('select[name='+ param + ']').each(function(index){
                    val = $(this).find("option:selected").attr("code");
                    if(!val && flag){
                        flag = false;
                    }
                });
                return flag;
            },
            '请将信息填写完整'   //提示信息
        );
        $.validator.addMethod(
            "isCode",     //自定义规则方法名
            function(value , element , param){   //自定义规则体
                var b =  /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/;
                return b.test(value);
            },
            ''   //提示信息
        );
        $('#signupForm').validate({
            rules: {
                code: {
                    required: !0,
                    isCode: !0,
                    remote: ""
                },
                name: {
                    required: !0,
                    maxlength: 50
                },
                industry: {
                    allInput: 'industry'
                },
                area: {
                    allInput: 'area'
                },
                agree: "required"
            },
            messages: {
                code: {
                    required: "请输入邀请码！",
                    isCode: "邀请码必须是数字英文组合",
                    remote: "您输入的邀请码有误，请重新输入！"
                },
                name: {
                    required: "请输入企业名称",
                    maxlength: "企业名称长度不能超过50个字"
                },
                industry: {
                    allInput: '请选择企业所属行业！'
                },
                area: {
                    allInput: '请选择所在地！'
                },
                agree: {
                    required: "请阅读并确认使用协议"
                }
            }
        });
    }
    return {
        init: init
    }
});