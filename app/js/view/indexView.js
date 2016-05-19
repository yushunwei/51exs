define([], function () {
  //注册对比事件
  Handlebars.registerHelper("compare", function (v1, v2, options) {
    var type = "";
    type = v2 == 1 ? "positive" : "negative";
    if (v1 == type) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  function _render(data) {

    //var myTemplate = Handlebars.compile($("#table-template").html());
    //$('#tableList').html(myTemplate(data));
  }
  function _renderYqfa(data) {
    var myTemplate = Handlebars.compile($("#yqfaTitleScript").html());
    $('#yqfaTitle').html(myTemplate(data));

    var myTemplate = Handlebars.compile($("#yqfaListAllScript").html());
    $('#yqfaListAll').html(myTemplate(data));
  }
  return {
    render: _render,
    renderYqfa  :  _renderYqfa
  }
});
