
define(["../../tool/ajaxTool","../../view/monitor/allplanView","common/commonController","common/commonView"], function (ajax,view,common,commonView) {
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
        titleID = page.query.id || "";
        sentiment = page.query.sentiment;
        getuserplanlist();
        //加载列表
        getMonitorInfoList(0,20);
        //绑定事件
        bindEvent();
        common.handleEmail();
    }
    function getuserplanlist(){
        var param = {
            "async" : false,
            "success":function(data){
                if (data.data.length === 0) {
                    // 用户方案为空，则直接跳转index_none页面
                    // showIndexNone();
                } else {
                    view.renderUserplanlist(data);
                }
            }
        };
        ajax.load("userplanlist",param);
    }
    function getMonitorInfoList(pageNum,pageSize){
        var param ={"query" :getFullViewQueryCondition(pageNum+1,pageSize)}
        param.success = function(d){
            if(d.status == 200){
                view.renderList(d);
                result = d;
                pagination(result,pageNum);
            }else{
                layer.alert(d.subMsg, {icon: 2});
            }
        };
        param.error = function(d){
            layer.alert("加载失败",{icon:2});
        };
        ajax.load("getMonitorInfoList",param);
    }
// 获取查询参数
    function getFullViewQueryCondition(pageNum,pageSize){
        var condition = {
            pageNum:pageNum,
            pageSize:pageSize,
            planId:$('.main').find('.type-plan').find('li').find('.active').data('planid') || "",
            sentiment:sentiment || $('.main').find('.type-sentiment').find('li').find('.active').data('sentiment'),
            isWarn:$('.main').find('.type-iswarn').find('li').find('.active').data('iswarn'),
            source:$('.main').find('.type-source').find('li').find('.active').data('source'),
            startDate:$('#start').val(),
            endDate:$('#end').val(),
            isDedup:$('.main').find('.type-isdedup').find('li').find('.type-isdedup').hasClass('active')?true:false,
            keywords:$('.conditions-searchbox').find('input').val(),
            timeRanges:$('.main').find('.type-timeranges').find('li').find('.active').data('timeranges')
        };

        if($("#customdays").hasClass("active")){
            condition.timeRanges = 0;
        }else{
            delete condition.startDate;
            delete condition.endDate;
        }
        return condition;
    }
    function bindEvent(){
        var $dom = $(".page-allplan");
        /*****
         * 绑定查询条件
         * ****/
        $dom.find('.main').find('.conditions-item').not('.operation,.type-timeranges').find('li').find('a').not('.tab-timeranges,.not-open').on("click",function(){
            if($(this).hasClass("digest-btn")){
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                    $(".page-allplan tbody p.digest").addClass("hidden");
                }else{
                    $(this).addClass("active");
                    $(".page-allplan tbody p.digest").removeClass("hidden");
                }
                return;
            }else if($(this).hasClass("mergelike-btn")){
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                }else{
                    $(this).addClass("active");
                }
                getMonitorInfoList(0,20);
                return;
            }
            $(this).parent().parent().find("li a.active").removeClass("active");
            $(this).addClass("active");
            getMonitorInfoList(0,20);
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
        $('.type-timeranges').find('a').click(function(){
            $('#customdays').removeClass('active');
            $(this).parent().parent().find("li a.active").removeClass("active");
            $(this).addClass("active");
            getMonitorInfoList(0,fullViewInit.pageSize);
        });
        $dom.find('.conditions-searchbox').find('button').click(function(){
            getMonitorInfoList(0,20);
        });
        // 自定义日期弹出框
        $('.chart-analysis-title-other-btn').click(function(e){
            $('.chart-analysis-title-other-btn').toggleClass("active");
            $('.type-timeranges').find('a').removeClass("active");
            $('.order-box').toggle();
            $(document).on('click', function(e){
                $('.order-box').hide();
            });
            e.stopPropagation();
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
