$("document").ready(function(){
	
  $("#submitBtn").on("click", function() {
    runSurveyHandler();
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

  // if (checkedValues.length < 10 ||
  //     name === undefined ||
  //     photo === undefined) {
  	
  //   $('#submitBtn').bind('click', function(e){
  //       e.preventDefault();
  //   });
  // } else if (checkedValues.length === 10 &&
  //   name !== undefined &&
  //   photo !== undefined) {
    
  //   $('#submitBtn').unbind('click')
  // }


  console.log(formInput);
}

