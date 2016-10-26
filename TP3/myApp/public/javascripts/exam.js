var questionsrestante = 0;
//fontion executer lorsque le document est pret
$(document).ready(function() {

	theme = sessionStorage.getItem('theme');
	questionsrestante = sessionStorage.getItem('nbquestions');
	nextQuestionTheme(theme);
	questionsrestante--;

	$("#id_button_next").click(function() {
		console.log(questionsrestante);
		if(questionsrestante > 0){
			updateNote($('#ans p').text() == goodAnswer, $("#note"));
			nextQuestionTheme(theme);
			questionsrestante--;
		}else{
			location.href="/game"
		}
	})

});
