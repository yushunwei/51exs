define(['tool/ajaxTool','../../view/report/weeklyReportListView'], function (ajax,view) {
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
        console.log(data)
        if(data.length == 0){

        }else{
            view.events();
            $.each(data.data,function(i,n){
                var parentsD = $(".page-weeklyReportList").find(".panel-default").eq(i);
                var $titleTar = parentsD.find(".panel-heading").find("p")
                $titleTar.text(n.title);
                $(".page-weeklyReportList").find(".panel-default").eq(i).show();
                var param = {
                    query:{
                        planId : n.id
                    },
                    success:function(data){
                        if(!data){
                            return false;
                        }else{
                            view.render(data,parentsD,i);
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
