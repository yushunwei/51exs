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
    _saveLink(url);
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
        if($(this).data("pageturn")){
          e.preventDefault();
          var path = document.location.href;
          var nextpage =url.replace("?","&");
          var _url =path + "?"+HX_config.nextPageKEY+"="+nextpage;
          window.open(_url);
          return false;
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
    var history = _getHistory() || arguments[0] || "index_temp.html";
    _indexContr(history);
    _defaultEvtnt();
  }
  function _getHistory(){
    return sessionStorage.map;
  }
  function _saveLink(){
    sessionStorage.map = arguments[0];
  }
  function  _delLink(){
   // sessionStorage.map = "";
  }
  function _indexContr(){
    var url = arguments[0];
    var other = document.location.href;
    var param = getQuery(other);
    if(param.type=="atcil"){
      _laodPage("pages/rich.html");
    }else if(param[HX_config.nextPageKEY]){
        var link = document.location.href;
        var index = link.indexOf("?");
        document.location.href = link.substring(0,index);
       var path = HX_config.nextPageKEY+"="+param[HX_config.nextPageKEY]+"&"+link.substr(index+1);
       _laodPage("index_temp.html?"+path);
    }else{
      _laodPage(url);
    }
   // _laodPage(url);
  }
  return {
    laodPage: _laodPage,
    loadView: _loadView,
    parase   : _parase,
    saveLink  : _saveLink
  };
});
