define([], function () {
    var linkUrl = 'api/home.json';
    var _param = {
        "data":{},
        "url" :linkUrl,
        "success" : function(){
        },
        "error":function(){

        },
        "dataType":"json",
        "timeout" : 3000
    };
    function setUrl(name,param){
        switch (name){
            //注册url
            case 'register' : linkUrl = HX_config.serv_path+'/system/register/getregisterurl/v=1.0.0' ;
                break;
            //开通行业
            case 'openHY' :   linkUrl = HX_config.serv_path+'/system/baseinfo/getindustrys/v=1.0.0' ;
                break;
            //开通企业
            case 'openQY' :   linkUrl = HX_config.serv_path+'/system/baseinfo/getareas/v=1.0.0' ;
                break;
            //开通申请
            case 'openapplication' :   linkUrl = HX_config.serv_path+'/system/user/openapplication/v=1.0.0' ;
                break;
            //user information
            case 'user' :   linkUrl = HX_config.serv_path+'/system/user/getuserinfo/v=1.0.0' ;
                break;
             //预警数量
            case 'warnNum' :   linkUrl = HX_config.serv_path+'/warn/warncenter/getlatestuserwarncount/v=1.0.0' ;
                break;
          //home页面感情chart数据
          case 'home_pie' :linkUrl = HX_config.serv_path+'/monitor/statmonitor/getallnewsentimentdislist/v=1.0.0';
            break;
          //home页面走势图数据
          case 'home_line' :linkUrl = HX_config.serv_path+'/monitor/statmonitor/getallnewsourceperformlist/v=1.0.0';
                break;
            //home页面柱状图数据
            case  'home_bar' :linkUrl = HX_config.serv_path+'/monitor/statmonitor/getkeymediasentimentlist/v=1.0.0';
                break;
            //全部舆情方案
            case 'userplanlist' : linkUrl = HX_config.serv_path+'/plan/userplan/getuserplanlist/v=1.0.0';
                break;
            //最新舆情方案
            case 'home_yqfa' : linkUrl = HX_config.serv_path+'/monitor/contentmonitor/getallnewmonitorinfolist/v=1.0.0';
                break;
            //全部方案
            case 'home_list' : linkUrl = HX_config.serv_path+'/monitor/contentmonitor/getnewmonitorinfolist/v=1.0.0';
                break;
            //相似文章
            case 'getlikeList' : linkUrl = HX_config.serv_path+'/monitor/contentmonitor/getrelatedmonitorinfolist/v=1.0.0';
                break;
            //全部舆情方案方案
            case 'getMonitorInfoList' : linkUrl = HX_config.serv_path+ '/monitor/contentmonitor/getmonitorinfolist/v=1.0.0';
                break;
             //全部舆情方案方案
            case 'addEmail' :            linkUrl = HX_config.serv_path+ '/warn/warnemail/getwarnemaillist/v=1.0.0';
                break;
            //创建新舆情请求
            case 'newYq':linkUrl = HX_config.serv_path+'/plan/userplan/adduserplan/v=1.0.0';
                break;
            //文章列表
            case 'detailList':linkUrl = HX_config.serv_path+'/monitor/contentmonitor/getrelatedmonitorinfolist/v=1.0.0';
                break;
            //文章详情
            case 'detail':linkUrl = HX_config.serv_path+'/monitor/contentmonitor/getmonitorinfodetails/v=1.0.0';
                break;
            //文章详情
            case 'delYJ':linkUrl = HX_config.serv_path+'/warn/warncenter/cancelsimilarwarn/v=1.0.0';
                break;
            //all search
            case 'getAllInfoList':linkUrl = HX_config.serv_path+'/monitor/contentmonitor/fullwebsearch/v=1.0.0';
                break;
            //check
            //fullView 舆情走势图
            case 'fullView_DataTrend':linkUrl = HX_config.serv_path+'/monitor/statmonitor/getsourceperformlist/v=1.0.0';
                break;
//fullView 情感走势图
            case 'fullView_FeelTrend':linkUrl = HX_config.serv_path+'/monitor/statmonitor/getdailysentimentperformlist/v=1.0.0';
                break;
//fullView 媒体情感
            case 'fullView_MediaFeel':linkUrl = HX_config.serv_path+'/monitor/statmonitor/getkeymediasentimentlist/v=1.0.0';
                break;
//fullView 媒体关注度
            case 'fullView_MediaDeg':linkUrl = HX_config.serv_path+'/monitor/statmonitor/getmediaattentionlist/v=1.0.0';
                break;
//地域分布bar
            case 'fullView_Area':linkUrl = HX_config.serv_path+'/monitor/statmonitor/getregiondistributelist/v=1.0.0';
                break;
//地域分布Map
            case 'fullView_AreaMap':linkUrl = HX_config.serv_path+'/monitor/statmonitor/getregiondistributelist/v=1.0.0';
                break;

            default : linkUrl ="";
                break;
        }
        var token = hx_save.getToken();
        var _query = "?token="+token;
        var path;
        if(param.query){
            for(var i in param.query){
                _query += ("&"+i+"="+param.query[i]);
            }
        }
      _param.url = linkUrl + _query;
    }
    function _load(obj,param){
        var name = typeof obj == "string" ? obj : obj.name;
        setUrl(name,param);
        if(arguments.length!=2 && typeof param !="object") return;
        var ajaxparam = $.extend({},_param,param);
        $.ajax(ajaxparam);
    }
    return {
        load: _load
    };
});
