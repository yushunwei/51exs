define(["view/fullsearch/allSearchView","tool/ajaxTool","common/commonController"], function (view,ajax,common) {
    var fullViewInit = {
        pageSize:20
    };
    function getMonitorInfoList(pageNum,pageSize){
        var param ={"query" :getFullViewQueryCondition(pageNum+1,pageSize)}
        param.success = function(d){
            console.log(param);
            view.renderList(d);
            result = d;
            pagination(result,pageNum);
        };
        ajax.load("fullwebsearch",param,".full-view-table");
    }
    // 获取查询参数
    function getFullViewQueryCondition(pageNum,pageSize){
        var condition = {
            startDate : $("#start").val(),
            endDate : $("#end").val(),
            pageNum:pageNum,
            pageSize:pageSize,
            sentiment:$('.main').find('.type-sentiment').find('li').find('.active').data('sentiment'),
            source:$('.main').find('.type-source').find('li').find('.active').data('source'),
            timeRanges:$('.main').find('.type-timeranges').find('li').find('.active').data('timeranges'),
            isDedup:$('.main').find('.type-isdedup').find('li').find('.type-isdedup').hasClass('active')?true:false,
            keywords:searchKey
        };

        if($("#customdays").hasClass("active")){
            condition.timeRanges = 0;
        }else{
            delete condition.startDate;
            delete condition.endDate;
        }
        return condition;
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
    function allSearch(){
        searchKey = searchKey ? searchKey : $(".type-keywords").val();
        if(searchKey) {
            //加载列表
            getMonitorInfoList(0, 20,searchKey);
        }else{
            view.renderEmpty();
        }
    }
    function bindEvents(){
        $("body").on("keypress",function(event){
           if(event.keyCode == 13){
               allSearch();
           }
        });
        $(".btn-search").on("click",function(){
            allSearch();
        });
        $(".page-allSeach").find('.main').find('.conditions-item').not('.operation,.type-timeranges').find('li').find('a').not('.tab-timeranges').click(function(){
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
            allSearch();
        });
        // 时间范围选择时清空日期选择框
        $('.type-timeranges').find('a').click(function(){
            $('#customdays').removeClass('active');
            $(this).parent().parent().find("li a.active").removeClass("active");
            $(this).addClass("active");
            allSearch();
        });
        $(".page-allSeach").find('.conditions-searchbox').find('button').click(function(){
            allSearch();
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
        $('.order-box').click(function(e){
            e.stopPropagation();
        });
        $("#btnFind").click(function(){
            allSearch();
        });
    }
    function init(page) {
        searchKey = page.query.keyWords;
        $(".type-keywords").val(searchKey);
        allSearch();
        bindEvents();
        common.handleEmail();
    }
    return {
        init: init
    }
});
