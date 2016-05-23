var controllerPath = $(".page").data("controller") || "";
var index = controllerPath.lastIndexOf("/") < 0 ? 0 : controllerPath.lastIndexOf("/");

require(['controllers/' + controllerPath + 'Controller', "tool/Utils","common/commonController"], function (controller, utils,common) {
    //进入对应的控制器
    var other = document.location.href;
    var page = {
        "query": utils.getQuery(other),
        "name": controllerPath.substr(index)
    };

    var token = page.query.token;
    token && utils.setToken(token);
    controller.init(page);
    //统一处理页面逻辑
    common.init(page);
});
