define(["view/monitor/infodetailView","tool/ajaxTool"], function (view,ajax,common) {

    var dedupId = "";

    /**
     * 事件绑定
     * @private
     */
    function _bindEvent(){
        $(document).on("click",".trash-box",function(){
            // 相似文章ID赋值
            dedupId = $(this).data("dedupid");
            //弹出对话框
            $('.alert-delete').modal('show');

        });

        $(".btn-warning-delete").click(function(){
            cancelSimilarWarn(dedupId);
        });
    }

    /**
     * 取消相似预警
     * @param dedupId 相似预警ID
     */
    function cancelSimilarWarn(dedupId){
        var param = {
            type: 'POST',
            success: function(data){
                $('.alert-delete').modal('hide');
                if(data.status == 200){
                    $(".btn-cancel").parent().remove();
                }else {
                    alert("操作失败，请重试！");
                }
            },
            error:function(){
                $('.alert-delete').modal('hide');
                alert("操作失败，请重试！");
            },
            data: {dedupids:[dedupId]}

        };
        ajax.load("delYJ",param);
    }

    /**
     * 加载文章详情
     * @param docId 文章ID
     * @param isWarn 是否预警
     * @private
     */
    function _loadInfoDetail(docId,isWarn){
        var param = {
            success:function(data){
                if(data.status == 200){
                    data.data.isWarn = isWarn;
                    view.renderdetail(data);
                    view.renderRight(data);
                }else {
                    $(".detail-left").html(HX_config.errorHtml);
                    $(".detail-data").html(HX_config.errorHtml);
                }
            },
            error:function(){
                $(".detail-left").html(HX_config.errorHtml);
                $(".detail-data").html(HX_config.errorHtml);
            },
            query:{
                docId:docId
            }
        };

        ajax.load("detail",param);
    }

    // 加载相关舆情
    function _loadRelateInfoList(docId){
        var param = {
            success:function(data){
                if(data.status == 200){
                    if(data.data.length === 0){
                        $(".related-main").html(HX_config.noDataHtml);
                    }else{
                        view.renderList(data);
                    }
                }else{
                    $(".related-main").html(HX_config.errorHtml);
                }
            },
            error:function(){
                $(".related-main").html(HX_config.errorHtml);
            },
            query:{
                docId:docId
            }
        };
        ajax.load("detailList",param);
    }

    // 初始化
    function init(page){
        // 文章Id，是否预警
        var docId = page.query.docID;
            isWarn = page.query.isWarn;

        if(!docId){
            return;
        }

        // 事件绑定
        _bindEvent();
        // 加载文件详情
        _loadInfoDetail(docId,isWarn);
        // 加载相关舆情
        _loadRelateInfoList(docId);
    }

    return {
        init:init
    };
});
