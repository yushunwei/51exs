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

    /**
     * header设置
     */
    function setHeader(){
        var param = {
            "success":function(d){
                $("div.header .header-user").find('span').html(d.data.nickName || d.data.mobile)
            }
        };
        ajax.load("user",param);
    }

    /**
     * 加载行业
     */
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

    /**
     * 加载地域
     */
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

    /**
     * 事件绑定
     */
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

            // 表单输入验证
            if(!$('#signupForm').valid()) return;

            // 用户输入参数
            var data = {
                inviteCode:$("#invitecode").val(),
                companyName:$("#companyname").val(),
                industrys:[
                           $("#industrys1 select").find("option:selected").text(),
                           $("#industrys2 select").find("option:selected").text(),
                           $("#industrys3 select").find("option:selected").text()
                ],
                areas:[
                       $("#areas1 select").find("option:selected").text(),
                       $("#areas2 select").find("option:selected").text(),
                       $("#areas3 select").find("option:selected").text()
                ]
            };

            // 提交参数
            var param = {
                data:JSON.stringify(data),
                type:"post",
                contentType: 'application/json',
                beforeSend: function(){
                    layer.msg('处理中，请稍后', {icon: 16,time:-1,shade:[0.4,'#CCC']});
                },
                success:function(d){
                    $("#loading").hide();
                    if(d.status == 200){
                        location.href= "/index.html";
                    }else{
                        layer.alert('开通失败！'+ d.subMsg, {icon: 2});
                    }
                },
                error:function(){
                    layer.alert('开通失败！', {icon: 2});
                }
            };
            ajax.load("openapplication",param);
        });
    }

    /**
     * 表单验证
     */
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
                var b =  /[0-9a-zA-Z]{8}/;
                return b.test(value);
            },
            '请将信息填写完整'   //提示信息
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
                    isCode: "请输入正确的8位邀请码",
                    remote: ""
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