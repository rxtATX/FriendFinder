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
  }
  span.onclick = function() {
     $("#friendModal").css("display", "none");
  }
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
    postThisFriend(formInput);
  }
}

function postThisFriend(info) {
  $("#submitBtn").addClass("toggleModal");
  $("#submitBtn").html("<h4>View Your Friend</h4>")
  $.post("/api", info).done(function(response) {
    console.log("Your new friend has been created.");
    displayBestMatch(response);
  });
}

function displayBestMatch(friends) {
  
  var modal = $("#friendModal");
  var span = $(".span")[0];
  modal.css("display", "block");
  
}

