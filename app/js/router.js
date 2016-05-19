define([""], function () {
  /**
   * Init router, that handle page events
   */
  function init() {
    $(document).on('pageBeforeInit', function (e,page) {
      load(page);
    });
  }


  function load(page) {
    var controllerName = page.name,
        query = page.query;
    if (!controllerName) {
      return;
    }

    var controllerPath = hx_save.getController(controllerName);
    require(['controllers/'+ controllerPath + controllerName + 'Controller'], function (controller) {
      controller.init(page);
    });
  }
  return {
    init: init,
    load: load
  };
});
