define(["view/fullsearch/allSearchView","tool/ajaxTool","controllers/monitor/fullViewController"], function (view,ajax,con) {
    function init() {

        con.allSeach();
    }

    return {
        init: init
    }
});
