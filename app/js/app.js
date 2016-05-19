
require(['router','main'], function (Router,main) {
    window.App = main;
  Router.init();
  //在这设置要进入的第一个页面
//  main.laodPage("pages/home.html?id=1&type=333");
 main.parase();
});
