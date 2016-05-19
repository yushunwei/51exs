define(["view/monitor/infodetailView","tool/ajaxTool"], function (view,ajax) {
    var page;
    function init() {
        page = arguments[0];
        loadList();
        loaddetail();
        bindEvent();
    }
    function loadList(){
        var param = {
            "success":function(data){
                if (data.data.length === 0) {
                    // 用户方案为空，则直接跳转index_none页面
                    //location.href = './index_none.html';
                    // showIndexNone();
                } else {
                    view.renderList(data);
                }
            },
            "query" : {
                "docId" : page.query.docID
            }
        };
        ajax.load("detailList",param);
    }
    function loaddetail(){
        var param = {
            "success":function(data){
                if (data.data.length === 0) {
                    // 用户方案为空，则直接跳转index_none页面
                    //location.href = './index_none.html';
                    // showIndexNone();
                } else {
                    view.renderdetail(data);
                    view.renderRight(data);
                }
            },
            "query" : {
                "docId" : page.query.docID
            }
        };
        ajax.load("detail",param);
    }
    function bindEvent(){
        $('.btn-warning-delete').click(function(){
            var dedupids = $(".page-infodetail").find("a.original").data("docid");
            if(dedupids!=''){
                //调用删除方案预警邮箱的接口
                var param = {
                    type: 'POST',
                    success: function(data){
                        if(data.status == 200){
                            $('.alert-delete').modal('hidden');
                        }else{
                            alert('删除失败！');
                            $('.alert-delete').modal('hidden');
                        }
                    },
                    data: dedupids

                };
                ajax.load("delYJ",param);
            }
        });
    }
    return {
        init: init
    }
});
