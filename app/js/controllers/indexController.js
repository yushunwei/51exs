define(["tool/ajaxTool","view/indexView","view/homeChartView"], function (ajax,view,cv) {
  var $tar = $("div.page-index");
  var indexUserPlans = {showCount:0};
  var result = [];
  function init(page) {
    //用户方案
    indexUserPlans = {showCount:0};
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
                 indexUserPlans.userPlans = data.data;
                 view.renderUserplanlist(data);
                 //TODO  turn to jquery promise
                 loadnewYQFA();
                initFirst3NewPlan(0);
             }
         }
     };
     ajax.load("userplanlist",param);
 }
  //加载舆情方案
  function loadnewYQFA(){
    var param = {
      "success":function(data){
        view.renderYqfa(data.data);
        cv.chartInit();
        bindYqFAEvent();
      }
    };
    ajax.load("home_yqfa",param);
  }
    function bindYqFAEvent(){
        $(".plan").eq(0).on('click',".list-tabs a",function(){
            var type = $(this).parent().data("type")|| ' ';
            var tabID = $(this).attr("href");
            var param = {
                "success":function(data){
                    view.renderYqfa(data.data,tabID);
                },
                "query" : {
                    "sentiment":type
                }
            };
            ajax.load("home_yqfa",param);
        })
    }
  function initFirst3NewPlan(i){
     // 方案个数达到上线或者达到3个终止递归
    if(i === indexUserPlans.userPlans.length || indexUserPlans.showCount === 3){
      bindListEvent();
      return;
    }
    var userPlan = indexUserPlans.userPlans[i];
      //var plan = $(".main .plan").filter(":gt(0)");
      var param = {
          "data":{
            planId : userPlan.id
          },
          "success":function(data){
            if(data.data.recordTotal > 0) {
              var p = {"list":data.data,"title":userPlan.title,"id":userPlan.id};
              view.renderList(p,indexUserPlans.showCount);
              cv.chartInit(userPlan.id,"chartBar"+(indexUserPlans.showCount+1));
              indexUserPlans.showCount++;
            }
            initFirst3NewPlan(i+1);
          }
      };
          ajax.load("home_list",param);
   }

  function bindListEvent(){
      $(".plan").filter(":gt(0)").on('click',".list-tabs a",function(){
          var type = $(this).parent().data("type")|| ' ';
          var tabID = $(this).attr("href");
          var id = $(this).parent().parent().attr("planid");
          var param = {
              "success":function(data){
                  view.renderTabList(data.data,tabID);
              },
              "query" : {
                  "planId":id,
                  "sentiment":type
              }
          };
          ajax.load("home_list",param);
      })
  }
  return {
    init: init
  }
});
