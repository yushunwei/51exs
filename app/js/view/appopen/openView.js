define([], function () {
  function _renderHY(data,index) {
    var $selectBox = $('.page-open .open-hy');
    if(data) {
      $selectBox.find("select").eq(index).empty();
      $selectBox.find("select").eq(index).append("<option value='-1'>请选择</option>");

      $.each(data.data, function (i, v) {
        $selectBox.find("select").eq(index).append("<option code='" + this.code + "'>" + this.name + "</option>");
      });
      $selectBox.find(".select-box").eq(index).show();
      $selectBox.find(".select-box").filter(":gt(" + (index - 0) + ")").hide();
      $selectBox.find(".select-box").filter(":gt(" + (index - 0) + ")").find("select").empty();
      $selectBox.find(".select-box").filter(":gt(" + (index - 1) + ")").find("select").val("-1");
      $selectBox.find(".select-box").filter(":gt(" + (index - 1) + ")").find("input").val("-1");
    }else{
      $selectBox.find(".select-box").eq(index - 1).show();
      $selectBox.find(".select-box").filter(":gt(" + (index - 1) + ")").hide();
    }
  }
  function _renderQY(data,index) {
    var $selectBox = $('.page-open .open-qy');
    if(data) {
      $selectBox.find("select").eq(index).empty();
      $selectBox.find("select").eq(index).append("<option value='-1'>请选择</option>");
      $.each(data.data,function(i,v){
        $selectBox.find("select").eq(index).append("<option code='"+this.code+"'>"+this.name+"</option>");
      });
      $selectBox.find(".select-box").eq(index).show();
      $selectBox.find(".select-box").filter(":gt("+(index-0)+")").hide();
      $selectBox.find(".select-box").filter(":gt("+(index-0)+")").find("select").empty();
      $selectBox.find(".select-box").filter(":gt("+(index-1)+")").find("select").val("-1");
      $selectBox.find(".select-box").filter(":gt("+(index-1)+")").find("input").val("-1");
    }else{
      $selectBox.find(".select-box").eq(index - 1).show();
      $selectBox.find(".select-box").filter(":gt(" + (index - 1) + ")").hide();
    }
  }
  return {
    renderHY: _renderHY,
    renderQY :_renderQY
  }
});
