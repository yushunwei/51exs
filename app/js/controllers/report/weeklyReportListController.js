define(['tool/ajaxTool','../../view/report/weeklyReportListView'], function (ajax,view) {
    var planHtml ;
    function getuserplanlist(){
        var param = {
            "success":function(data){
                if (data.data.length === 0) {
                    // 用户方案为空，则直接跳转index_none页面
                    //location.href = './index_none.html';
                    // showIndexNone();
                } else {
                    getDataList(data)
                }
            }
        };
        ajax.load("userplanlist",param);
    }
    function getDataList(data){
        if(data.length == 0){

        }else{
            planHtml = !planHtml?($("#panel-model").html()):planHtml;
            var myTemplate1 = Handlebars.compile(planHtml);
            var html1 = myTemplate1(data.data);
            $(".page-weeklyReportList").find("#home").append(html1);
            $.each(data.data,function(i,n){
                var param = {
                    query:{
                        planId : n.id
                    },
                    success:function(data){
                        if(!data){
                            return false;
                        }else{
                            view.render(data, n.id,i);
                        }
                    }
                };
                ajax.load('weeklyReportList',param);
            })
        }
    }
  function init(){
      getuserplanlist();
  }
  return {
    init: init
  }
});
