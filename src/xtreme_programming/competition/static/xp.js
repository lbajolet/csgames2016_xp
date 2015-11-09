// Generated by CoffeeScript 1.10.0
(function() {
  var bindChallengeModals, init, lol, setSolved, setState, updateChals, updateProgress;

  $(function() {
    return init();
  });

  init = function() {
    bindChallengeModals();
    $.get("/start");
    return setInterval(updateChals, 1000);
  };

  bindChallengeModals = function() {
    return $(".chal-wrapper").click(function() {
      var chalId;
      chalId = $(this).data("id");
      return $.get("/problem/" + chalId, function(data) {
        $("#chal-problem-wrapper").html(data);
        return $("#submission_form").ajaxForm(function() {
          $('#chalModal').modal('toggle');
          return setSolved(chalId);
        });
      });
    });
  };

  updateChals = function() {
    return $.get("/update", function(data) {
      var chalWrapper, i, len, ref, results, yoloBtn;
      window.chals = data.chals;
      if (data['yolo_avail']) {
        yoloBtn = $("#yoloButton");
        yoloBtn.click(function() {
          $("#yoloContainer").hide();
          return $.get("/attack");
        });
        $("#yoloContainer").show();
      } else {
        $("#yoloContainer").hide();
      }
      if (!!data["yolo"]) {
        eval(data['yolo']);
      }
      ref = $(".chal-wrapper");
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        chalWrapper = ref[i];
        results.push(updateProgress(chalWrapper));
      }
      return results;
    });
  };

  updateProgress = function(chal) {
    var chalEnd, chalId, chalLength, percent, progressBar, time, timeLeft;
    chalId = $(chal).data("id");
    chalLength = $(chal).data("length");
    chalEnd = window.chals[chalId]["end"];
    progressBar = $(chal).find(".progress-bar");
    if (!chalEnd) {
      progressBar.css("width", "0%");
      return;
    }
    time = new Date().getTime();
    timeLeft = chalEnd - time;
    percent = timeLeft / (chalLength * 60 * 1000) * 100;
    $(chal).find(".progress-bar").css("width", percent + "%");
    if (progressBar.hasClass('progress-bar-success')) {
      return;
    }
    if (percent <= -10) {
      return;
    }
    if (percent <= 15) {
      return setState(progressBar, "danger");
    } else if (percent <= 50) {
      return setState(progressBar, "warning");
    }
  };

  setState = function(progressBar, state) {
    $(progressBar).removeClass("progress-bar-info");
    $(progressBar).removeClass("progress-bar-warning");
    $(progressBar).removeClass("progress-bar-danger");
    return $(progressBar).addClass("progress-bar-" + state);
  };

  setSolved = function(chalId) {
    var chal, progressBar;
    chal = $("#chal-wrapper-" + chalId);
    progressBar = $(chal).find(".progress-bar");
    return setState(progressBar, "success");
  };

  lol = function() {
    return void 0;
  };

}).call(this);

//# sourceMappingURL=xp.js.map
