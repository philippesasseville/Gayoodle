var completedQuestions;
var goodAnswer;
var q = 0;
var qr = 0;

$(document).ready(function() {

	nextQuestion();

	$("#id_button_next").click(function() {
		console.log($('#ans p').text());
		updateNote(checkAnswer($('#ans p').text()));
		nextQuestion();
	})

});
//borken document ready lel
var updateNote = function(ans) {
	if(ans === true){
		qr++;
	}
	q++;
	var note = ((qr/q)*100);
	note = note.toFixed(0);
	$("#note").text("Note Courante : "+note+"%");
};

var nextQuestion = function(){
	var url = "./api/randomQuestion";
	$.getJSON(url, function(data) {
		$("#id_title").text(data.theme);
		$("#id_question").text(data.question);
		$("#col_ans1 p").text(data.rep1.text);
		$("#col_ans2 p").text(data.rep2.text);
		$("#col_ans3 p").text(data.rep3.text);
		if(data.rep1.ans == true){
			goodAnswer = data.rep1.text;
		}else if (data.rep2.ans == true){
			goodAnswer = data.rep2.text;
		}else{
			goodAnswer = data.rep3.text;
		}
	});
	var cols = document.querySelectorAll('#columns .column');
	[].forEach.call(cols, function(col) {
	  $(col).attr("draggable","true");
	  $(col).removeClass("chosen");
	});
	$('#ans p').text("Glisser votre reponse ici");

};

var checkAnswer = function(str){
	console.log("check ans");
	console.log(goodAnswer);
	console.log(str);
	return str == goodAnswer;
};
