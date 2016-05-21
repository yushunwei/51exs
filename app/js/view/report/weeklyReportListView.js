define([], function () {
    var scriptHtml;
    function _render(data,parentsD,index){
        if(!data){
            return false;
        }
        if(data.data.length == 0){
            parentsD.find(".report-none").show();
        }else{
            parentsD.find(".report-none").hide();
            var newArr = formatDate(data.data);
            scriptHtml = !scriptHtml?($("#report-item-0").html()):scriptHtml;
            var myTemplate1 = Handlebars.compile(scriptHtml);
            var html1 = myTemplate1(newArr);
            parentsD.find("#report-box-"+(index)).append(html1);
        }
    }
    //格式化时间
    function formatDate(arr){
        for(var i=0;i<arr.length;i++){
            arr[i].newstart = "";
            arr[i].newend = "";
            arr[i].newstart = arr[i].startDate.split(" ")[0].replace(/-/g,"/");
            arr[i].newend = arr[i].endDate.split(" ")[0].replace(/-/g,"/");
        }
        return arr;
    }
    function _events(){
        $(".page-weeklyReportList").on("click","a.report-download",function(){
            var param = {
                query:{
                    path:$(this).parent().data("path"),
                    startDate:$(this).parent().data("startDate"),
                    endDate:$(this).parent().data("endDate"),
                    reportName:$(this).parent().prev(".report-date").text()
                },
                success:function(data){
                    console.log(data)
                }
            };
            ajax.load('weeklyReportDown',param);
        })
        $(".page-weeklyReportList").on("click","a.report-btn",function(){
            var reportId = $(this).parent().data("reportid");
            window.location.href = 'checkReport.html?reportid='+reportId;
        })
    }
  return {
      render:_render,
      events:_events
  }
});
