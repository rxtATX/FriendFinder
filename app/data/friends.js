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
  
  $("document").on("click", function(event) {
    if (event.target !== $("#friendModal")) {
      $("#friendModal").css("display", "none");
    }
  });
  
  $("span").on("click", function() {
    $("#friendModal").css("display", "none");
  });
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
  $.ajax({
    method: "POST",
    url: "/api",
    data: info
  });
  
  $.ajax({
    method: "GET",
    url: "/api",
    data: JSON
  }).done(function(data){
    calculateBestMatch(data);
  });
}

function calculateBestMatch(friendsList) {
  var thisUser = friendsList[friendsList.length - 1];
  var bestFriend = friendsList[3];
  displayBestMatch(bestFriend);
}


function displayBestMatch(friend) {
  $("#friendModal").css("display", "block");
  $("#modalName").html(friend.name);
  $("#modalName").append("\n<img id='modalPhoto'class='center-block img-responsive' src=" + friend.photo + "alt='New Friend's Photo'></img>");
}

