define(["tool/Utils"], function (util) {
  /**
   * 初始化
   */
  function _init() {
    var helpCenterUrl = "http://115.236.46.111/web1800/service/check800id.aspx?id=8010602&ud=",
        t = new Date(),
        ud = 'Type=2,UserId='+t+',UserName=,CompanyName=,Mobile=,Gpid=3365';
    // 在线咨询链接赋值
    $(".online-btn").attr("href",helpCenterUrl + util.base64Encode(ud));
  }

  return {
    init: _init
  }
});
