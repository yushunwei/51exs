define(["../../tool/ajaxTool"], function (ajax) {
  function init() {
    //设置图片路径，并开始轮播
    setImgPath();
    //加载登录按钮路径
    setBtnPath();
    //加载注册按钮url
      loadregisterUrl();
  }
  //设置图片路径，并开始轮播
  function setImgPath(){
    var $box = $(".page-login");
    var img = $box.find("#myCarousel").find("img");
    $.each(img,function(i,v){
      $(this).attr("src",HX_config.ADIMG[i]);
      $(this).css("width","100%");
    });
    $('#myCarousel').carousel({
      interval: 3000
    })
  }
  //加载登录按钮路径
  function setBtnPath(){
    var loginBtn = $(".login-init");
    loginBtn.attr("href",HX_config.loginURL);
  }
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
