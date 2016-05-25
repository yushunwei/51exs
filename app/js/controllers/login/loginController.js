define(["../../tool/ajaxTool"], function (ajax) {
  function init() {
    // 初始化轮播
    initCarousel();
    //加载注册按钮url
    loadRegisterUrl();
  }

  /**
   * 初始化轮播
   */
  function initCarousel(){
    $('#myCarousel').carousel({
      interval: 3000
    })
  }

  /**
   * 加载注册地址
   */
  function loadRegisterUrl(){
      var param = {
        "success":function(data){
            $("#register-btn").attr("href",data.data);
        }
      };
      ajax.load("register",param);
  }

  //返回
  return {
    init: init
  }
});
