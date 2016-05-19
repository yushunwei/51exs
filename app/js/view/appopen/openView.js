define([], function () {
  function _renderHY(data,index) {
    var $selectBox = $('.page-open .open-hy');
    $selectBox.find("select").eq(index).empty();
    $selectBox.find("select").eq(index).append("<option class='hidden'></option>");
    $.each(data.data,function(i,v){
      $selectBox.find("select").eq(index).append("<option code='"+this.code+"'>"+this.name+"</option>");
    })
    $selectBox.find(".select-box").filter(":gt("+(index-0)+")").find("select").empty();
    $selectBox.find(".select-box").filter(":gt("+(index-1)+")").find("select").val("");
    $selectBox.find(".select-box").filter(":gt("+(index-1)+")").find("input").val("");
  }
  function _renderQY(data,index) {
    var $selectBox = $('.page-open .open-qy');
    $selectBox.find("select").eq(index).empty();
    $selectBox.find("select").eq(index).append("<option class='hidden'></option>");
    $.each(data.data,function(i,v){
      $selectBox.find("select").eq(index).append("<option code='"+this.code+"'>"+this.name+"</option>");
    })
    $selectBox.find(".select-box").filter(":gt("+(index-0)+")").find("select").empty();
    $selectBox.find(".select-box").filter(":gt("+(index-1)+")").find("select").val("");
    $selectBox.find(".select-box").filter(":gt("+(index-1)+")").find("input").val("");
  }
  return {
    renderHY: _renderHY,
    renderQY :_renderQY
  }
});
