define(["../tool/ajaxTool"], function (ajax) {
    /**
     * 初始化
     * @private
     */
    function _init(){
        //设置用户信息
        $("div.header .header-user").length !=0 && setUser();
        //设置预警信息图表是否显示
        $("div.header .header-notice span.cy-badge").length !=0 && setWarnInfo();
        //设置checkbox
        setCheckbox();
    }

    /**
     * 设置预警信息
     */
    function setWarnInfo(){
        var param = {
            success: function (d) {
                if(d.status ==200){
                    bindWarnCenterEvent(d.data);
                }else{
                    bindWarnCenterEvent(null);
                }
            },
            error:function(){
                bindWarnCenterEvent(null);
            }
        }
        ajax.load("warnNum",param);
    }

    /**
     * 绑定预警中心图标点击事件
     * @param warCount
     */
    function bindWarnCenterEvent(warCount){
        var warnDom = $("div.header .header-notice span.cy-badge");
        if(!warCount && warCount > 0){
            warnDom.removeClass("hidden");
            warnDom.parent().click(function(){
                addWarnFocusRecord();
            });
        }else{
            warnDom.parent().click(function(){
                window.location.href = "/pages/warnCenter.html";
            });
        }
    }

    /**
     * 添加用户预警关注记录
     */
    function addWarnFocusRecord(){
        var param = {
            type:"post",
            success:function(){
                window.location.href = "/pages/warnCenter.html";
            },
            error:function(){
                window.location.href = "/pages/warnCenter.html";
            }
        };
        ajax.load("addwarnfocusrecord",param);
    }

    /**
     * 设置用户
     */
    function setUser(){
        var param = {
            "success":function(d){
                $("div.header .header-user").find('span').html(d.data.nickName || d.data.mobile);
            }
        };
        ajax.load("user",param);
    }

    /**
     * 设置checkbox事件
     */
    function setCheckbox(){
        var checkbox,span;
        $(document).on("change",".cy-checkbox",function(){
            checkbox  = $(this).find("input[type=checkbox]");
            span = $(this).find("span");
            if(checkbox.length==0) return false;
            if(span.hasClass("checked")){
                span.removeClass("checked");
            }else{
                span.addClass("checked")
            }
        })
    }

    // 返回
    return {
        init:_init

    }
});
