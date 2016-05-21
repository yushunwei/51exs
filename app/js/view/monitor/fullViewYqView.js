define(["tool/ajaxTool"], function (ajax) {
  function keyWordAdd() {
    $("#messages").on("click", ".add-btn", function () {
      var parents = $(this).parents(".input-warp");
      if (parents.parent().find("input").length > 2) {
        return false;
      }
      var parentD = parents[0].outerHTML;
      parents.after(parentD);
      $(this).hide();
      $(this).next().next().hide();
      $(this).next().show();
    })
  }

  function keyWordGroupAdd() {
    $("#messages").on("click", ".add-line-btn", function () {
      var labelC = '';
      var index = $("#key-word-group").find(".form-group").length;
      if (index > 2) return;
      if (index == 1) {
        labelC = "词语二：";
      }
      if (index == 2) {
        labelC = "词语三：";
      }
      var groupDiv = '<div class="form-group key-group-' + (index + 1) + ' new-keyword-group"><label class="form-group-title"><span class="must">*</span><span class="must-title">' + labelC +
          '</span></label><div class="group-input-warp key-word-warp"><div class="input-warp"><input type="text" maxlength="5" class="form-control">' +
          '<span class="operation-box clear"><span class="add-btn box-show glyphicon glyphicon-plus-sign"></span><span class="with-next box-hide">+</span>' +
          '<span class="close-btn box-show">+</span></span></div></div><button class="add-line-btn">添加关键词组</button></div>';
      $("#key-word-group").append(groupDiv);
    })
  }

  function keyWordClose() {
    $("#messages").find("#key-word-group").on("click", ".close-btn", function () {
      var parents = $(this).parents(".form-group");
      if (parents.parent("#key-word-group").find(".form-group").length > 1) {
        if (parents.next().length > 0) {
          if (parents.next().hasClass("key-group-3")) {
            parents.next().removeClass("key-group-3").addClass("key-group-2");
            parents.next().find(".must-title").text("词语二：");
          } else if (parents.next().hasClass("key-group-2")) {
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
    })
  }

  function warningAdd() {
    $("#warning,#exclude").on("click", "a", function () {
      var input = $(this).parent();
      var index = input.index();
      if (index > 1) {
        return false;
      }
      var inputHtml = input[0].outerHTML;
      input.after(inputHtml);
      $(this).prev(".form-group-title").show();
      $(this).hide();
    })
  }

  function warningClose() {
    $("#warning,#exclude").on("click", ".close-btn", function () {
      var parents = $(this).parents(".warning-list");
      var parentPrev = parents.prev();
      if (parents.find("a").css("display") == "none") {
        parents.remove();
      } else {
        if (parentPrev.length > 0) {
          parentPrev.find("a").show();
          parentPrev.find(".form-group-title").hide();
          parents.remove();
        }
      }
    })
  }

  function getWords() {
    $("#messages").on("blur", "input:not('#myComplay')", function () {
      //关键词
      var keyWords = getkeyWords(),
          warnWords = getwarnWords("warning"),
          exWords = getwarnWords("exclude");
      var newKeyWords = getNewKeyWords(keyWords);
      rightPlanShow(newKeyWords, warnWords);
    })
  }

  //获取所有关键词组数据
  function getkeyWords() {
    var keyWords = [];
    var keyWordGroups = $("#key-word-group").find(".form-group").length;
    for (var i = 0; i < keyWordGroups; i++) {
      var singleGroupInputs = $("#key-word-group").find(".key-group-" + (i + 1)).find("input").length;
      var keyWordSingleGroup = [];
      for (var j = 0; j < singleGroupInputs; j++) {
        var inputValue = $("#key-word-group").find(".key-group-" + (i + 1)).find("input").eq(j).val();
        keyWordSingleGroup.push(inputValue);
      }
      keyWords.push(keyWordSingleGroup);
    }
    return keyWords;
  }

  //获取预警词组和排除词组
  function getwarnWords(id) {
    var warnWords = [];
    var singleGroupInputs = $("#" + id).find("input").length;
    for (var i = 0; i < singleGroupInputs; i++) {
      var inputValue = $("#" + id).find("input").eq(i).val();
      warnWords.push(inputValue);
    }
    return warnWords;
  }

  //右边板块显示方法
  function rightPlanShow(newKeyWords, warnWords) {
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
          showHtml = '<div class="content-preview">' + newKeyWords[k] + "+" + warnWords[h] + '</div>';
          contain.append(showHtml);
          count += 1;
        }
      }
    }
    for (var z = 0; z < newKeyWords.length; z++) {
      keysHtml = '<div class="content-preview">' + newKeyWords[z] + '</div>';
      keysContain.append(keysHtml);
      keysCount += 1;
    }
    $("#words-show-plan").find(".yjcpp").text(count);
    $("#keys-show-plan").find(".yjcpp").text(keysCount);
  }

  //为了右侧显示组合词语，重新整合关键词组
  function getNewKeyWords(keyWords) {
    var newKeyWords = [];
    for (var i = 0; i < keyWords.length; i++) {
      var words = "";
      for (var j = 0; j < keyWords[i].length; j++) {
        if (keyWords[i][j] !== "") {
          if ((j + 1) == keyWords[i].length) {
            words += keyWords[i][j];
          } else {
            words += keyWords[i][j] + "+";
          }
        }
      }
      newKeyWords.push(words);
    }
    return newKeyWords;
  }

  //点击保存
  function saveData() {
    $("#messages").find(".modal-footer").on("click", ".submit", function () {
      var keyWords = getkeyWords(),//[["1","2"],["3","4"]]
          warnWords = getwarnWords("warning"),
          exWords = getwarnWords("exclude"),
          title = $("#myComplay").val();
      var newKeys = removeNull(keyWords);
      var submitData = {
        "title": title,
        "userPlanWords": [],
        "userPlanExWords": [],
        "userPlanWarnWords": []
      };
      for (var i = 0; i < newKeys.length; i++) {
        for (var j = 0; j < newKeys[i].length; j++) {
          var s = {word: "", groupNumber: "", orderNumber: ""};
          s.word = newKeys[i][j];
          s.groupNumber = i + 1;
          s.orderNumber = j + 1;
          submitData.userPlanWords.push(s);
        }
      }
      for (var h = 0; h < warnWords.length; h++) {
        var w = {warnWord: ""};
        if (warnWords[h] !== "") {
          w.warnWord = warnWords[h];
          submitData.userPlanWarnWords.push(w);
        }
      }
      for (var k = 0; k < exWords.length; k++) {
        var e = {word: ""};
        if (exWords[k] !== "") {
          e.word = exWords[k];
          submitData.userPlanExWords.push(e);
        }
      }
      var param = {
        data: JSON.stringify(submitData),
        type: "post",
        contentType: 'application/json',
        success: function (data) {
          console.log(data)
        }
      };
      ajax.load('newYq', param);
    });
  }

  //关键字数据去空
  function removeNull(arr) {
    var newArr = arr;
    for (var i = 0; i < newArr.length; i++) {
      for (var j = 0; j < newArr[i].length; j++) {
        if (newArr[i][j] == "" || typeof newArr[i][j] === "undefined") {
          newArr[i].splice(j, 1);
          j = j - 1;
        }
      }
      if (newArr[i].length == 0) {
        newArr.splice(i, 1);
        i = i - 1;
      }
    }
    return newArr;
  }

  function getData(id) {
    var param = {
      query: {
        planId: id
      },
      success: function (data) {
        senderYQ(data);
      }
    };
    if(!$("#messages").hasClass("panlLoaded")){
      ajax.load('xgYQ', param);
    }
  }

  //初始化渲染数据
  function senderYQ(data) {
    console.log(data)
    if(!data.data) return false;
    $("#messages").addClass("panlLoaded");
    $("#messages").find("#myComplay").val(data.data.title);
    var userPlanWords = data.data.userPlanWords;
    var newArr = [{"groupV":[]},{"groupV":[]},{"groupV":[]}];
    for (var i = 0; i < (userPlanWords.length); i++) {
      if (userPlanWords[i].groupNumber < 4 && userPlanWords[i].orderNumber < 4) {
        if (userPlanWords[i].groupNumber == 1) {
          newArr[0].index = 1;
          newArr[0].groupN = "词语一：";
          newArr[0].groupV.push(userPlanWords[i]);
        }
        if (userPlanWords[i].groupNumber == 2) {
          newArr[1].index = 2;
          newArr[1].groupN = "词语二：";
          newArr[1].groupV.push(userPlanWords[i]);
        }
        if (userPlanWords[i].groupNumber == 3) {
          newArr[2].index = 3;
          newArr[2].groupN = "词语三：";
          newArr[2].groupV.push(userPlanWords[i]);
        }
      }
    }
    var myTemplate1 = Handlebars.compile($("#userPlanWords").html());
    var html1 = myTemplate1(newArr);
    $("#key-word-group").append(html1);
    //显示最后一输入框的按钮
    var groupTar = $("#key-word-group").find(".form-group");
    for(var h=0;h<groupTar.length;h++){
      groupTar.eq(h).find(".add-btn:last").show();
      groupTar.eq(h).find(".with-next:last").hide();
      groupTar.eq(h).find(".close-btn:last").show();
    }

    var newWarnWords = new Array();
    if (data.data.userPlanWarnWords.length == 0) {
      newWarnWords.push({warnword: ""});
    }
    for (var i = 0; i < data.data.userPlanWarnWords.length; i++) {
      if (data.data.userPlanWarnWords[i].orderNumber < 3) {
        newWarnWords[data.data.userPlanWarnWords[i].orderNumber] = {
          warnword: data.data.userPlanWarnWords[i].warnWord
        };
      }
    }
    var myTemplate2 = Handlebars.compile($("#userPlanWarnWords").html());
    var html2 = myTemplate2(newWarnWords);
    $("#warning").find(".form-group").append(html2);
    $("#warning").find(".warning-list:last").find(".form-group-title").hide();
    $("#warning").find(".warning-list:last").find(".add").show();

    var newExWords = new Array();
    if (data.data.userPlanExWords.length == 0) {
      newExWords.push({exword: ""});
    }
    for (var i = 0; i < data.data.userPlanExWords.length; i++) {
      if (data.data.userPlanExWords[i].orderNumber < 3) {
        newExWords[data.data.userPlanExWords[i].orderNumber] = {
          exword: data.data.userPlanExWords[i].word
        };
      }
    }
    var myTemplate3 = Handlebars.compile($("#userPlanExWords").html());
    var html3 = myTemplate3(newExWords);
    $("#exclude").find(".form-group").append(html3);
    $("#exclude").find(".warning-list:last").find(".form-group-title").hide();
    $("#exclude").find(".warning-list:last").find(".add").show();

    var keyWords = getkeyWords(),
        warnWords = getwarnWords("warning"),
        exWords = getwarnWords("exclude");
    var newKeyWords = getNewKeyWords(keyWords);
    rightPlanShow(newKeyWords, warnWords);
  }

  function _init(id) {
    //获取该舆情数据
    getData(id);
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

  return {
    init: _init
  }
});
