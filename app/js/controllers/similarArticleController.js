define(["view/similarArticleView","tool/ajaxTool"], function (view,ajax) {
  var docID = "";
  var fullViewInit = {
    pageSize:20
  };
    var result;
  function init(page) {
      docID = page.query.id;
      getMonitorInfoList(0,20);
      bindEvent();
  }
  function getMonitorInfoList(pageNum,pageSize){
        var param ={"query" :getFullViewQueryCondition(pageNum+1,pageSize)}
        param.success = function(d){
            view.renderList(d);
            result = d
            pagination(result,pageNum);
        }
        ajax.load("getlikeList",param);
    }
    function getFullViewQueryCondition(pageNum,pageSize){
        var condition = {
            pageNum:pageNum,
            pageSize:pageSize,
            docId :docID
        };
        return condition;
    }
    //分页
    function pagination(data,index){
        $(".pagination").pagination(data.data.count, {
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

    function bindEvent(){
        $(".page-similarArticle table.table-bordered").on("click",".email-send a",function(){
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
  return {
    init: init
  }
});
