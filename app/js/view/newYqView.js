define(["tool/ajaxTool","tool/Utils"], function (ajax,utils) {
  function keyWordAdd(){
    $(".page-newYq").on("click",".add-btn",function(){
      var parents = $(this).parents(".input-warp");
      if(parents.parent().find("input").length > 2){
        return false;
      }
      var parentD = parents[0].outerHTML;
      parents.after(parentD);
      $(this).hide();
      $(this).next().next().hide();
      $(this).next().show();
    })
  }
  function keyWordGroupAdd(){
    $(".page-newYq").on("click",".add-line-btn",function(){
      var labelC = '';
      var index = $("#key-word-group").find(".form-group").length;
      if(index > 2) return;
      if(index == 1){labelC = "词语二：";}
      if(index == 2){labelC = "词语三：";}
      var groupDiv = '<div class="form-group key-group-'+(index+1)+' new-keyword-group"><label class="form-group-title"><span class="must"></span><span class="must-title">'+labelC+
          '</span></label><div class="group-input-warp key-word-warp"><div class="input-warp"><input type="text" maxlength="30" class="form-control">'+
          '<span class="operation-box clear"><span class="add-btn glyphicon glyphicon-plus-sign"></span><span class="with-next">+</span>'+
          '<span class="close-btn">+</span></span></div></div><button class="add-line-btn">添加关键词组</button></div>';
      $("#key-word-group").append(groupDiv);
      clickBtnShow();
    })
  }
  function keyWordClose(){
    $(".page-newYq").find("#key-word-group").on("click",".close-btn",function(){
      var parents = $(this).parents(".form-group");
      if(parents.parent("#key-word-group").find(".form-group").length>1){
        if(parents.next().length>0){
          if(parents.next().hasClass("key-group-3")){
            parents.next().removeClass("key-group-3").addClass("key-group-2");
            parents.next().find(".must-title").text("词语二：");
          }else if(parents.next().hasClass("key-group-2")){
            parents.next().removeClass("key-group-2").addClass("key-group-1");
            parents.next().find(".must-title").text("词语一：");
            parents.next().next().removeClass("key-group-3").addClass("key-group-2");
            parents.next().next().find(".must-title").text("词语二：");
          }
        }
        parents.remove();
      }
        var keyWords = getkeyWords(),
            warnWords = getwarnWords("warning"),
            exWords = getwarnWords("exclude");
        var newKeyWords = getNewKeyWords(keyWords);
        rightPlanShow(newKeyWords, warnWords);
      clickBtnShow();
    })
  }
  function warningAdd(){
        $("a.warning").on("click", function () {
            var input = $(this).prev();
            var index = input.index();
            if(index>1){
                return false;
            }
            var inputHtml = input[0].outerHTML;
            $(this).prev().find(".form-group-title").show();
            input.after(inputHtml);
            clickWarningExShow($(this));
        })
    }
    function exAdd(){
        $("a.exclude").on("click", function () {
            var input = $(this).prev();
            var index = input.index();
            if(index>1){
                return false;
            }
            var inputHtml = input[0].outerHTML;
            $(this).prev().find(".form-group-title").show();
            input.after(inputHtml);
            clickWarningExShow($(this));
        })
    }
  function warningClose(){
    $("#warning").on("click",".close-btn", function () {
      var parents = $(this).parents(".warning-list");
      if(parents.parent().find(".warning-list").length !== 1){
        parents.prev().not(parents.parent().find(".warning-list").eq(0)).find(".form-group-title").hide();
        parents.remove();
      }
      if($("#warning .warning-list").length==1){
          $("#warning .warning-list").eq(0).find(".form-group-title").hide();
      }
      clickWarningExShow($("a.warning"));
        $("#warning .warning-list").eq(0).find("input").trigger("blur");
    });
  }
  function exClose(){
    $("#exclude").on("click",".close-btn", function () {
      var parents = $(this).parents(".warning-list");

      if(parents.parent().find(".warning-list").length !== 1){
        parents.prev().not(parents.parent().find(".warning-list").eq(0)).find(".form-group-title").hide();
        parents.remove();
      }
        if($("#exclude .warning-list").length==1){
            $("#exclude .warning-list").eq(0).find(".form-group-title").hide();
        }
      clickWarningExShow($("a.exclude"));
    });
  }
  function getWords(){
    $(".page-newYq").on("blur","input:not('#myComplay')",function(){
        var keyWords = getkeyWords(),
            warnWords = getwarnWords("warning"),
            exWords = getwarnWords("exclude");
        var newKeyWords = getNewKeyWords(keyWords);
        rightPlanShow(newKeyWords, warnWords);
    })
      $(".page-newYq").on("focus","input",function(){
         $(this).select();
      })
  }
  //获取所有关键词组数据
  function getkeyWords(){
    var keyWords = [];
    var keyWordGroups = $("#key-word-group").find(".form-group").length;
    for(var i=0;i<keyWordGroups;i++){
      var singleGroupInputs = $("#key-word-group").find(".key-group-"+(i+1)).find("input").length;
      var keyWordSingleGroup = [];
      for(var j=0;j<singleGroupInputs;j++){
        var inputValue = $("#key-word-group").find(".key-group-"+(i+1)).find("input").eq(j).val();
          inputValue = inputValue.toString().replace(/ /g,"");
        keyWordSingleGroup.push(inputValue);
      }
      keyWords.push(keyWordSingleGroup);
    }
    return keyWords;
  }
  //获取预警词组和排除词组
  function getwarnWords(id){
    var warnWords = [];
    var singleGroupInputs = $("#"+id).find("input").length;
    for(var i=0;i<singleGroupInputs;i++){
      var inputValue = $("#"+id).find("input").eq(i).val();
      warnWords.push(inputValue);
    }
    return warnWords;
  }
  //右边板块显示方法
    function rightPlanShow(_newKeyWords, _warnWords) {
        var newKeyWords = utils.trims(_newKeyWords);
        var warnWords =utils.trims(_warnWords);
        if (newKeyWords.length == 0 && warnWords.length == 0) {
            return false;
        }
        var contain = $("#words-show-plan").find(".content-preview-list");
        var keysContain = $("#keys-show-plan").find(".content-preview-list");
        contain.empty();
        keysContain.empty();
        var showHtml = '', keysHtml = '';
        var count = 0, keysCount = 0;
        for (var h = 0; h < warnWords.length; h++) {
            for (var k = 0; k < newKeyWords.length; k++) {
                if ((newKeyWords[k] + warnWords[h]) !== "") {
                    showHtml = '<div class="content-preview" title="' + newKeyWords[k] + "+" + warnWords[h] + '">' + newKeyWords[k] + "+" + warnWords[h] + '</div>';
                    contain.append(showHtml);
                    count += 1;
                }
            }
        }
        for (var z = 0; z < newKeyWords.length; z++) {
            keysHtml = '<div class="content-preview" title="' + newKeyWords[z] + '">' + newKeyWords[z] + '</div>';
            keysContain.append(keysHtml);
            keysCount += 1;
        }
        $("#words-show-plan").find(".yjcpp").text(count);
        $("#keys-show-plan").find(".yjcpp").text(keysCount);
    }
  //为了右侧显示组合词语，重新整合关键词组
  function getNewKeyWords(keyWords){
      var result=[];
      var ele,
          arr;
      $.each(keyWords,function(i,v){
          arr = utils.trims(v);
          ele = arr.join("+");
          result.push(ele);
      });
    return result;
  }
  //点击保存
  function saveData(){
      var layerindex;
    $(".page-newYq").on("click",".saveBtn",function(){
      var submitData = dataReform();
      if($("#myComplay").val() == "" || submitData.userPlanWords.length==0){
        $('#alertModal').modal('show');
      }else{
        var param = {
          data:JSON.stringify(submitData),
          type:"post",
          contentType: 'application/json',
          success:function(data){
           if(data.status==200){
               var id = data.data;
               layer.close(layerindex);
               window.open("monitor/full_view.html?id="+id);
           }else{
               layer.alert(data.subMsg);
           }
          },
          error :function(data){
              layer.alert(data.subMsg);
          }
        };
        ajax.load('newYq',param);
          layerindex =layer.load(1, {
              shade: [0.1,'#fff'] //0.1透明度的白色背景
          });
      }
    });
  }
    //组合提交数据
    function dataReform(){
        var title = $("#myComplay").val();
        var submitData = {
            "title":title,
            "userPlanWords":[],
            "userPlanExWords":[],
            "userPlanWarnWords":[]
        };
        var keyWords = getkeyWords(),
            warnWords = getwarnWords("warning"),
            exWords = getwarnWords("exclude");
        var newKeys = removeNull(keyWords);
        for(var i=0;i<newKeys.length;i++){
            for(var j=0;j<newKeys[i].length;j++){
                var s = {word:"",groupNumber:"",orderNumber:""};
                s.word = newKeys[i][j];
                s.groupNumber = i+1;
                s.orderNumber = j+1;
                submitData.userPlanWords.push(s);
            }
        }
        for(var h=0;h<warnWords.length;h++){
            var w = {warnWord:""};
            if(warnWords[h] !== ""){
                w.warnWord = warnWords[h];
                submitData.userPlanWarnWords.push(w);
            }
        }
        for(var k=0;k<exWords.length;k++){
            var e = {word:""};
            if(exWords[k] !== ""){
                e.word = exWords[k];
                submitData.userPlanExWords.push(e);
            }
        }
        return submitData;
    }
  //关键字数据去空
  function removeNull(arr){
    var newArr = arr;
    for(var i=0;i<newArr.length;i++){
      for(var j=0;j<newArr[i].length;j++){
        if(newArr[i][j] == "" || typeof newArr[i][j] === "undefined"){
          newArr[i].splice(j,1);
          j=j-1;
        }
      }
      if(newArr[i].length == 0){
        newArr.splice(i,1);
        i=i-1;
      }
    }
    return newArr;
  }
  //控制keyword按钮显示
  function clickBtnShow(){
    $(".add-line-btn").hide();
    var addLinBtnLen = $(".add-line-btn").length;
    if(addLinBtnLen<3){
      $(".add-line-btn").eq(addLinBtnLen-1).show();
    }
  }
  //控制warning 和 ex 按钮显示
  function clickWarningExShow(dom){
    var btn = dom;
    dom.parent().find(".group-input-warp").length === 3?btn.hide():btn.show();
    var orBtn = dom.parent().find(".form-group-title");
      $(".add-line-btn").eq(orBtn-1).show();
  }
  function _events(){
    //关键词新增方法
    keyWordAdd();
    //关键词新增组方法
    keyWordGroupAdd();
    //关闭单个关键词语
    keyWordClose();
    //点击预警增加
    warningAdd();
      //点击排除词增加
     exAdd();
    //点击warning删除
    warningClose();
    //点击ex删除
    exClose();
    //获取关键词，预警词和排除词
    getWords();
    //保存
    saveData();
  }
  function _renderUserplanlist(data) {
    var myTemplate = Handlebars.compile($("#userlistScript").html());
    $('.nav-main .listbox').html(myTemplate(data.data));
    var length = data.data.length+2;
    $('.nav-main .listbox li').css("width",100/length+"%");
  }
  return {
    renderUserplanlist :_renderUserplanlist,
    events:_events
  }
});
