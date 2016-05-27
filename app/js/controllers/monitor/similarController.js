
define(["../../tool/ajaxTool","../../view/monitor/similarView","common/commonController","../../common/commonView"], function (ajax,view,common,commonView) {
    var $tar = $("div.page-allplan");
    var result = [];
    var fullViewInit = {
        pageSize:20
    };
    var pageData = {};
    function init(page) {
        pageData = decode(page.query);
        //加载列表
        getMonitorInfoList(0,20);
        //绑定事件
        bindEvent();
        common.handleEmail();
    }
    /**
     * 参数解码
     * @param obj
     * @returns {*}
     */
    function decode(obj){
        if(!obj){
            return obj;
        }

        for(var i in obj){
            if(obj[i]){
                obj[i] = decodeURIComponent(obj[i]);
            }
        }

        return obj;
    }

    function getMonitorInfoList(pageNum,pageSize){
        pageData.pageNum = pageNum + 1;
        pageData.pageSize = pageSize;
        var param ={"query" :pageData};
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
        ajax.load("getMonitorInfoList",param);
    }
    function bindEvent(){
        var $dom = $(".page-monitorinfolist");

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
