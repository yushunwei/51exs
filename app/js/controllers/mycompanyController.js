define(["tool/ajaxTool","view/indexView"], function (ajax,view) {
  var $tar = $("div.page-index");
  function init(page) {
  //  loadAjax(page);
  //  ec.init();
  //  bindTitleEvent();
  }
  function loadAjax(page){
     // view.render();
    loadYqfa();


  }
  //加载舆情方案
  function loadYqfa(){
    var param = {
      "success":function(data){
        view.renderYqfa(data);
      }
    };
    ajax.load("yqfa",param);
  }
  function bindTitleEvent(){
    $tar.find("div.plan-main-title li a").on("click",function(){
      $(this).parent().parent().find("a").removeClass("active");
      !$(this).hasClass("active") && $(this).addClass("active");

    })
  }
  return {
    init: init
  }
});
