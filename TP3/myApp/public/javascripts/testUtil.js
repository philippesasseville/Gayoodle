//variables
var completedQuestions;
var goodAnswer;
var q = 0;
var qr = 0;

//Fonction en charge d'actualiser la note
var updateNote = function(ans, JqueryNode) {
	if(ans === true){
		qr++;
	}
	q++;
	var note = ((qr/q)*100);
	note = note.toFixed(0);
	JqueryNode.text("Note Courante : "+note+"%");
};

var nextQuestion = function(){
	var url = "./api/randomQuestion";

	getJsonQuestion(url, function(data) {
		updateUIforQuestion(data);
		setGoodAnswer(data)
	});


	var cols = document.querySelectorAll('#columns .column');
	[].forEach.call(cols, function(col) {
	  $(col).attr("draggable","true");
	  $(col).removeClass("chosen");
	});
	$('#ans p').text("Glisser votre reponse ici");

};

var getJsonQuestion = function(url, res) {
	$.getJSON(url, function(data) {
		res(data);
	});
};
var updateUIforQuestion = function(data) {
	$("#id_title").text(data.theme);
	$("#id_question").text(data.question);
	$("#col_ans1 p").text(data.reponses[0].text);
	$("#col_ans2 p").text(data.reponses[1].text);
	$("#col_ans3 p").text(data.reponses[2].text);
};
var setGoodAnswer = function(data) {
	if(data.reponses[0].ans == true){
			goodAnswer = data.reponses[0].text;
		}else if (data.reponses[1].ans == true){
			goodAnswer = data.reponses[1].text;
		}else{
			goodAnswer = data.reponses[2].text;
		}
}
