define(["tool/ajaxTool"], function (ajax) {




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
      var groupDiv = '<div class="form-group key-group-'+(index+1)+' new-keyword-group"><label class="form-group-title"><span class="must">*</span><span class="must-title">'+labelC+
          '</span></label><div class="group-input-warp key-word-warp"><div class="input-warp"><input type="text" maxlength="5" class="form-control">'+
          '<span class="operation-box clear"><span class="add-btn glyphicon glyphicon-plus-sign"></span><span class="with-next">+</span>'+
          '<span class="close-btn">+</span></span></div></div><button class="add-line-btn">添加关键词组</button></div>';
      $("#key-word-group").append(groupDiv);
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

    })
  }
  function warningAdd(){
    $("#warning,#exclude").on("click","a", function () {
      var input = $(this).parent();
      var index = input.index();
      if(index>1){
        return false;
      }
      var inputHtml = input[0].outerHTML;
      input.after(inputHtml);
      $(this).prev(".form-group-title").show();
      $(this).hide();
    })
  }
  function warningClose(){
    $("#warning,#exclude").on("click",".close-btn", function () {
      var parents = $(this).parents(".warning-list");
      var parentPrev = parents.prev();
      if(parents.find("a").css("display") == "none"){
        parents.remove();
      }else{
        if(parentPrev.length>0){
          parentPrev.find("a").show();
          parentPrev.find(".form-group-title").hide();
          parents.remove();
        }
      }
    })
  }
  function getWords(){
    $(".page-newYq").on("blur","input:not('#myComplay')",function(){
      //关键词
      var keyWords = getkeyWords(),
          warnWords = getwarnWords("warning"),
          exWords = getwarnWords("exclude");
      var newKeyWords = getNewKeyWords(keyWords);
      rightPlanShow(newKeyWords,warnWords);
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
  function rightPlanShow(newKeyWords,warnWords){
    if(newKeyWords.length == 0 && warnWords.length == 0){
      return false;
    }
    var contain = $("#words-show-plan").find(".content-preview-list");
    var keysContain = $("#keys-show-plan").find(".content-preview-list");
    contain.empty();
    keysContain.empty();
    var showHtml = '',keysHtml='';
    var count = 0,keysCount=0;
    for(var h=0;h<warnWords.length;h++){
      for(var k=0;k<newKeyWords.length;k++){
        if((newKeyWords[k]+warnWords[h]) !== ""){
          showHtml = '<div class="content-preview">'+newKeyWords[k]+"+"+warnWords[h]+'</div>';
          contain.append(showHtml);
          count += 1;
        }
      }
    }
    for(var z=0;z<newKeyWords.length;z++){
      keysHtml = '<div class="content-preview">'+newKeyWords[z]+'</div>';
      keysContain.append(keysHtml);
      keysCount += 1;
    }
    $("#words-show-plan").find(".yjcpp").text(count);
    $("#keys-show-plan").find(".yjcpp").text(keysCount);
  }
  //为了右侧显示组合词语，重新整合关键词组
  function getNewKeyWords(keyWords){
    var newKeyWords = [];
    for(var i=0;i<keyWords.length;i++){
      var words = "";
      for(var j=0;j<keyWords[i].length;j++){
        if(keyWords[i][j] !== ""){
          if((j+1) == keyWords[i].length){
            words += keyWords[i][j];
          }else{
            words += keyWords[i][j]+"+";
          }
        }
      }
      newKeyWords.push(words);
    }
    return newKeyWords;
  }
  //点击保存
  function saveData(){
    $(".page-newYq").on("click",".saveBtn",function(){
      var keyWords = getkeyWords(),
          warnWords = getwarnWords("warning"),
          exWords = getwarnWords("exclude"),
          title = $("#myComplay").val();
      var newKeys = removeNull(keyWords);
      if(title == "" || newKeys.length==0){
        $('#alertModal').modal('show');
      }else{
        var submitData = {
          "title":title,
          "userPlanWords":[],
          "userPlanExWords":[],
          "userPlanWarnWords":[]
        };
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
        var param = {
          data:JSON.stringify(submitData),
          type:"post",
          contentType: 'application/json',
          success:function(data){
            console.log(data)
          }
        };
        ajax.load('newYq',param);
      }
    });
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
  function _events(){
    //关键词新增方法
    keyWordAdd();
    //关键词新增组方法
    keyWordGroupAdd();
    //关闭单个关键词语
    keyWordClose();
    //预警词,排除词
    //点击增加
    warningAdd();
    //点击删除
    warningClose();
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
