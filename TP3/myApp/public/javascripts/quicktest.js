//variables
var completedQuestions;
var goodAnswer;
var q = 0;
var qr = 0;
//fontion executer lorsque le document est pret
$(document).ready(function() {

	nextQuestion();

	$("#id_button_next").click(function() {
		updateNote($('#ans p').text() == goodAnswer);
		nextQuestion();
	})

});
//Fonction en charge d'actualiser la note
var updateNote = function(ans) {
	if(ans === true){
		qr++;
	}
	q++;
	var note = ((qr/q)*100);
	note = note.toFixed(0);
	$("#note").text("Note Courante : "+note+"%");
};
//fonction en charge de la reinitialisation de variable importante 
//et de la requete ajax pour charger la question
var nextQuestion = function(){
	var url = "./api/randomQuestion";
	$.getJSON(url, function(data) {
		$("#id_title").text(data.theme);
		$("#id_question").text(data.question);
		$("#col_ans1 p").text(data.reponses[0].text);
		$("#col_ans2 p").text(data.reponses[1].text);
		$("#col_ans3 p").text(data.reponses[2].text);
		if(data.reponses[0].ans == true){
			goodAnswer = data.reponses[0].text;
		}else if (data.reponses[1].ans == true){
			goodAnswer = data.reponses[1].text;
		}else{
			goodAnswer = data.reponses[2].text;
		}
	});
	var cols = document.querySelectorAll('#columns .column');
	[].forEach.call(cols, function(col) {
	  $(col).attr("draggable","true");
	  $(col).removeClass("chosen");
	});
	$('#ans p').text("Glisser votre reponse ici");

};
