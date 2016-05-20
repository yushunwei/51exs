require.config({
    baseUrl: "js/",
    paths: {
        jquery: "lib/jquery-1.12.3.min",
        bootstrap: "lib/bootstrap.min"
    },
    skim: {
        "bootstrap": ["jquery"]
    }
});

require(['jquery'],function(){
    var controllerPath = $(".page").data("controller");
    var index = controllerPath.lastIndexOf("/") < 0 ? 0 :controllerPath.lastIndexOf("/");

    require(['controllers/' + controllerPath + 'Controller', "tool/Utils"], function (controller, utils) {
        //进入对应的控制器
        var other = document.location.href;
        var page = {
            "query": utils.getQuery(other),
            "name": controllerPath.substr(index)
        };

        var token = page.query.token;
        token && utils.setToken(token);
        controller.init(page);
    });
});