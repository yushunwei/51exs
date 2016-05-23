
define(["../../tool/ajaxTool","../../view/monitor/similarView"], function (ajax,view) {
    var $tar = $("div.page-allplan");
    var result = [];
    var fullViewInit = {
        pageSize:20
    };
    var pageData = {};
    function init(page) {
        pageData = page.query;
        //加载列表
        getMonitorInfoList(0,20);
        //绑定事件
        bindEvent();
    }

    function getMonitorInfoList(pageNum,pageSize){
        pageData.pageNum = pageNum;
        pageData.pageSize = pageSize;
        pageData.keywords = $('.conditions-searchbox').find('input').val();
        var param ={"query" :pageData};
        param.success = function(d){
            view.renderList(d);
            result = d;
            pagination(result,pageNum);
        };
        ajax.load("getAllInfoList",param);
    }
    function bindEvent(){
        var $dom = $(".page-monitorinfolist");
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