define(["tool/ajaxTool"], function (ajax) {
  function init() {
    setImgPath();
    setBtnPath();
  //  showSlide();
    //加载注册url
    loadregisterUrl();
   // bindEvent();
  }
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
  function setBtnPath(){
    var $box = $(".page-login");
    var loginBtn = $("#login-btn");
    loginBtn.attr("href",HX_config.loginURL);
  }
  function showSlide(){
    var img = $(".branding-inner div");
    var nav = $(".navigator li");
    var img_num = img.length;
    var i = 0;
    //显示当前项
    function show() {
      i++;
      if(i > img_num -1) {
        i = 0;
      }
      nav.removeClass("cur").eq(i).addClass("cur");
      img.fadeOut("500").eq(i).fadeIn("500");
    }
    //定时器
    var slide = null;
    slide = setInterval(show,2000);
    //鼠标经过停止播放，离开继续播放
    $(".branding-inner").bind("mouseover",function() {
      clearInterval(slide);
    })
    $(".branding-inner").bind("mouseout",function() {
      slide = setInterval(show,2000);
    })
    //鼠标点击哪项即显示哪项，点击当前项不变
    nav.click(function(){
      clearInterval(slide);
      var j = $(this).index();
      if(i == j) {
        return false;
      }
      else if(i != j ) {
        i = j - 1;
        show();
      }
    })
  }
  function loadregisterUrl(){
      var param = {
        "success":function(data){
            $("#register-btn").attr("href",data.data);
        }
      };
      ajax.load("register",param);
    //$("#register-btn")
  }
  return {
    init: init
  }
});
