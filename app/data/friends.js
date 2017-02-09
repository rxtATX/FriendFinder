//Wait for the document to load.
$("document").ready(function() {
    //Prevents modal from displaying on load.
    $("#submitBtn").removeClass("toggleModal");
    $(".modal").css("display", "none");
    //These functions will fire when the Find New Friend button is clicked.
    $("#submitBtn").on("click", function() {
        if ($("#submitBtn").hasClass("toggleModal")) {
            displayBestMatch();
        } else {
            runSurveyHandler();
        }
    });
    //Closes the modal.
    $("span").on("click", function() {
        $("#friendModal").css("display", "none");
    });
});
//Fires when the Find New Friend button is pressed to check if the required fields are filled.
function checkValidity(input) {
    //Checks the name field is full and prompts a warning.
    if (input.name === "") {
        $("#nameValid").text("You must fill out your name.")
        console.log("name is blank");
    } else if (input.name !== "") {
        $("#nameValid").text("");
        console.log("name is filled");
    }
    //Checks the photo field is full and prompts a warning.
    if (input.photo === "") {
        $("#imageValid").addClass("has-error");
        $("#imageValid").text("You must upload an image of yourself.")
        console.log("photo is blank");
    } else if (input.photo !== "") {
        $("#imageValid").removeClass("has-error");
        $("#imageValid").text("Upload an image of yourself for your new best friend to see.")
        console.log("photo is filled");
    }
    //Checks if the survey is filled correctly and prompts a warning.
    if (input.answersArray.length < 10) {
        $("#surveyValid").text("Please fill out the survey completely.")
        console.log("survey has blank answers");
    } else if (input.answersArray.length === 10) {
        $("#surveyValid").text("");
        console.log("survey is filled out correctly");
    }
}
//Fires when the Find New Friend button is pressed.
function runSurveyHandler() {
    var checkedValues = [];
    var name = $("#newUsersName").val();
    var photo = $("#imageInputFile").val();
    //This object will be added to the existing JSON when POSTed.
    var formInput = {
        name: name,
        answersArray: checkedValues,
        photo: photo
    };
    //Passes the indexes of user's survey selection into an array.
    for (var i = 1; i < 11; i++) {
        var val = $('input[name=optionsRadios' + i + ']:checked').val();
        if (val !== undefined) {
            parseInt(val);
            checkedValues.push(val);
        }
    }
    //Submit button will only fire if entre form is filled.
    if (checkedValues.length === 10 &&
        name !== "" &&
        photo !== "") {
        $("#submitBtn").addClass("toggleModal");
        $("#submitBtn").html("<h4>View Your Friend</h4>");
        //Passes the formInput variable's filled values to next function.
        postThisFriend(formInput);
    }
    checkValidity(formInput);
}
//Adds new user's values to JSON database.
function postThisFriend(info) {
    $.ajax({
        method: "POST",
        url: "/api",
        data: info
    });
    //Returns entire JSON object including previously existing friends and new user.
    $.ajax({
        method: "GET",
        url: "/api",
        data: JSON
    }).done(function(data) {
        //Passes the JSON object to next function.
        calculateBestMatch(data);
    });
}
//Algorithm which determines the user's best match.
function calculateBestMatch(friendsList) {
    //Grabs the most recently added user from the JSON object.
    var thisUser = friendsList.pop();
    //Grabs the JSON object minus the most recently added user.
    friendsList.length = friendsList.length - 1;
    var compatabilityIndex = [];
    //Loops through the JSON object to separate each potential match.
    for (var i = 0; i < friendsList.length; i++) {
        var potentialFriend = friendsList[i];
        var compatability = 0;
        //Loops through each potential match's personality test answers.
        for (var j = 0; j < thisUser.answersArray.length; j++) {
            //The most compatability points are added for identical answers.
            if (thisUser.answersArray[j] === potentialFriend.answersArray[j]) {
                compatability = compatability + 2;
            }
            //This condition is when the user "agrees" more with a statement than the other potential friends had.
            if (thisUser.answersArray[j] > potentialFriend.answersArray[j]) {
                //If it isn't too big of a difference, they're still slightly compatable.
                if (thisUser.answersArray[j] - potentialFriend.answersArray[j] <= 2) {
                    compatability = compatability + 1;
                } else if (thisUser.answersArray[j] - potentialFriend.answersArray[j] >= 3) {
                    //Their opinions are too different so their compatability does not increase.
                }
            }
            //This condition is when the user "disagrees" with a statement more than the other potential friend.
            if (potentialFriend.answersArray[j] < thisUser.answersArray[j]) {
                //If it isn't too big of a difference, they're still slightly compatable.
                if (potentialFriend.answersArray[j] - thisUser.answersArray[j] <= 2) {
                    compatability = compatability + 1;
                } else if (potentialFriend.answersArray[j] - thisUser.answersArray[j] >= 3) {
                    //Their opinions are too different so their compatability does not increase.
                }
            }
        }
        //Adds the compatability as an array.
        compatabilityIndex.push(compatability);
    }
    //Finds the highest value from the compatabilityIndex array.
    var bestFriendValue = Math.max.apply(Math, compatabilityIndex);
    //Finds the index of that high value.
    var bestFriendIndex = $.inArray(bestFriendValue, compatabilityIndex);
    //Selects the potential friend which had that high value.
    var bestFriend = friendsList[bestFriendIndex];
    //Passes that best friend variable to the next function.
    displayBestMatch(bestFriend);
}
//Shows the best friend in the modal with their name and photo.
function displayBestMatch(friend) {
    $("#friendModal").css("display", "block");
    $("#modalName").html(friend.name);
    $("#modalName").append("\n<img id='modalPhoto'class='center-block img-responsive' src=" + friend.photo + "alt='New Friend's Photo'></img>");
}