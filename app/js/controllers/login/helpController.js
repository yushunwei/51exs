define([], function () {
  var $box = $(".page-help");
  function init() {
    //设置在线客户路径
    setonlinePath();
    //加载登录按钮路径
    setBtnPath();
    //加载注册按钮url
    loadregisterUrl();

  }
  function setonlinePath(){
    var btn = $box.find("a.online-btn");
    btn.attr("href",HX_config.consult);
  }
  //加载登录按钮路径
  function setBtnPath(){
    var loginBtn = $(".login-init");
    loginBtn.attr("href",HX_config.loginURL);
  }
  //加载注册按钮url
  function loadregisterUrl(){
    var param = {
      "success":function(data){
        $("#register-btn").attr("href",data.data);
      }
    };
    ajax.load("register",param);
  }
  return {
    init: init
  }
});
