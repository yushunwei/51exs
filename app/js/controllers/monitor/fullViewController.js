
define(["../../tool/ajaxTool","../../view/monitor/fullViewView","../../view/monitor/fullViewChartView","../../view/monitor/fullViewYqView"], function (ajax,view,chartview,yqview) {
  var $tar = $("div.page-index");
  var indexUserPlans = {showCount:0};
  var result = [];
  var titleID = "",
      turnIndex = 0;
 var fullViewInit = {
     pageSize:20
 };
    var all = "";
    var keyword;
  function init(page) {
      titleID = page.query.id;
      turnIndex = typeof page.query.turnTab =="undefined" ? 0: page.query.turnTab;
      getuserplanlist();
      //加载列表
      getMonitorInfoList(0,20);
      //绑定事件
      bindEvent();

      $('#myTab li:eq('+turnIndex+') a').tab('show');
  }
    function _allSeach(page) {
        all = true;
      //加载列表
      getMonitorInfoList(0,20);
      //绑定事件
      bindEvent();
  }
 function getuserplanlist(){
     var param = {
         "success":function(data){
             if (data.data.length === 0) {
                 // 用户方案为空，则直接跳转index_none页面
                //location.href = './index_none.html';
                // showIndexNone();
             } else {
                 view.renderUserplanlist(data);
                 var dom = $(".nav-main li");
                 $.each(dom,function(i,v){
                     $(this).data("id") == titleID &&  $(this).addClass("active");
                 })
                // loadnewYQFA();
                //initFirst3NewPlan(0);
             }
         }
     };
     ajax.load("userplanlist",param);
 }

 function getMonitorInfoList(pageNum,pageSize){
     var param ={"query" :getFullViewQueryCondition(pageNum+1,pageSize)}
     param.success = function(d){
         view.renderList(d);
         result = d;
         pagination(result,pageNum);
     };
     if(all){
         ajax.load("getAllInfoList",param);
     }else{
         ajax.load("getMonitorInfoList",param);
     }
 }
// 获取查询参数
  function getFullViewQueryCondition(pageNum,pageSize){
        var condition = {
            pageNum:pageNum,
            pageSize:pageSize,
            planId:titleID,
            sentiment:$('.main').find('.type-sentiment').find('li').find('.active').data('sentiment'),
            isWarn:$('.main').find('.type-iswarn').find('li').find('.active').data('iswarn'),
            source:$('.main').find('.type-source').find('li').find('.active').data('source'),
            startDate:$('#start').val(),
            endDate:$('#end').val(),
            isDedup:$('.main').find('.type-isdedup').find('li').find('.type-isdedup').hasClass('active')?true:false,
            keywords:$('.conditions-searchbox').find('input').val(),
            timeRanges:$('.main').find('.type-timeranges').find('li').find('.active').data('timeranges')
        };

        if(condition.startDate && condition.endDate){
            condition.timeRanges = 0;
        }
        return condition;
    }
  function bindEvent(){
      var $dom = all ? $(".page-allSeach") : $(".page-fullView");
      /*****
       * 绑定查询条件
       * ****/
      $dom.find('.main').find('.conditions-item').not('.operation,.type-timeranges').find('li').find('a').not('.tab-timeranges').click(function(){
              if($(this).hasClass("digest-btn")){
                  if($(this).hasClass("active")){
                      $(this).removeClass("active");
                      $(".page-fullView tbody p.digest").addClass("hidden");
                  }else{
                      $(this).addClass("active");
                      $(".page-fullView tbody p.digest").removeClass("hidden");
                  }
                  return;
              }else if($(this).hasClass("mergelike-btn")){
                  if($(this).hasClass("active")){
                      $(this).removeClass("active");
                  }else{
                      $(this).addClass("active");
                  }
                  return;
              }
              $(this).parent().parent().find("li a.active").removeClass("active");
              $(this).addClass("active");
              getMonitorInfoList(0,20);
          });
      // 时间范围选择时清空日期选择框
      $('.type-timeranges').find('a').click(function(){
          $('.input-daterange').find('input').val('');
          $('#customdays').removeClass('active');
          $(this).parent().parent().find("li a.active").removeClass("active");
          $(this).addClass("active");
          getMonitorInfoList(0,fullViewInit.pageSize);
      });
      $dom.find('.conditions-searchbox').find('button').click(function(){
          getMonitorInfoList(0,20);
      });

      $("#btnFind").click(function(){
          $('#customdays').addClass('active');
          $('.type-timeranges').find('a').removeClass('active');
          getMonitorInfoList(0,fullViewInit.pageSize);
      });
      $dom.find(".table.table-bordered").on("click",".email-send a",function(){
          var param = {
              "success":function(d){
                  view.renderAddEmail(d);
              }
          };
          ajax.load("addEmail",param);
      });
        //add email
      $("form").on("submit",function(){
          $(this).parent().find(".add-email-ul").append('<li><label class="cy-checkbox"><input type="checkbox"><span></span></label>'+$(this).find("input[type=email]").val()+'</li>')
          return false;
      });
      $('.page-fullView .main').find('.nav-tabs').find('.tab-chart').on('shown.bs.tab', function (e) {
          chartview.init(titleID);
      })
      $('.page-fullView .main').find('.nav-tabs').find('.tab-plan').on('shown.bs.tab', function (e) {

          yqview.init(titleID);
      })
  }
    //分页
  function pagination(data,index){
        $(".pagination").pagination(data.data.recordTotal, {
            callback: pageSelectCallback,
            prev_text: '上一页',
            next_text: '下一页 ',
            items_per_page:20,
            num_display_entries: 6,
            num_edge_entries: 2,
            current_page: index,
            link_to:'javascript:void(0)',
            ellipse_text:'....'
        });
    }
  function pageSelectCallback(pageNum, jq) {
        getMonitorInfoList(pageNum,fullViewInit.pageSize);
    }
  return {
    init: init,
    allSeach:_allSeach
  }
});
