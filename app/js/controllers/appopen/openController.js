define(["view/appopen/openView","tool/ajaxTool"], function (view,ajax) {
    function init() {
        loadHY();
        loadQY();
        bindEvents();
    }
    function loadHY(){
        var _code = arguments.length == 0 ? "-1" : arguments[0];
        var index = arguments.length == 0 ? 0 : arguments[1];
        var param = {
            "query":{
                "code":_code
            },
            "success":function(data){
                view.renderHY(data,index);
            }
        };
       ajax.load("openHY",param);
    }
    function loadQY(){
        var _code = arguments.length == 0 ? "-1" : arguments[0];
        var index = arguments.length == 0 ? 0 : arguments[1];
        var param = {
            "query":{
                "code":_code
            },
            "success":function(data){
                view.renderQY(data,index);
            }
        };
        ajax.load("openQY",param);
    }
    function bindEvents(){
        var code,index;
       $(".page-open").find(".open-hy select").on("change",function(){
            code = $(this).find("option:selected").attr("code");
           index = $(this).attr("index");
           index && loadHY(code,index);
       });
        $(".page-open").find(".open-qy select").on("change",function(){
            code = $(this).find("option:selected").attr("code");
            index = $(this).attr("index");
            index && loadQY(code,index);
        });
        //submit form
        $(".page-open").find("#submitbutton").on("click",function(){
           var code = $("#invitecode").val();
           var companyname = $("#companyname").val();
           var industrys = ($("#industrys1 select").val()+"-"+ $("#industrys2 select").val()+"-"+ $("#industrys3 select").val()).split("-");
           var areas = ($("#areas1 select").val()+"-"+ $("#areas2 select").val()+"-"+ $("#areas3 select").val()).split("-");
           var agreement = $(".agreement input[type=checkbox]").is(":checked");
            if(code &&companyname &&industrys.length==3&&areas.length==3 && agreement ){
                var _data = {
                    "inviteCode" : code,
                    "companyName" : companyname,
                    "industrys" : industrys,
                    "areas" : areas
                };
                var param = {
                    "data":JSON.stringify(_data),
                    "type":"post",
                    contentType: 'application/json',
                    "success":function(d){
                        console.log(d);
                    }
                };
                ajax.load("openapplication",param);
                return false;
            }
        });
    }
    return {
        init: init
    }
});
