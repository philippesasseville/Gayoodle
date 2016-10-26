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
		updateNote($('#ans p').text() == goodAnswer, $("#note"));
		if(questionsrestante > 0){
			nextQuestionTheme(theme);
			questionsrestante--;
			$('#indicateurQuestion').text(nbquestion-questionsrestante+"/"+nbquestion);
		}else{
			result = {"theme":theme,"note":getQuestionRatio()};
			storage = localStorage.getItem("stats");
			if(storage == null){
				localStorage.setItem("stats",JSON.stringify({"results":[]}));
			}
			storage = localStorage.getItem("stats");
			json = JSON.parse(storage);
			json.results.push(result);
			localStorage.setItem("stats", JSON.stringify(json));
			console.log(localStorage.getItem("stats"));
			location.href="/dashboard"
		}
	})

});
