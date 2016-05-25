define([], function () {
    //
  //注册对比事件 v1 为后台传入的参数，v2为状态值
  Handlebars.registerHelper("compare", function (v1, v2, options) {
    var type = "";
    type = v2 == 1 ? "positive" : (v2 == 0 ? "neutral" : "negative");
    if (v1 == type) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  Handlebars.registerHelper("js_compare", function (v1, v2, options) {
    if (v1 == v2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  Handlebars.registerHelper("ul_list", function (v1, v2, options) {
    var dom = "<ul>"+
        "{{#each objects}}"+
        "<li>"+
        "<p><a class='plan-main-item' href='/pages/monitor/infodetail.html?docID={{this.docId}}&isWarn={{isWarn}}' target='_blank' data-pageturn='true'>{{this.title}}</a>"+
        "{{#if this.sentiment}}"+
        "{{#compare this.sentiment 1}}"+
        "<span class='label label-info label-ststus'>正面</span>"+
        "{{else}}"+
        "{{#if this.sentiment}}"+
        "{{#compare this.sentiment -1}}"+
        "<span class='label label-danger label-ststus'>负面</span>"+
        "{{else}}"+
        "{{/compare}}"+
        "{{/if}}"+
        "{{/compare}}"+
        "{{/if}}"+
        "{{#if this.isWarn}}"+
            "{{#js_compare isWarn 'yes'}}"+
        "<span class='label label-danger'>预警</span>"+
        "{{else}}"+
            "{{/js_compare}}"+
        "{{/if}}"+
        "</p>"+
        "<span class='plan-main-item-like'>{{this.pubTime}} [<a data-pageturn='true'> 相似文章{{this.similarCount}} </a>]</span>"+
        "<img src='img/list_icon.png'>"+
        "</li>"+
        "{{/each}}"+
        "</ul>";
    return dom;
  });
  var listModel;
  function _renderUserplanlist(data) {
    var myTemplate = Handlebars.compile($("#userlistScript").html());
    $('.nav-main .listbox').html(myTemplate(data.data));
    var length = data.data.length+2;
    $('.nav-main .listbox li').css("width",100/length+"%");
  }
  function _renderYqfa(data,tabID) {
    listModel = listModel ? listModel :$("#yqfaListAllScript").html();
    var myTemplate = Handlebars.compile(listModel);
    var dom = tabID ? $(tabID) : $("#list1-all");
    dom.find("ul").html(myTemplate(data));
    if(arguments.length==3 && arguments[2]!=1){
       dom.find(".plan-main-list").find("li p span.label-ststus").hide();
    }
  }

  function _renderList(data,i){
    var myTemplate = Handlebars.compile("{{#ul_list}}{{/ul_list}}");
    var html = myTemplate();
    var myTemplate2 = Handlebars.compile(html);
    var html2 = myTemplate2(data.list);
    $(".main .plan").eq(i+1).find(".tab-content .plan-main-list").eq(0).html(html2);
    $(".main .plan").eq(i+1).find(".plan-title h3").html(data.title);
    $(".main .plan").eq(i+1).find(".plan-title a").attr("href","/pages/monitor/full_view.html?id="+data.id);
    $(".main .plan").eq(i+1).find(".plan-title a").attr("target","_blank");
    $(".main .plan").eq(i+1).find(".nav-tabs").attr("planID",data.id);
  }
  function _renderTabList(data,tabID){
    var myTemplate = Handlebars.compile("{{#ul_list}}{{/ul_list}}");
    var html = myTemplate();
    var myTemplate2 = Handlebars.compile(html);
    var html2 = myTemplate2(data);
    var dom = $(tabID);
    dom.find(".plan-main-list").html(html2);
    if(arguments.length==3 && arguments[2]!=1){
       dom.find(".plan-main-list").find("li p span.label-ststus").hide();
    }
  }
  return {
    //用户方案
    renderUserplanlist :_renderUserplanlist,
    renderYqfa  :  _renderYqfa,
    renderList :_renderList,
    renderTabList:_renderTabList
  }
});
