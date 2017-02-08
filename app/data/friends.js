$("document").ready(function(){
	$("#submitBtn").removeClass("toggleModal");
  $(".modal").css("display", "none");
  $("#submitBtn").on("click", function() {
    if ($("#submitBtn").hasClass("toggleModal")) {
      displayBestMatch();
    } else {
      runSurveyHandler();
    }
	});
  window.onclick = function(event) {
    if (event.target == $("#friendModal")) {
      $("#friendModal").css("display", "none");
    }
  };
  var span = $("span");
  span.onclick = function() {
     $("#friendModal").css("display", "none");
  };
});

function runSurveyHandler() {
  var checkedValues = [];
  var name = $("#newUsersName").val();
  var photo = $("#imageInputFile").val();
  
  var formInput = {
    name: name,
    answersArray: checkedValues,
    photo: photo
  };

  for (var i = 1; i< 11; i++) {
    var val = $('input[name=optionsRadios' + i + ']:checked').val();
    if (val !== undefined) {
      parseInt(val);
      checkedValues.push(val);
    }
  }

  if (checkedValues.length === 10 &&
    name !== undefined &&
    photo !== undefined) {
    $("#submitBtn").addClass("toggleModal");
    $("#submitBtn").html("<h4>View Your Friend</h4>");
    postThisFriend(formInput);
  }
}

function postThisFriend(info) {
  $.post("/api", info).done(function(response) {
  // calculateBestMatch(response);
  });
}

// function calculateBestMatch() {
  //Do something
// }


function displayBestMatch(friends) {
  $("#friendModal").css("display", "block");
  //Do something else
}

