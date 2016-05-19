define([], function () {
  function init() {
    var $box = $(".page-register");
    $box.find("a#e-explan").on("click",function(){
      $('#myModal').modal({
        keyboard: true
      });
      return false;
    })
  }

  return {
    init: init
  }
});
