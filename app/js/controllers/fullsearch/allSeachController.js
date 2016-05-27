define(["view/fullsearch/allSearchView","tool/ajaxTool","common/commonController","common/commonView"], function (view,ajax,common,commonView) {
    var fullViewInit = {
        pageSize:20
    };
    var lastSearchParam;
    function getMonitorInfoList(pageNum,pageSize){
        var param ={"query" :getFullViewQueryCondition(pageNum+1,pageSize)};
        lastSearchParam = param.query;
        param.success = function(d){
            if(d.status == 200){
                view.renderList(d);
                result = d;
                pagination(result,pageNum);
                layer.closeAll();
            }else{
                layer.alert(d.subMsg, {icon: 2});
            }
        };
        param.error = function(d){
            layer.alert("加载失败",{icon:2});
        };
        //增加loading效果
        param.beforeSend = function(){
            layer.msg('处理中，请稍后', {icon: 16,time:-1,shade:[0.4,'#CCC']});
        };
        ajax.load("fullwebsearch",param);
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
        if(data.length == 0) return;
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
        $("body").scrollTop(200);
    }
    function allSearch(){
        searchKey = $.trim($(".type-keywords").val());
        if(searchKey) {
            //加载列表
            getMonitorInfoList(0, 20);
        }else{
            view.renderList([]);
        }
    }
    function bindEvents(){
        $("body").on("keypress",function(event){
           if(event.keyCode == 13){
               allSearch();
           }
        });
        $(".page-allSeach").find('.main').find('.conditions-item').not('.operation,.type-timeranges').find('li').find('a').not('.tab-timeranges,.not-open').click(function(){
            if($(this).hasClass("digest-btn")){
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                    $(".page-allSeach tbody p.digest").addClass("hidden");
                }else{
                    $(this).addClass("active");
                    $(".page-allSeach tbody p.digest").removeClass("hidden");
                }
                return;
            }else if($(this).hasClass("mergelike-btn")){
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                }else{
                    $(this).addClass("active");
                }
                allSearch();
                return;
            }
            $(this).parent().parent().find("li a.active").removeClass("active");
            $(this).addClass("active");
            allSearch();
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
            allSearch();
        });
        $(".page-allSeach").find('.conditions-searchbox').find('button').click(function(){
            allSearch();
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
        $("#btnFind").click(function(){
            $('#customdays').addClass('active');
            $('.type-timeranges').find('a').removeClass('active');
            allSearch();
        });
        //点击相似页带入参数
        var _url;
        $(".page-allSeach").on("click",".info-similarcount",function(){
            if(!_url){
                _url = $(this).attr("href");
            }
            delete lastSearchParam.pageNum;
            delete lastSearchParam.pageSize;
            var url = _url;
            url += "&" + $.param(lastSearchParam);
            $(this).attr("href",url);
        })
    }
    function init(page) {
        searchKey = page.query.keyWords ? decodeURIComponent(page.query.keyWords) : "";
        $(".type-keywords").val(searchKey);
        allSearch();
        bindEvents();
        common.handleEmail();
    }
    return {
        init: init
    }
});
