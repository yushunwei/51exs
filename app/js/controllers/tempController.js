define(["main","tool/ajaxTool"], function (m,ajax) {
  function init(page) {
    setToken(page);
      setHeader();
      arguments.length>0 && pageturn(page);
    setWarn();
  }
  function setWarn(){
        var param = {
            "success": function (d) {
                d.data >0 && $("div.header .header-notice span.cy-badge").removeClass("hidden");
            }
        }
        ajax.load("warnNum",param);
  }

  function setToken(page){
      var token = page.query.token;
      token && hx_save.setToken(token);
  }
  function pageturn(page){
   var url = page.query[HX_config.nextPageKEY];
     var path;
     var _url;
     for(var i in page.query){
         if(i=="token"){
             continue;
         }
         if(i==HX_config.nextPageKEY){
             _url = page.query[i]+"?";
         }
         path = path ? path+"&" : "";
         path = i+"="+page.query[i]
     }
   m.laodPage(_url+path);
  }
  function setHeader(){
    var param = {
      "success":function(d){
        $("div.header .header-user").find('span').html(d.data.nickName || d.data.mobile)
      }
    };
    ajax.load("user",param);
  }
  return {
    init: init
  }
});
