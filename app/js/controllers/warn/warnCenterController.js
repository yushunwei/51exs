define(["../../tool/ajaxTool", "../../view/warn/warnCenterView","../../common/commonController","../../common/commonView"], function (ajax, view,com,commonView) {
    var $tar = $("div.page-warnCenter");
    var indexUserPlans = {showCount: 0};
    var result = [];
    var turnIndex = 0;
    var fullViewInit = {
        pageSize: 20
    };
    var all = "";
    var keyword;
    var lastSearchParam;    //上次查询的参数


    function init(page) {
        turnIndex = typeof page.query.turnTab == "undefined" ? 0 : page.query.turnTab;
        //加载列表
        getMonitorInfoList(0, 20);
        //绑定事件
        bindEvent();

        $('.tab-all-view li:eq(' + turnIndex + ') a').tab('show');
    }

    function getMonitorInfoList(pageNum, pageSize) {
        var param = {"query": getFullViewQueryCondition(pageNum + 1, pageSize)}
        var loadingLayer;
        lastSearchParam = getFullViewQueryCondition(pageNum + 1, pageSize);
        param.success = function(d){
            layer.close(loadingLayer);
            if(d.status == 200){
                view.renderList(d);
                result = d;
                pagination(result,pageNum);

            }else{
                layer.alert(d.subMsg, {icon: 2});
            }
        };
        param.error = function(d){
            layer.close(loadingLayer);
            layer.alert("加载失败",{icon:2});
        };
        //增加loading效果
        param.beforeSend = function(){
            loadingLayer = layer.msg('加载中...', {icon: 16});
        };
        ajax.load("warnInfo", param);
        // ajax.load("getMonitorInfoList",param);
    }

// 获取查询参数
    function getFullViewQueryCondition(pageNum, pageSize) {
        var condition = {
            pageNum: pageNum,
            pageSize: pageSize,
            "sentimentArray[]": $('.main').find('.type-sentiment').find('li').find('.active').data('sentiment') || '',
            isWarn: 'yes',
            "sourceArray[]": $('.main').find('.type-source').find('li').find('.active').data('source') || '',
            startTime: $('#start').val() || '',
            endTime: $('#end').val() || '',
            isDedup: $('.main').find('.type-isdedup').find('li').find('.type-isdedup').hasClass('active') ? true : false,
            keywords: $('.conditions-searchbox').find('input').val() || '',
            timeRanges: $('.main').find('.type-timeranges').find('li').find('.active').data('timeranges') || ''
        };
        if($("#customdays").hasClass("active")){
            condition.timeRanges = 0;
        }else{
            delete condition.startTime;
            delete condition.endTime;
        }
        return condition;
    }

    function bindEvent() {
        var $dom = $(".page-warnCenter");
        /*****
         * 绑定查询条件
         * ****/
        $dom.find('.main').find('.conditions-item').not('.operation,.type-timeranges').find('li').find('a').not('.tab-timeranges,.not-open').click(function () {
            if ($(this).hasClass("digest-btn")) {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(".page-warnCenter tbody p.digest").addClass("hidden");
                } else {
                    $(this).addClass("active");
                    $(".page-warnCenter tbody p.digest").removeClass("hidden");
                }
                return;
            } else if ($(this).hasClass("mergelike-btn")) {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                } else {
                    $(this).addClass("active");
                }
                getMonitorInfoList(0, 20);
                return;
            }
            $(this).parent().parent().find("li a.active").removeClass("active");
            $(this).addClass("active");
            getMonitorInfoList(0, 20);
        });
        //未开通的信息来源不可搜索，并给出提示
        $('.conditions-item li a.not-open').mouseover(function(){
            var content = '<div class="not-open-tip">即将开通,敬请期待！</div>';
            var x = $(this).innerWidth();
            var width = 56 - x/2;
            $(this).append(content);
            $('.not-open-tip').css('left', -width);
        }).mouseout(function(){
            $('.not-open-tip').remove();
        });
        // 时间范围选择时清空日期选择框
        $('.type-timeranges').find('a').click(function () {
            $('#customdays').removeClass('active');
            $(this).parent().parent().find("li a.active").removeClass("active");
            $(this).addClass("active");
            getMonitorInfoList(0, fullViewInit.pageSize);
        });
        $dom.find('.conditions-searchbox').find('button').click(function () {
            getMonitorInfoList(0, 20);
        });
// 自定义日期弹出框
        $('.chart-analysis-title-other-btn').click(function(e){
            $('.order-box').toggle();
            $(document).on('click', function(e){
                $('.order-box').hide();
            });
            e.stopPropagation();
        });
        $('.order-box').click(function(e){
            e.stopPropagation();
        });
        $("#btnFind").click(function () {
            $('#customdays').addClass('active');
            $('.type-timeranges').find('a').removeClass('active');
            getMonitorInfoList(0, fullViewInit.pageSize);
        });
        //add email
        com.handleEmail();
        $dom.find('.nav-tabs').find('.tab-chart').on('shown.bs.tab', function (e) {
            setTab2();
        });
        //点击相似页带入参数
        var _url;
        $dom.on("click",".info-similarcount",function(){
            if(!_url){
                _url = $(this).attr("href");
            }
            var url = _url;
            delete lastSearchParam.pageNum;
            delete lastSearchParam.pageSize;
            url += "&" + $.param(lastSearchParam);
            $(this).attr("href",url);
            // return false;
        })

    }

    //分页
    function pagination(data, index) {
        $(".pagination").pagination(data.data.recordTotal, {
            callback: pageSelectCallback,
            prev_text: '上一页',
            next_text: '下一页 ',
            items_per_page: 20,
            num_display_entries: 6,
            num_edge_entries: 2,
            current_page: index,
            link_to: 'javascript:void(0)',
            ellipse_text: '....'
        });
    }

    function pageSelectCallback(pageNum, jq) {
        getMonitorInfoList(pageNum, fullViewInit.pageSize);
        $("body").scrollTop(200);
    }

    function setTab2() {
        var param = {
            "success": function (data) {
                view.renderEmailList(data);
                bindPlanWarnClick();
                //地址的删除按钮上绑定事件
                //bindPlanWarnClick();
                bindDeleteIconClick();
            }
        };
        ajax.load("planwarnemail", param);
    }

    //绑定面板【管理接收邮箱】按钮上绑定弹出框事件
    var emailObj = {};
    var warningManagementEmail = {};
    var docId;
    function bindPlanWarnClick() {
        //在每个方案面板的【管理接收邮箱】按钮上绑定弹出框事件
        $('.warning-setting-main').find('.panel-planwarn').find('.warning-email').click(function () {
            var planid = $(this).data('id');
            docId = planid;
            var title = $(this).data('title');
            emailObj = {};
            //为对话框缓存赋值为方案id
            var param = {
                "success": function (d) {
                    $('#modal-email-add').find('.modal-title').text('为【' + title + '】预警方案添加接收邮箱');
                    view.renderEmailController(d);
                    $('#modal-email-add').data("planid",planid);
                    $('#modal-email-add').modal('show');
                    for(var i = 0; i < d.data.length;i++){
                        emailObj[d.data[i].email] = d.data[i].email;
                    }
                },
                "query": {
                    planId: planid
                }
            };
            ajax.load("warnmail", param);
        });
    }
    $("#modal-email-add form").on("submit",function(){
        var emailStr = $(this).find("input[type=email]").val();
        if(!emailObj[emailStr]) {
            emailObj[emailStr] = emailStr;
            $(this).parent().find(".add-email-ul").append('<li><label class="cy-checkbox"><input type="checkbox"><span class="checked"></span></label>' + emailStr + '</li>')
            $(this).find("input[type=email]").val("");
            $(this).next().find(".text-danger").text("您最多可选择5个邮箱");
        }else{
            $(this).next().find(".text-danger").text(emailStr + "已存在，请勿重复添加");
        }
        return false;
    });
    //绑定【管理接收邮箱】弹出对话框的确认方法
    $('#modal-email-add').find('.btn-emails-confirm').click(function () {
        var checkedLength = $("#modal-email-add .add-email-list span.checked").length;
        var shareEmailList = [];
        var otherEmailList = [];
        if(checkedLength <= 5 && checkedLength > 0){
            $("#modal-email-add .add-email-list span.checked").each(function(){
                var emailStr = $(this).parents("li").text();
                shareEmailList.push(emailStr);
            });
            _sendEmail(docId,shareEmailList);
        }else if(checkedLength==0){
            $("#modal-email-add .text-danger").text("请选择至少一个邮箱");
        }else{
            $("#modal-email-add .text-danger").text("您最多可选择5个邮箱");
        }
    });
    //发送邮件
    function _sendEmail(_docId,shareEmailList){
        var param = {
            "data" : {"planId" : _docId,"emails":shareEmailList},
            "type":'post',
            "success":function(d){
                $("#modal-email-add .send-email-btn").removeAttr("disabled");
                if(d.status == 200) {
                    $(".close").trigger("click");
                    setTab2();
                }else{
                    layer.alert(d.subMsg, {icon: 2});
                }
            },
            error:function(){
                $("#modal-email-add .send-email-btn").removeAttr("disabled");
            }
        };
        ajax.load("modifyplanwarnemail",param);
        $("#modal-email-add .send-email-btn").attr("disabled",true);
    }
    //地址的删除按钮上绑定事件（弹出对话框）
    function bindDeleteIconClick(){
        //地址的删除按钮上绑定事件
        $('.warning-setting-main').find('.panel-body').find('img').bind("click", function(){
            //模式对话框上绑定id
            $('.modal-email-delete').data('emailid',$(this).parent('a').data('emailid'));
            //弹出对话框
            $('.modal-email-delete').modal('show');
        });
    }
    //方案邮箱删除
    $('.modal-email-delete').find('.btn-info').click(function(){
        var id= $('.modal-email-delete').data('emailid');
        if(id != undefined && id != ''){
            //调用删除方案预警邮箱的接口
            var param = {
                type: 'POST',
                query:{
                    emailId:id
                },
                contentType: 'application/json',
                success: function(data){
                    if (data.status == 200) {
                        //重新绑定面板
                        setTab2();
                        $('.modal-email-delete').modal('hide');
                        alert('删除成功！');
                    }
                }
            };
            ajax.load("deleteplanwarnemail",param);
        }
    });
    //点击[管理预警邮箱]
    $('.warning-management').on('show.bs.modal', function (e) {
        warningManagementEmail = {};
        $('.warning-management form').find("input[type=email]").val("");
        $('.warning-management').find("p.dangerText").text("");
        var param = {
            success:function(data){
                //清除邮箱列表
                $('.warning-management .emaillist-all').find('.clearfix').children().remove();
                //绑定邮箱列表
                for (i = 0; i < data.data.length; i++) {
                    warningManagementEmail[data.data[i]] = data.data[i];
                    $('.warning-management .emaillist-all').find('.clearfix').append('<li><span>' + data.data[i] + '</span><img src="../../img/warning_delete.png"></li>');
                }
                //在上一步绑定的img图标上绑定删除事件
                $('.warning-management .emaillist-all').find('.clearfix').find('img').bind("click", function () {
                    $(this).parents('li:first').remove();
                });
            }
        };
        ajax.load("addEmail",param);
    });

    $('.warning-management form').on("submit",function(){
        var inputValue = $(this).find("input[type=email]").val();
        if(!warningManagementEmail[inputValue]){
            $(this).parent().find(".clearfix").append('<li><span>' + inputValue + '</span><img src="../../img/warning_delete.png"></li>');
            $('.warning-management form').find("input[type=text]").val("");
        }else{
            $(this).next().find(".dangerText").text(inputValue+"已存在，请勿重复添加");
        }
        return false;
    });
    $('.warning-management .btn-add-confirm').on("click",function(){
        //初始化对象
        var temp = {};
        temp.emails=[];
        //添加现有邮箱
        $('.warning-management .emaillist-all').find('.clearfix').find('li').each(function(){
            temp.emails.push($(this).find('span').text());
        });
        //调用更新邮箱列表的接口
        var param = {
            type: 'POST',
            data: temp,
            success: function(data){
                if(data.status == 200){
                    //清空输入框
                    $('.warning-management .input-add-all').val('');
                    //关闭模态框
                    $('.warning-management').modal('hide');
                }
            }
        };
        ajax.load("modifywarnemail",param);
    });
    return {
        init: init
    }
});
