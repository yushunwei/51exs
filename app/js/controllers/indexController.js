define(["tool/ajaxTool","view/indexView","view/homeChartView"], function (ajax,view,cv) {
  var $tar = $("div.page-index");
  var indexUserPlans = {showCount:0};
  var result = [];
  function init(page) {
    //鐢ㄦ埛鏂规
    indexUserPlans = {showCount:0};
      getuserplanlist();
  }
 function getuserplanlist(){
     var param = {
         "success":function(data){
             if (data.data.length === 0) {
                 // 鐢ㄦ埛鏂规涓虹┖锛屽垯鐩存帴璺宠浆index_none椤甸潰
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
  //鍔犺浇鑸嗘儏鏂规
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
     // 鏂规涓暟杈惧埌涓婄嚎鎴栬�呰揪鍒�3涓粓姝㈤�掑綊
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
