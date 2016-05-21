var controllerPath = $(".page").data("controller") || "";
var index = controllerPath.lastIndexOf("/") < 0 ? 0 : controllerPath.lastIndexOf("/");

require(['controllers/' + controllerPath + 'Controller', "tool/Utils","tool/ajaxTool"], function (controller, utils,ajax) {
    //进入对应的控制器
    var other = document.location.href;
    var page = {
        "query": utils.getQuery(other),
        "name": controllerPath.substr(index)
    };

    var token = page.query.token;
    token && utils.setToken(token);
    controller.init(page);
    //统一加载用户头部信息
    if( $("body div.header").length >0){
        var param = {
            "success":function(d){
                $("div.header .header-user").find('span').html(d.data.mobile)
            }
        };
        ajax.load("user",param);
    }
});
