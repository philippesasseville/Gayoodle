var questionsrestante = 0;
//fontion executer lorsque le document est pret
$(document).ready(function() {

	theme = sessionStorage.getItem('theme');
	questionsrestante = sessionStorage.getItem('nbquestions');
	nbquestion = questionsrestante;
	nextQuestionTheme(theme);
	questionsrestante--;
	$('#indicateurQuestion').text(nbquestion-questionsrestante+"/"+nbquestion);

	$("#id_button_next").click(function() {
		if(questionsrestante > 0){
			updateNote($('#ans p').text() == goodAnswer, $("#note"));
			nextQuestionTheme(theme);
			questionsrestante--;
			$('#indicateurQuestion').text(nbquestion-questionsrestante+"/"+nbquestion);
		}else{
			location.href="/game"
		}
	})

});
