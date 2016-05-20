define(["../../view/appopen/openView","../../tool/ajaxTool","../../tool/Utils"], function (view,ajax,utils) {
    function init() {
        setHeader();
    }
    function setHeader(){
        var param = {
            "success":function(d){
                $("div.header .header-user").find('span').html(d.data.nickName || d.data.mobile)
            }
        };
        ajax.load("user",param);
    }
    return {
        init: init
    }
});
