define([], function () {
    //YQtype ishidden
    Handlebars.registerHelper("YQtype", function (v1, v2, options) {
        var result;
       if(v1=="positive"){
           result = "正面";
       }else if(v1=="negative"){
           result = "负面";
       }else{
           result = "中性";
       }
        return result;
    });
    Handlebars.registerHelper("ishidden", function (v1, v2, options) {
        if(v1==0){
            return hidden;
        }
        return "";
    });
    var dom = $(".page-infodetail");
    function _renderList(data) {
        var myTemplate = Handlebars.compile($("#detailList").html());
        dom.find(".detail-right .related .related-main").html(myTemplate(data));
    }
    function _renderdetail(data) {
        var myTemplate = Handlebars.compile($("#detail").html());
        dom.find(".detail-left").html(myTemplate(data.data));
    }
    function _renderRight(data) {
        var myTemplate = Handlebars.compile($("#detailright").html());
        dom.find(".detail-right .detail-data").html(myTemplate(data.data));
    }
    return {
        renderList: _renderList,
        renderdetail: _renderdetail,
        renderRight: _renderRight
    }
});
