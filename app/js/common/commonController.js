define(["../tool/ajaxTool","../tool/Utils"], function (ajax,utils) {
    /**
     * 初始化
     * @private
     */
    function _init() {
        //设置用户信息
        $("div.header .header-user").length != 0 && setUser();
        //设置预警信息图表是否显示
        $("div.header .header-notice span.cy-badge").length != 0 && setWarnInfo();
        //设置checkbox
        setCheckbox();
        //绑定方案删除事件
        $(".nav-bg .nav-main").length>0 && bindDel();
        //绑定搜索面板 收起 打开事件
        $(".conditions-choice").find(".conditions-shrinkage-btn").length!=0 && planCloseOpen();

    }

    /**
     * 设置预警信息
     */
    function setWarnInfo() {
        var param = {
            success: function (d) {
                if (d.status == 200) {
                    bindWarnCenterEvent(d.data);
                } else {
                    bindWarnCenterEvent(0);
                }
            },
            error: function () {
                bindWarnCenterEvent(0);
            }
        };
        ajax.load("warnNum",param);
    }

    /**
     * 绑定预警中心图标点击事件
     * @param warCount
     */
    function bindWarnCenterEvent(warCount) {
        var warnDom = $("div.header .header-notice span.cy-badge");
        if (warCount > 0) {
            warnDom.removeClass("hidden");
            warnDom.parent().click(function () {
                addWarnFocusRecord();
            });
        } else {
            warnDom.parent().click(function () {
                window.location.href = "/pages/warnCenter.html";
            });
        }
    }

    /**
     * 添加用户预警关注记录
     */
    function addWarnFocusRecord() {
        var param = {
            type: "post",
            success: function () {
                window.location.href = "/pages/warnCenter.html";
            },
            error: function () {
                window.location.href = "/pages/warnCenter.html";
            }
        };
        ajax.load("addwarnfocusrecord", param);
    }

    /**
     * 设置用户
     */
    function setUser() {
        var param = {
            "success": function (d) {
                $("div.header .header-user").find('span').html(d.data.nickName || d.data.mobile);
            }
        };
        ajax.load("user", param);
    }

    /**
     * 设置checkbox事件
     */
    function setCheckbox() {
        var checkbox, span;
        $(document).on("change", ".cy-checkbox", function () {
            checkbox = $(this).find("input[type=checkbox]");
            span = $(this).find("span");
            if (checkbox.length == 0) return false;
            if (span.hasClass("checked")) {
                span.removeClass("checked");
                if($(this).parents("thead").length==1){
                    $(this).parents("thead").next("tbody").find("tr").find("td:first .cy-checkbox span").removeClass("checked");
                }
            }else{
                span.addClass("checked");
                if($(this).parents("thead").length==1){
                    $(this).parents("thead").next("tbody").find("tr").find("td:first .cy-checkbox span").addClass("checked");
                }
            }

        })
    }
    /**
     * 设置方案删除事件
     * **/
    function bindDel(){
        var planid;
        var ajaxID;
        $(document).on("click",".nav-bg .nav-main ul.listbox li i.nav-delete",function(){
            planid = $(this).parent().data("id");
        });
        $('.plan-delete').find(".btn-info").on("click",function(){
            var param = {
                type:"POST",
                data:{
                    planId:planid
                },
                success:function(data){
                    reLoadPlan();
                }
            };
            ajax.load("deleteuserplan",param);
            $(this).attr("disabled",true);
            $('.plan-delete').find(".modal-body p").html("方案删除中，请稍等。。。");
        });
    }
    //重新加载方案list
    function reLoadPlan(){
        var planid = "";
        var param = {
            "success":function(data){
                var url = '';
                // 用户方案为空，则直接跳转页面
                if (data.data.length === 0) {
                    url = "/index.html";
                } else {
                    planid = data.data[0].id;
                    url = "/pages/monitor/full_view.html?id="+planid;
                }
                $('.plan-delete').modal("hide");
                $('.plan-delete').find(".btn-info").removeAttr("disabled");
                $('.plan-delete').find(".modal-body p").html("确定删除该方案吗？确定后该方案及相关数据将不存在");
                window.location.href = url;
            }
        };
        ajax.load("userplanlist",param);
    }

    function planCloseOpen(){
        //绑定点击收起面板
        $(".conditions-choice").find(".conditions-shrinkage-btn").on("click",function(){
            if($(this).hasClass("chooseClosed")){
                $(".conditions-choice").find(".conditions-box").not(":last").show();
                $(this).removeClass("chooseClosed");
                $(this).children("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }else{
                $(".conditions-choice").find(".conditions-box").not(":last").hide();
                $(this).addClass("chooseClosed");
                $(this).children("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            }
        })
    }
    // 返回
    return {
        init: _init

    }
});
