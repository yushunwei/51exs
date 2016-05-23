define(["view/newYqView","tool/ajaxTool"], function (view,ajax) {
  function init() {
    getuserplanlist();
  }
  function getuserplanlist(){
    var param = {
      "success":function(data){
          view.renderUserplanlist(data);
          view.events();
      }
    };
    ajax.load("userplanlist",param);
  }
  return {
    init: init
  }
});
