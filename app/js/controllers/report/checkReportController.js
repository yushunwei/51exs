define(['tool/ajaxTool','../../view/report/checkReportView'], function (ajax,view) {
    function getWeeklyReadGuideList(reportId){
        var param = {
            query:{
                reportId:reportId
            },
            success:function(data){
                if(data.status == 200){
                    view.renderWeeklyReadGuideList(data.data);
                }else{
                    $(".weeklyReadGuidList").html(HX_config.errorHtml)
                }
            },
            error:function(){
                $(".weeklyReadGuidList").html(HX_config.errorHtml);
            }
        };
        ajax.load('weeklyReadGuidList',param)
    }
    function getWeeklyCarrierdisList(reportId){
        var param = {
            query:{
                reportId:reportId
            },
            success:function(data){
                if(data.status == 200){
                    view.renderWeeklyCarrierdisList(data.data);
                }else{
                    $(".weeklyCarrierdisList").html(HX_config.errorHtml);
                    $("#reportChartPie").html(HX_config.errorHtml)
                }
            },
            error:function(){
                $(".weeklyCarrierdisList").html(HX_config.errorHtml);
                $("#reportChartPie").html(HX_config.errorHtml)
            }
        };
        ajax.load('weeklyCarrierdisList',param)
    }
    function getWeeklyTop10PositiveList(reportId){
        var param = {
            query:{
                reportId:reportId,
                sentiment:"positive"
            },
            success:function(data){
                if(data.status == 200){
                    view.renderWeeklyTop10SentmediadisList(data.data,true);
                }else{
                    $("#reportChartBar1").html(HX_config.errorHtml);
                }
            },
            error:function(){
                $("#reportChartBar1").html(HX_config.errorHtml);
            }
        };
        ajax.load('weeklyTop10SentmediadisList',param)
    }
    function getWeeklyTop10NegativeList(reportId){
        var param = {
            query:{
                reportId:reportId,
                sentiment:"negative"
            },
            success:function(data){
                if(data.status == 200){
                    view.renderWeeklyTop10SentmediadisList(data.data,false);
                }else{
                    $("#reportChartBar2").html(HX_config.errorHtml);
                }
            },
            error:function(){
                $("#reportChartBar2").html(HX_config.errorHtml);
            }
        };
        ajax.load('weeklyTop10SentmediadisList',param)
    }
  function init(data){
      if(!$.isEmptyObject(data.query)){
        view.renderPage(data.query);
          //获取导读列表数据
          console.log(data)
          getWeeklyReadGuideList(data.query.reportId);
          //获取载体分布统计
          getWeeklyCarrierdisList(data.query.reportId);
          //获取top10情感信息媒体分布列表
          getWeeklyTop10PositiveList(data.query.reportId);
          getWeeklyTop10NegativeList(data.query.reportId);
      }
  }
  return {
    init: init
  }
});
