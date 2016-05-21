
define(["../../tool/ajaxTool","../../view/monitor/allplanView"], function (ajax,view) {
    var $tar = $("div.page-allplan");
    var indexUserPlans = {showCount:0};
    var result = [];
    var titleID = "",
        turnIndex = 0;
    var fullViewInit = {
        pageSize:20
    };
    var sentiment,planId;
    var keyword,checkArrary =[];
    function init(page) {
        titleID = page.query.id || "a5a3a9ca1f0911e6af1500188b839ae8";
        sentiment = page.query.sentiment;
        //加载列表
        getMonitorInfoList(0,20);
        //绑定事件
        bindEvent();
    }

    function getMonitorInfoList(pageNum,pageSize){
        var param ={"query" :getFullViewQueryCondition(pageNum+1,pageSize)}
        param.success = function(d){
            view.renderList(d);
            result = d;
            pagination(result,pageNum);
        };
        ajax.load("getAllInfoList",param);
    }
// 获取查询参数
    function getFullViewQueryCondition(pageNum,pageSize){
        var condition = {
            pageNum:pageNum,
            pageSize:pageSize,
            planId:titleID || $('.main').find('.type-plan').find('li').find('.active').data('planId'),
            sentiment:sentiment || $('.main').find('.type-sentiment').find('li').find('.active').data('sentiment'),
            isWarn:$('.main').find('.type-iswarn').find('li').find('.active').data('iswarn'),
            source:$('.main').find('.type-source').find('li').find('.active').data('source'),
            startDate:$('#start').val(),
            endDate:$('#end').val(),
            isDedup:$('.main').find('.type-isdedup').find('li').find('.type-isdedup').hasClass('active')?true:false,
            keywords:$('.conditions-searchbox').find('input').val(),
            timeRanges:$('.main').find('.type-timeranges').find('li').find('.active').data('timeranges')
        };

        if(condition.startDate && condition.endDate){
            condition.timeRanges = 0;
        }
        return condition;
    }
    function bindEvent(){
        var $dom = $(".page-allplan");
        /*****
         * 绑定查询条件
         * ****/
        $dom.find('.main').find('.conditions-item').not('.operation,.type-timeranges').find('li').find('a').not('.tab-timeranges').click(function(){
            if($(this).hasClass("digest-btn")){
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                    $(".page-fullView tbody p.digest").addClass("hidden");
                }else{
                    $(this).addClass("active");
                    $(".page-fullView tbody p.digest").removeClass("hidden");
                }
                return;
            }else if($(this).hasClass("mergelike-btn")){
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                }else{
                    $(this).addClass("active");
                }
                return;
            }
            $(this).parent().parent().find("li a.active").removeClass("active");
            $(this).addClass("active");
            getMonitorInfoList(0,20);
        });
        // 时间范围选择时清空日期选择框
        $('.type-timeranges').find('a').click(function(){
            $('.input-daterange').find('input').val('');
            $('#customdays').removeClass('active');
            $(this).parent().parent().find("li a.active").removeClass("active");
            $(this).addClass("active");
            getMonitorInfoList(0,fullViewInit.pageSize);
        });
        $dom.find('.conditions-searchbox').find('button').click(function(){
            getMonitorInfoList(0,20);
        });

        $("#btnFind").click(function(){
            $('#customdays').addClass('active');
            $('.type-timeranges').find('a').removeClass('active');
            getMonitorInfoList(0,fullViewInit.pageSize);
        });
        //在批量取消预警页面上绑定事件，弹出对话框并绑定id
        $('.cancel-alldanger-btn').click(function(){
            //如果选中不为空，弹出确认对话框
            if ($('.cy-checkbox input:checked').length != 0) {
                var docIds = new Object();
                docIds.dedupids=[];
                //获取选中的checkbox上缓存的Id
                $('.cy-checkbox input:checked').each(function(){
                    docIds.dedupids.push($(this).parent().parent().data('docId'));
                });
                //将获取的多个Id绑定到对话框的缓存上
                $('.cancel-alldanger').data('docIds',docIds);
                //弹出对话框
                $('.cancel-alldanger').modal('show');
            }else{
                $('.cancel-danger-none').modal('show');
            }
        });
        $dom.find(".table.table-bordered").on("click",".email-send a",function(){
            var param = {
                "success":function(d){
                    view.renderAddEmail(d);
                }
            }
            ajax.load("addEmail",param);
        });
        //add email
        $("form").on("submit",function(){
            $(this).parent().find(".add-email-ul").append('<li><label class="cy-checkbox"><input type="checkbox"><span></span></label>'+$(this).find("input[type=email]").val()+'</li>')
            return false;
        });
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

        $(".main thead").on("change","tr:first .cy-checkbox",function(){
            if($(this).find("span").hasClass("checked")){
                $(".main tbody").find(".cy-checkbox").find("span").removeClass("checked");
            }else{
                $(".main tbody").find(".cy-checkbox").find("span").addClass("checked");
            }
        })
    }
    //分页
    function pagination(data,index){
        $(".pagination").pagination(data.data.recordTotal, {
            callback: pageSelectCallback,
            prev_text: '上一页',
            next_text: '下一页 ',
            items_per_page:20,
            num_display_entries: 6,
            num_edge_entries: 2,
            current_page: index,
            link_to:'javascript:void(0)',
            ellipse_text:'....'
        });
    }
    function pageSelectCallback(pageNum, jq) {
        getMonitorInfoList(pageNum,fullViewInit.pageSize);
    }
    return {
        init: init
    }
});
