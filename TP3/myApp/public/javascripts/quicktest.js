
//fontion executer lorsque le document est pret
$(document).ready(function() {

	nextQuestion();

	$("#id_button_next").click(function() {
		updateNote($('#ans p').text() == goodAnswer, $("#note"));
		nextQuestion();
	})

});