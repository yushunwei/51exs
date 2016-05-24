define(["../tool/ajaxTool","../tool/Utils"], function (ajax,utils) {
    /**
     * 初始化
     * @private
     */
    function _init(page) {
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
        //绑定全网搜索
        $("div.header .header-input .input-keywords").length != 0 && bindFullSearch();
        //绑定 舆情下载
        $(".conditions-choice").find("a.download-checked-btn").length!=0 && bindDownload(page);
        //取消相似预警
        $(".conditions-choice").find("a.cancel-alldanger-btn").length!=0 && bindCancel(page);
    }

    /**
     * 绑定全网搜索
     */
    function bindFullSearch(){
        $(".btn-search").click(function(){
            var keyWords = $(".input-keywords").val().replace(/^\s+|\s+$/g,"");
            $(this).attr("href","/pages/fullsearch/allSearch.html"+(keyWords?"?keyWords="+keyWords:""))
                .click();
        });
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
            success: function (d) {
                $("div.header .header-user").find('span').html(d.data.nickName || d.data.mobile);
            }
        };
        ajax.load("user", param);

        // 绑定退出登录操作
        bindLogout();
    }

    /**
     * 退出
     */
    function bindLogout(){
        $(".header-user .log-out").click(function(){
            var exsToken = utils.getToken();
            utils.removeToken();
            window.location.href = "/logout"+(exsToken?"?token="+exsToken:"");
        });
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
    /***
     * 绑定下载 事件
     * **/
    function bindDownload(page){
        //绑定下载选中按钮 和下载全部事件
        var btn = $(".conditions-choice").find("a.download-checked-btn,a.download-all-btn");
        var span,tr;
        var input = "<input class='form-control'/>";
        var key,value;
        var arr = ["title","summary","source","author","sentiment","similarCount","media","url","pubTime"];
        var url = HX_config.serv_path+"/monitor/contentmonitor/downloadmonitorinfolist/v=1.0.0?token="+utils.getToken();
        btn.on("click",function(e){
            span =$(".full-view-table").find(".table-bordered tbody tr").find("td:first .cy-checkbox span.checked");
            tr = span.parent().parent().parent();
            // 下载全部
            if($(this).hasClass("download-all-btn")){
                tr = $(".full-view-table").find(".table-bordered tbody tr");
            }
            if(tr.length==0){
                //TODO
                return;
            }else{
                $("form.downLoadForm").length == 0 && $(".page").append("<form class='downLoadForm hidden' method='post'></form>");
                $("form.downLoadForm").empty();
                $("form.downLoadForm").append("<div class='form-group download-content'></div>");
                var inputHtml="";
                if(page.name=="warnCenter"){
                    arr.push("warnConfigName");
                    url = HX_config.serv_path+"/warn/warncenter/downloadwarninfolist/v=1.0.0?token="+utils.getToken();
                }
                $.each(tr,function(i,v){
                    for(var index=0;index<arr.length;index++){
                        key = "monitorInfos["+i+"]."+arr[index];
                        value = $(this).data(arr[index].toLowerCase())||'';
                        inputHtml += '<input class="form-control" name="'+key+'" value="'+value+'" />';
                    }
                });
                $("form.downLoadForm .download-content").append(inputHtml);
                $("form.downLoadForm").attr("action",url);
                $("form.downLoadForm").submit();
            }
        })
    }
    /**
     * 取消预警
     * **/
    function bindCancel(){
        var span,tr,arr=[];
        $(".conditions-choice").find("a.cancel-alldanger-btn").on("click",function(){
            span =$(".full-view-table").find(".table-bordered tr").find("td:first .cy-checkbox span.checked");
            tr = span.parent().parent().parent();
            // 下载全部
            if(tr.length==0){
                //TODO
                return;
            }else{
                $.each(tr,function(i,v){
                    arr.push($(this).data("dedupid"));
                });
                var param = {
                    type:"post",
                    data : {
                        dedupids:arr
                    },
                    success:function(d){

                    }
                };
                layer.confirm('确定取消选中文章的相似文章预警？确定后一个月内与选中文章相似的文章不再预警。', {
                    btn: ['确定','取消'] //按钮
                }, function(index){
                    ajax.load("cancelsimilarwarn",param);
                    layer.close(index);
                }, function(){

                });
                ajax.load("cancelsimilarwarn",param);
            }
        })
    }
    //渲染已有的邮件列表
    var emailModel;
    emailModel = emailModel ? emailModel : $(".add-email").find("#addemailScript").html();
    function _renderAddEmail(d){
        var myTemplate = Handlebars.compile(emailModel);
        var html = myTemplate(d);
        $(".add-email .add-email-ul").html(html);
    }
    //邮件弹框
    function _handleEmail(){
        var emailObj = {};
        var docId;
        $(".table.table-bordered").on("click",".email-send a",function(){
            docId = $(this).parents("tr").attr("data-docId");
            var param = {
                "success":function(d){
                    _renderAddEmail(d);
                    for(var i = 0; i < d.data.length;i++){
                        emailObj[d.data[i]] = d.data[i];
                    }
                }
            }
            ajax.load("addEmail",param);
        });
        //add email
        $("#emailForm").on("submit",function(){
            var emailStr = $(this).find("input[type=email]").val();
            if(!emailObj[emailStr]) {
                emailObj[emailStr] = emailStr;
                $(this).parent().find(".add-email-ul").append('<li><label class="cy-checkbox"><input type="checkbox"><span></span></label>' + emailStr + '</li>')
                $(this).find("input[type=email]").val("");
                $(this).find(".text-danger").text("您最多可选择5个邮箱");
            }else{
                $(".add-email-list").find(".text-danger").text(emailStr + "已存在，请勿重复添加");
            }
            return false;
        });
        $(".send-email-btn").on("click",function(){
            var checkedLength = $(".add-email-list :checked").length;
            var shareEmailList = [];
            var otherEmailList = [];
            if(checkedLength <= 5 && checkedLength > 0){
                $(".add-email-list :checkbox").each(function(){
                    var emailStr = $(this).parents("li").text();
                    if($(this).is(":checked")){
                        shareEmailList.push(emailStr);
                    }else{
                        otherEmailList.push(emailStr);
                    }
                });
                _sendEmail(docId,shareEmailList,otherEmailList);
            }else{
                $(this).find(".text-danger").text("您最多可选择5个邮箱");
            }
        });
    }
    //发送邮件
    function _sendEmail(docId,shareEmailList,otherEmailList){
        var param = {
            "data" : {"docId" : docId,"shareEmails":shareEmailList,"otherEmails":otherEmailList},
            "type":'post',
            "success":function(d){
                if(d.status == 200) {
                    $(".close").trigger("click");
                }else{
                    layer.alert(d.subMsg, {icon: 2});
                }
            }
        }
        ajax.load("emailShare",param,"#sendEmailModal");
    }
    // 返回
    return {
        init: _init,
        handleEmail : _handleEmail
    }
});
