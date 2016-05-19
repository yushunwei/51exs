define([], function () {
  var homepage = "";
  var homename = "index";
  var map = "";
  var _link;
  function _loadView(){

  }
  function _laodPage(){
    typeof arguments[0] == "string" && _turnByUrl(arguments[0]);
  }

  function getQuery (){
      var url = arguments[0];
      var index = url.indexOf("?"); //获取url中"?"符后的字串
      var theRequest = {};
      if (index != -1) {
        var str = url.substr(index+1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
  }
  function _renderPage(data){
    var box =$(data);
    $(document).find("div.content .pages").html(data);
  }
  function _turnByUrl (){
    var url = arguments[0];
    var box;
    var page = {};
    $.get(url,function(d){
      box = $(d);
      page.name = box.data("page");
      page.query = getQuery(url);
      $(document).trigger("pageBeforeInit",[page]);
      _renderPage(d);
    })
  }
  function _pageinit() {
    var query = getQuery(arguments[0]);
    var page = {};
    page.name = "index";
    page.query = query;
    $(document).trigger("pageBeforeInit", [page]);
  }
    function _defaultEvtnt(){
      var selectV;
      $(document).on("click","a",function(e){
        var url = $(this).attr("href");
        if($(this).data("toggle")){
          e.preventDefault();
          $(this).tab('show');
        }
        if(url.indexOf("#")>-1){
          return;
        }
        if(url.indexOf("http")>-1){
          window.open(url);
          return false;
        }
        if($(this).data("type")=="view"){

        }else{
          _laodPage(url);
        }
        return false;
      });
      $(document).on("change",".form-group select",function(e){
          selectV = $(this).val();
          $(this).parent().find("input:visible").val(selectV);
      });
    }
  function _parase(){
    var history = arguments[0] || "login.html";
    _laodPage(history);
    _defaultEvtnt();
  }

  return {
    laodPage: _laodPage,
    loadView: _loadView,
    parase   : _parase
  };
});
