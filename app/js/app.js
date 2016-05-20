var pageName = $(".page").data("page");

var controllerPath = hx_save.getController(pageName);
require(['controllers/' + controllerPath + pageName + 'Controller', "tool/Utils"], function (controller, utils) {
//进入对应的控制器
    var other = document.location.href;
    var page = {
        "query": utils.getQuery(other),
        "name": pageName
    };

    var token = page.query.token;
    token && utils.setToken(token);
    controller.init(page);
});

