var completedQuestions;

$(document).ready(function() {
  var url = "./api/randomQuestion";
  var currentQuestion;
     
	// resetDB();
	initQuestionHistory();
  	

	var strCompletedQuestions = JSON.stringify(completedQuestions);
	var query = "q="+strCompletedQuestions;
	//TODO: ADD COMPLETED TO QUERY FOR SERVER

	$.getJSON(url, /*,{"q": strCompletedQuestions},*/ function(data) {
		currentQuestion = data.id;
		$("#id_title").text(data.theme);
		$("#id_question").text(data.question);
		$("#id_ans1").text(data.rep1.text);
		$("#id_ans2").text(data.rep2.text);
		$("#id_ans3").text(data.rep3.text);
    $("#col_ans1 p").text(data.rep1.text);
    $("#col_ans2 p").text(data.rep2.text);
    $("#col_ans3 p").text(data.rep3.text);
	});

	$("#id_button_next").click(function() {
		if (!arrayContains(currentQuestion)) {
			completedQuestions.push(currentQuestion);
			localStorage.setItem("completedQuestions", JSON.stringify(completedQuestions));
		}
		location.href='/quicktest';
	})

});

var initQuestionHistory = function() {
	completedQuestions = JSON.parse(localStorage.getItem("completedQuestions"));
  	if (completedQuestions == null) {
  		completedQuestions = [];
  	}
  	//console.log(completedQuestions);
};

var resetDB = function() {
  	localStorage.setItem("completedQuestions", "[]");
};

var arrayContains = function(data) {
	var found = false;
	for(var i = 0; i < completedQuestions.length; i++) {
	    if (completedQuestions[i] == data) {
	        found = true;
	        break;
	    }
	}
	return found;
};