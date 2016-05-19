define([], function () {
    var listModel,emailModel
  function _renderList(data) {
      listModel = listModel ? listModel : $("#listScript").html();
      var myTemplate = Handlebars.compile(listModel);
      var html = myTemplate(data.data);
      $('tbody.list-yq').html(html);
  }
    function _renderAddEmail(d){
        emailModel = emailModel ? emailModel : $(".page-similarArticle .add-email").find("#addemailScript").html();
        var myTemplate = Handlebars.compile(emailModel);
        var html = myTemplate(d);
        $(".page-similarArticle .add-email .add-email-ul").html(html);
    }
  return {
    renderList: _renderList,
    renderAddEmail:_renderAddEmail
  }
});
