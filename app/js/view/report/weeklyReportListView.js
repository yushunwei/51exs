define(['tool/Utils'], function (util) {
    var reportHtml,noReportHtml;

    function _render(data, planId, index) {
        if (!data) {
            return false;
        }
        if(data.data.length == 0){
            var planId = {"planId":planId};
            noReportHtml = !noReportHtml?($("#report-none").html()):noReportHtml;
            var noreportTemplate = Handlebars.compile(noReportHtml);
            var norepHtml = noreportTemplate(planId);
            $(".page-weeklyReportList").find("#report-model-"+index).html(norepHtml);
        }else{
            var obj = {
                baseUrl: HX_Ajax_Path.downloadweeklyreport+"?token="+util.getToken(),
                dataArr: data.data
            };
            var newArr = formatDate(obj.dataArr,obj.baseUrl);
            obj.dataArr = newArr;
            reportHtml = !reportHtml?($("#report-item-model").html()):reportHtml;
            var reportTemplate = Handlebars.compile(reportHtml);
            var repHtml = reportTemplate(obj);
            $(".page-weeklyReportList").find("#report-model-"+index).html(repHtml);
        }
    }

    //格式化时间
    function formatDate(arr,url) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].newstart = "";
            arr[i].newend = "";
            arr[i].newstart = arr[i].startDate.split(" ")[0].replace(/-/g, "/");
            arr[i].newend = arr[i].endDate.split(" ")[0].replace(/-/g, "/");
            arr[i].newPath = url+"&path="+arr[i].path+"&reportName="+arr[i].reportName+"&startDate="+arr[i].startDate+
                            "&endDate="+arr[i].endDate;
            arr[i].showPagePath = "path="+arr[i].path+"&reportName="+encodeURIComponent(arr[i].reportName)+"&startDate="+arr[i].startDate+
                "&endDate="+arr[i].endDate+"&reportId="+arr[i].reportId;
        }
        return arr;
    }

    return {
        render: _render
    }
});
