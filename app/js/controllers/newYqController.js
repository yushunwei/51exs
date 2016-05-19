define(["view/newYqView","tool/ajaxTool"], function (view,ajax) {
  function init() {
    getuserplanlist();
  }
  function getuserplanlist(){
    var param = {
      "success":function(data){
        if (data.data.length === 0) {
          // 用户方案为空，则直接跳转index_none页面
          //location.href = './index_none.html';
          // showIndexNone();
        } else {
          view.renderUserplanlist(data);
          view.events();
          // loadnewYQFA();
          //initFirst3NewPlan(0);
        }
      }
    };
    ajax.load("userplanlist",param);
  }
  return {
    init: init
  }
});
