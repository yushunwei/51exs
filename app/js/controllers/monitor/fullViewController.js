
define(["../../tool/ajaxTool","../../view/monitor/fullViewView","../../view/monitor/fullViewChartView","../../view/monitor/fullViewYqView","common/commonController","../../common/commonView"], function (ajax,view,chartview,yqview,common,commonView) {
  var result = [];
  var titleID = "",
      turnIndex = 0;
 var fullViewInit = {
     pageSize:20
 };
    var keyword,lastSearchParam;
  function init(page) {
      titleID = page.query.id;
      turnIndex = typeof page.query.turnTab =="undefined" ? 0: page.query.turnTab;
      getuserplanlist();
      //加载列表
      getMonitorInfoList(0,20);
      //绑定事件
      bindEvent();

      $('#myTab li:eq('+turnIndex+') a').tab('show');
      common.handleEmail();
  }
 function getuserplanlist(){
     var param = {
         "success":function(data){
             if (data.data.length === 0) {
                 // 用户方案为空，则直接跳转index_none页面
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
     lastSearchParam = param.query;
     param.success = function(d){
         if(d.status == 200){
             view.renderList(d);
             result = d;
             pagination(result,pageNum);
             layer.closeAll();
         }else{
             layer.alert(d.subMsg, {icon: 2});
         }
     };
     param.error = function(d){
         layer.alert("加载失败",{icon:2});
     };
     //增加loading效果
     param.beforeSend = function(){
         layer.msg('处理中，请稍后', {icon: 16,time:-1,shade:[0.4,'#CCC']});
     };
     ajax.load("getMonitorInfoList",param);
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
            keywords: $.trim($('.conditions-searchbox').find('input').val()),
            timeRanges:$('.main').find('.type-timeranges').find('li').find('.active').data('timeranges')
        };

      if($("#customdays").hasClass("active")){
          condition.timeRanges = 0;
      }else{
          delete condition.startDate;
          delete condition.endDate;
      }
      return condition;
    }
  function bindEvent(){
      var $dom = $(".page-fullView");
      /*****
       * 绑定查询条件
       * ****/
      $dom.find('.main').find('.conditions-item').not('.operation,.type-timeranges').find('li').find('a').not('.tab-timeranges,.not-open').click(function(){
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
                  getMonitorInfoList(0,20);
                  return;
              }
              $(this).parent().parent().find("li a.active").removeClass("active");
              $(this).addClass("active");
              getMonitorInfoList(0,20);
          });
      //未开通的信息来源不可搜索，并给出提示
      $('.conditions-item li a.not-open').mouseover(function(){
          var content = '<div class="not-open-tip">即将开通,敬请期待！</div>';
          var x = $(this).innerWidth();
          var width = 56 - x/2;
          $(this).append(content);
          $('.not-open-tip').css('left', -width);
      }).mouseout(function(){
          $('.not-open-tip').remove();
      });
      // 时间范围选择时清空日期选择框
      $('.type-timeranges').find('a').click(function(){
          $('#customdays').removeClass('active');
          $(this).parent().parent().find("li a.active").removeClass("active");
          $(this).addClass("active");
          getMonitorInfoList(0,fullViewInit.pageSize);
      });
      $dom.find('.conditions-searchbox').find('button').click(function(){
          getMonitorInfoList(0,20);
      });
      // 自定义日期弹出框
      $('.chart-analysis-title-other-btn').click(function(e){
          $('.order-box').toggle();
          $(document).on('click', function(e){
              $('.order-box').hide();
          });
          e.stopPropagation();
      });
      $('.order-box').click(function(e){
          e.stopPropagation();
      });
      $("#btnFind").click(function(){
          $('#customdays').addClass('active');
          $('.type-timeranges').find('a').removeClass('active');
          getMonitorInfoList(0,fullViewInit.pageSize);
      });
      $('.page-fullView .main').find('.nav-tabs').find('.tab-chart').on('shown.bs.tab', function (e) {
          chartview.init(titleID);
          $("span#customdays1").removeClass("active");
          $("#profile .tab-timeranges").removeClass("active");
          $("#profile .tab-timeranges:first").addClass("active");
      });
      $('.page-fullView .main').find('.nav-tabs').find('.tab-plan').on('shown.bs.tab', function (e) {
          yqview.init(titleID);
      });
      //点击相似页带入参数
      $('.page-fullView .main').on("click",".info-similarcount",function(){
          delete lastSearchParam.pageNum;
          delete lastSearchParam.pageSize;
          var url = $(this).attr("href");
          url += "&" + $.param(lastSearchParam);
          $(this).attr("href",url);
          // return false;
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
        $("body").scrollTop(200);
    }
  return {
    init: init
  }
});
