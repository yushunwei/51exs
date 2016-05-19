define(["tool/Utils","main"], function (utils,main) {
 function _init(){
     var url = arguments[0];
     var other = document.location.href;
     var param = utils.getQuery(other);
     if(param.type=="atcil"){
         main.laodPage("pages/rich.html");
     }else if(param.nextPage){
         main.laodPage(param.nextPage);
     }else{
         main.laodPage(url);
     }
 }
  return {
    init:_init
  };
});
