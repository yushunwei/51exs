define([], function () {
  /**
   * 渲染行业下拉框
   * @param data 下拉框数据
   * @param index 行业下拉索引
   * @private
   */
  function _renderHY(data,index) {
    var $selectBox = $('.page-open .open-hy');
    if(data) {
      var nextSelect = $selectBox.find("select").eq(index);
      nextSelect.empty().append("<option value='-1'>请选择</option>");

      $.each(data.data, function (i, v) {
        nextSelect.append("<option code='" + this.code + "'>" + this.name + "</option>");
      });

      $selectBox.find(".select-box").eq(index).show().find("select").show();
      $selectBox.find(".select-box").filter(":gt(" + (index - 0) + ")").find("select").empty().hide();
    }else{
      $selectBox.find(".select-box").filter(":gt(" + (index - 1) + ")").hide();
    }
  }

  /**
   * 渲染地域数据
   * @param data 下拉框数据
   * @param index 地域下拉索引
   * @private
   */
  function _renderQY(data,index) {
    var $selectBox = $('.page-open .open-qy');
    if(data) {
      var nextSelect = $selectBox.find("select").eq(index);
      nextSelect.empty().append("<option value='-1'>请选择</option>");

      $.each(data.data, function (i, v) {
        nextSelect.append("<option code='" + this.code + "'>" + this.name + "</option>");
      });

      $selectBox.find(".select-box").eq(index).show().find("select").show();
      $selectBox.find(".select-box").filter(":gt(" + (index - 0) + ")").find("select").empty().hide();
    }else{
      $selectBox.find(".select-box").filter(":gt(" + (index - 1) + ")").hide();
    }
  }
  return {
    renderHY: _renderHY,
    renderQY :_renderQY
  }
});
