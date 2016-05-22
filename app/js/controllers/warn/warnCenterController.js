define(["../../tool/ajaxTool", "../../view/warn/warnCenterView"], function (ajax, view) {
    var $tar = $("div.page-warnCenter");
    var indexUserPlans = {showCount: 0};
    var result = [];
    var titleID = "",
        turnIndex = 0;
    var fullViewInit = {
        pageSize: 20
    };
    var all = "";
    var keyword;

    function init(page) {
        titleID = page.query.id || "a5a3a9ca1f0911e6af1500188b839ae8";
        turnIndex = typeof page.query.turnTab == "undefined" ? 0 : page.query.turnTab;
        //加载列表
        getMonitorInfoList(0, 20);
        //绑定事件
        bindEvent();

        $('.tab-all-view li:eq(' + turnIndex + ') a').tab('show');
    }

    function getMonitorInfoList(pageNum, pageSize) {
        var param = {"query": getFullViewQueryCondition(pageNum + 1, pageSize)}
        param.success = function (d) {
            view.renderList(d);
            result = d;
            pagination(result, pageNum);
        };
        ajax.load("warnInfo", param);
        // ajax.load("getMonitorInfoList",param);
    }

// 获取查询参数
    function getFullViewQueryCondition(pageNum, pageSize) {
        var condition = {
            pageNum: pageNum,
            pageSize: pageSize,
            planId: titleID || '',
            sentiment: $('.main').find('.type-sentiment').find('li').find('.active').data('sentiment') || '',
            isWarn: $('.main').find('.type-iswarn').find('li').find('.active').data('iswarn') || '',
            source: $('.main').find('.type-source').find('li').find('.active').data('source') || '',
            startDate: $('#start').val() || '',
            endDate: $('#end').val() || '',
            isDedup: $('.main').find('.type-isdedup').find('li').find('.type-isdedup').hasClass('active') ? true : false,
            keywords: $('.conditions-searchbox').find('input').val() || '',
            timeRanges: $('.main').find('.type-timeranges').find('li').find('.active').data('timeranges') || ''
        };

        if (condition.startDate && condition.endDate) {
            condition.timeRanges = 0;
        }
        return condition;
    }

    function bindEvent() {
        var $dom = $(".page-warnCenter");
        /*****
         * 绑定查询条件
         * ****/
        $dom.find('.main').find('.conditions-item').not('.operation,.type-timeranges').find('li').find('a').not('.tab-timeranges').click(function () {
            if ($(this).hasClass("digest-btn")) {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(".page-fullView tbody p.digest").addClass("hidden");
                } else {
                    $(this).addClass("active");
                    $(".page-fullView tbody p.digest").removeClass("hidden");
                }
                return;
            } else if ($(this).hasClass("mergelike-btn")) {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                } else {
                    $(this).addClass("active");
                }
                return;
            }
            $(this).parent().parent().find("li a.active").removeClass("active");
            $(this).addClass("active");
            getMonitorInfoList(0, 20);
        });
        // 时间范围选择时清空日期选择框
        $('.type-timeranges').find('a').click(function () {
            $('.input-daterange').find('input').val('');
            $('#customdays').removeClass('active');
            $(this).parent().parent().find("li a.active").removeClass("active");
            $(this).addClass("active");
            getMonitorInfoList(0, fullViewInit.pageSize);
        });
        $dom.find('.conditions-searchbox').find('button').click(function () {
            getMonitorInfoList(0, 20);
        });

        $("#btnFind").click(function () {
            $('#customdays').addClass('active');
            $('.type-timeranges').find('a').removeClass('active');
            getMonitorInfoList(0, fullViewInit.pageSize);
        });
        //在批量取消预警页面上绑定事件，弹出对话框并绑定id
        $('.cancel-alldanger-btn').click(function () {
            //如果选中不为空，弹出确认对话框
            if ($('.cy-checkbox input:checked').length != 0) {
                var docIds = new Object();
                docIds.dedupids = [];
                //获取选中的checkbox上缓存的Id
                $('.cy-checkbox input:checked').each(function () {
                    docIds.dedupids.push($(this).parent().parent().data('docId'));
                });
                //将获取的多个Id绑定到对话框的缓存上
                $('.cancel-alldanger').data('docIds', docIds);
                //弹出对话框
                $('.cancel-alldanger').modal('show');
            } else {
                $('.cancel-danger-none').modal('show');
            }
        });
        $dom.find(".table.table-bordered").on("click", ".email-send a", function () {
            var param = {
                "success": function (d) {
                    view.renderAddEmail(d);
                }
            }
            ajax.load("addEmail", param);
        });
        //add email
        $("form").on("submit", function () {
            $(this).parent().find(".add-email-ul").append('<li><label class="cy-checkbox"><input type="checkbox"><span></span></label>' + $(this).find("input[type=email]").val() + '</li>')
            return false;
        });
        //在批量取消预警页面上绑定事件，弹出对话框并绑定id
        $('.cancel-alldanger-btn').click(function () {
            //如果选中不为空，弹出确认对话框
            if ($('.cy-checkbox span.checked').length != 0) {
                var docIds = new Object();
                docIds.dedupids = [];
                //获取选中的checkbox上缓存的Id
                $('.cy-checkbox span.checked').each(function () {
                    docIds.dedupids.push($(this).parent().parent().data('docId'));
                });
                //将获取的多个Id绑定到对话框的缓存上
                $('.cancel-alldanger').data('docIds', docIds);
                //弹出对话框
                $('.cancel-alldanger').modal('show');
            } else {
                $('.cancel-danger-none').modal('show');
            }
        });
        //在确认批量取消预警的按钮上绑定事件 TODO
        $('.btn-batchwarning-delete').click(function () {
            var dedupids = $(this).parents('.cancel-alldanger').data('docIds');
            if (dedupids != '') {
                //调用删除方案预警邮箱的接口
                var param = {
                    type: 'POST',
                    "success": function (data) {
                        if (data.status == 200)
                            alert('删除成功！');
                    },
                    data: dedupids
                };
                ajax.load("cancelsimilarwarn", param);
            }
        });
        $dom.find('.nav-tabs').find('.tab-chart').on('shown.bs.tab', function (e) {
            setTab2();
        });
        //绑定checkbox change事件
        $(".main thead").on("change", "tr:first .cy-checkbox", function () {
            if ($(this).find("span").hasClass("checked")) {
                $(".main tbody").find(".cy-checkbox").find("span").removeClass("checked");
            } else {
                $(".main tbody").find(".cy-checkbox").find("span").addClass("checked");
            }
        });
        //点击收起面板
        $(".conditions-choice").find(".conditions-shrinkage-btn").on("click", function () {
            if ($(this).hasClass("chooseClosed")) {
                $(".conditions-choice").find(".conditions-box").not(":last").show();
                $(this).removeClass("chooseClosed");
                $(this).children("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            } else {
                $(".conditions-choice").find(".conditions-box").not(":last").hide();
                $(this).addClass("chooseClosed");
                $(this).children("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            }
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
    function bindPlanWarnClick() {
        //在每个方案面板的【管理接收邮箱】按钮上绑定弹出框事件
        $('.warning-setting-main').find('.panel-planwarn').find('.warning-email').click(function () {
            var planid = $(this).data('id');
            var title = $(this).data('title');
            //为对话框缓存赋值为方案id
            var param = {
                "success": function (d) {
                    $('#modal-email-add').find('.modal-title').text('为【' + title + '】预警方案添加接收邮箱');
                    view.renderEmailController(d);
                    $('#modal-email-add').data("planid",planid);
                    $('#modal-email-add').modal('show');
                },
                "query": {
                    planId: planid
                }
            }
            ajax.load("warnmail", param);
        });
    };

    //绑定【管理接收邮箱】弹出对话框的确认方法
    $('#modal-email-add').find('.btn-emails-confirm').click(function () {
        //初始化对象
        var temp = {};
        temp.emails = [];
        $('#modal-email-add').find('.add-email-list').find('span.checked').each(function () {
            temp.emails.push($(this).parent().next('span').text());
        });
        var param = {
            type: 'POST',
            query:{
                planId : $('#modal-email-add').data('planid')
            },
            data:temp,
            success: function (data) {
                if (data.status == 200) {
                    //清空新增输入框
                    $('#modal-email-add').find('.input-add').val('');
                    //关闭对话框
                    $('#modal-email-add').modal('hide');
                    //重新绑定方案面板列表
                    setTab2();
                }
            }
        }
        ajax.load("modifyplanwarnemail",param);
    });
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
    $('.warning-management').on('shown.bs.modal', function (e) {
        var param = {
            success:function(data){
                //清除邮箱列表
                $('.warning-management .emaillist-all').find('.clearfix').children().remove();
                //绑定邮箱列表
                for (i = 0; i < data.data.length; i++) {
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
        $(this).parent().find(".clearfix").append('<li><span>' + $(this).find("input[type=email]").val() + '</span><img src="../../img/warning_delete.png"></li>');
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
