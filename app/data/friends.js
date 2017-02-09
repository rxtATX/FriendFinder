$("document").ready(function(){
  $("#submitBtn").removeClass("toggleModal");
  $(".modal").css("display", "none");
  
  $("#submitBtn").on("click", function() {
    if ($("#submitBtn").hasClass("toggleModal")) {
      // displayBestMatch();
    } else {
      runSurveyHandler();
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
  var thisUser = friendsList.pop();
  friendsList.length = friendsList.length - 1;
  var compatabilityIndex = [];

  for (var i = 0; i < friendsList.length; i++) {
    var potentialFriend = friendsList[i];  
    var compatability = 0;
    for (var j = 0; j < thisUser.answersArray.length; j++) {

      if (thisUser.answersArray[j] === potentialFriend.answersArray[j]) {
        compatability = compatability + 2;
      }
      if (thisUser.answersArray[j] > potentialFriend.answersArray[j]) {
        if (thisUser.answersArray[j] - potentialFriend.answersArray[j] <= 2) {
         compatability = compatability + 1;
        } else if (thisUser.answersArray[j] - potentialFriend.answersArray[j] >=3) {
          //compatability does not increase.
        }
      }
      if (potentialFriend.answersArray[j] < thisUser.answersArray[j]) {
        if (potentialFriend.answersArray[j] - thisUser.answersArray[j] <= 2) {
          compatability = compatability + 1;
        } else if (potentialFriend.answersArray[j] - thisUser.answersArray[j] >=3) {
          //compatability does not increase
        }
      }
    }
    compatabilityIndex.push(compatability);
  }
  var bestFriendValue = Math.max.apply(Math, compatabilityIndex);
  var bestFriendIndex = $.inArray(bestFriendValue, compatabilityIndex);
  var bestFriend = friendsList[bestFriendIndex];
  displayBestMatch(bestFriend);
}


function displayBestMatch(friend) {
  $("#friendModal").css("display", "block");
  $("#modalName").html(friend.name);
  $("#modalName").append("\n<img id='modalPhoto'class='center-block img-responsive' src=" + friend.photo + "alt='New Friend's Photo'></img>");
}

