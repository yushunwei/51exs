define([], function () {
  //注册对比事件
  Handlebars.registerHelper("compare", function (v1, v2, options) {
    var type = "";
    type = v2 == 1 ? "positive" : (v2 == 0 ? "neutral" : "negative");
    if (v1 == type) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  Handlebars.registerHelper("ul_list", function (v1, v2, options) {
    var dom = "<ul>"+
        "{{#each objects}}"+
        "<li>"+
        "<p><a class='plan-main-item' href='{{this.url}}'>{{this.title}}</a>"+
        "{{#if this.sentiment}}"+
        "{{#compare this.sentiment 1}}"+
        "<span class='label label-info'>正面</span>"+
        "{{else}}"+
        "{{#if this.sentiment}}"+
        "{{#compare this.sentiment -1}}"+
        "<span class='label label-danger'>负面</span>"+
        "{{else}}"+
        "{{/compare}}"+
        "{{/if}}"+
        "{{/compare}}"+
        "{{/if}}"+
        "{{#if this.isWarn}}"+
        "<span class='label label-danger'>预警</span>"+
        "{{else}}"+
        "{{/if}}"+
        "</p>"+
        "<span class='plan-main-item-like'>{{this.pubTime}} [<a href='pages/similarArticle.html'> 相似文章{{this.similarCount}} </a>]</span>"+
        "<img src='img/list_icon.png'>"+
        "</li>"+
        "{{/each}}"+
        "</ul>"
    return dom;
  });
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
                break;
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
                break;
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
                break;
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
                break;
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                break;
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
                break;
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                break;
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
                break;
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
                break;
            default:
                return options.inverse(this);
                break;
        }
    });

    var listModel = "";
  function _renderList(data,i){
      $(".full-view-table table").removeClass("hidden");
    $(".full-view-table .table-pagination").removeClass("hidden");
    $(".full-view-table .index-none").addClass("hidden");
    listModel = listModel ? listModel : $("#listScript").html();
    var myTemplate = Handlebars.compile(listModel);
    var html = myTemplate(data.data);
    //var myTemplate2 = Handlebars.compile(html);
    //var html2 = myTemplate2(data.list);
    //$(".main .plan").eq(i+1).find(".tab-content .plan-main-list").eq(0).html(html2);
    //$(".main .plan").eq(i+1).find(".plan-title h3").html(data.title);
    $('tbody.list-yq').html(html);
  }
  function _renderEmpty(){
    $(".full-view-table table").addClass("hidden");
    $(".full-view-table .table-pagination").addClass("hidden");
    $(".full-view-table .index-none").removeClass("hidden");
  }
  return {
    //用户方案
    renderList :_renderList,
    renderEmpty : _renderEmpty
  }
});
