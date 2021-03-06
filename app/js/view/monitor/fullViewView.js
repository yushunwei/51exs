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
        "<span class='plan-main-item-like'>{{this.pubTime}} [<a href='/pages/similarArticle.html'> 相似文章{{this.similarCount}} </a>]</span>"+
        "<img src='img/list_icon.png'>"+
        "</li>"+
        "{{/each}}"+
        "</ul>"
    return dom;
  });
    var listModel = "",
        emailModel;

  function _renderUserplanlist(data) {
    var myTemplate = Handlebars.compile($("#userlistScript").html());
    $('.nav-main .listbox').html(myTemplate(data.data));
    var length = data.data.length+2;
    $('.nav-main .listbox li').css("width",100/length+"%");
  }
  function _renderYqfa(data) {
    var myTemplate = Handlebars.compile($("#yqfaListAllScript").html());
    $('#yqfaListAll').html(myTemplate(data));
  }

  function _renderList(data,i){
      if(data.length == 0 || data.data.recordTotal == 0){
          $(".full-view-table table").addClass("hidden").find("tbody tr").remove();
          $(".full-view-table .table-pagination").addClass("hidden");
          $(".full-view-table .index-none").removeClass("hidden");
          $(".conditions-box .operation a").addClass("disabled");
          return;
      }else{
          $(".conditions-box .operation a").removeClass("disabled");
          $(".full-view-table table").removeClass("hidden");
          $(".full-view-table .table-pagination").removeClass("hidden");
          $(".full-view-table .index-none").addClass("hidden");
      }
      listModel = listModel ? listModel : $("#listScript").html();
      var myTemplate = Handlebars.compile(listModel);
    var html = myTemplate(data.data);
    //var myTemplate2 = Handlebars.compile(html);
    //var html2 = myTemplate2(data.list);
    //$(".main .plan").eq(i+1).find(".tab-content .plan-main-list").eq(0).html(html2);
    //$(".main .plan").eq(i+1).find(".plan-title h3").html(data.title);
    $('tbody.list-yq').html(html);


  }

  function _renderAddEmail(d){
      emailModel = emailModel ? emailModel : $(".add-email").find("#addemailScript").html();
      var myTemplate = Handlebars.compile(emailModel);
      var html = myTemplate(d);
      $(".add-email .add-email-ul").html(html);

  }
  return {
    //用户方案
    renderUserplanlist :_renderUserplanlist,
    renderYqfa  :  _renderYqfa,
    renderList :_renderList,
    renderAddEmail:_renderAddEmail
  }
});
