define([], function () {
  var $box = $(".page-help");
  function init() {
    setonlinePath();
    setBtnPath();
    showSlide();

  }
  function setonlinePath(){
    var btn = $box.find("a.online-btn");
    btn.attr("href",HX_config.consult);
  }
  function setBtnPath(){
    var registerBtn = $("#register-btn");
    var loginBtn = $("#login-btn");
    registerBtn.attr("href",HX_config.registerURL);
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
  return {
    init: init
  }
});
