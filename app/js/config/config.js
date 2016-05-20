var HX_config = {
    "ADIMG" : [
        "img/banner_01.jpg",
        "img/banner_02.jpg",
        "img/banner_03.jpg"
    ],
  //ajax
    "registerURL" :"http://uuser.idinfo.cn/jsp/client/uuuser/uuuserRegistStep.jsp?redirectUrl=http://www.51exs.com/login",
    "loginURL":"https://oauth.idinfo.cn/login.jsp",
    "consult": "https://www.baidu.com",
    //切换页面key值
    "nextPageKEY" : "n",
    "ivcode":"",
    //服务器地址
    "serv_path":"http://115.238.48.66:1158"
};

var hx_save = (function(){
    localStorage.token = "3b679f7cf55011e5bb6600188b839ae8";

    function _getController (){
        var path = "";
        switch (arguments[0]){
            case 'help':
            case 'login' : path = 'login/' ;
                break;
          //全网搜索
          case 'allSeach' : path = 'fullsearch/' ;
                break;
            case 'open' : path = 'appopen/' ;
                break;
            case "infodetail":
            case 'fullView' : path = 'monitor/' ;
                break;
            default : path ="";
                break;

        }
        return path;
    }

    return {
        getToken : function(){
            return localStorage.token ||"";
        },
        setToken : function(){
            localStorage.token =  arguments[0];
        },
        getController :_getController
    }
})();

//char饼图颜色
var pieColor = {
    "positiveColor":[ '#3693B3', '#309BBF', '#29A3CC','#21ABD9', '#17B2E6', '#0CB9F2', '#05C1FF' ],
    "neutralColor":[ '#737980', '#7E858C', '#8A9199','#959DA6', '#A1AAB2', '#ACB6BF', '#B8C2CC' ],
    "negativeColor":[ '#B24747', '#BF4C4C', '#CC5252','#D95757', '#E55C5C', '#E56767', '#FF7F7F' ]
};