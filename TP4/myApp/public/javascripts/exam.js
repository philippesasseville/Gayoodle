var questionsrestante = 0;
//fontion executer lorsque le document est pret
$(document).ready(function() {

	exam = true;

	theme = sessionStorage.getItem('theme');
	questionsrestante = sessionStorage.getItem('nbquestions');
	nbquestion = questionsrestante;
	nextQuestionThemeMongo(theme);
	questionsrestante--;
	$('#indicateurQuestion').text(nbquestion-questionsrestante+"/"+nbquestion);

	$("#id_button_next").click(function() {
		if(questionsrestante > 0){
			nextQuestionThemeMongo(theme);
			questionsrestante--;
			$('#indicateurQuestion').text(nbquestion-questionsrestante+"/"+nbquestion);
		} else {
			saveFinalResults(getQuizResultObject());
			location.href="/results";
		}
	})

	$("#id_button_abandon").click(function() {
		saveFinalResults(getQuizFAILResultObject());
		location.href = "/results"
	});

});



var saveFinalResults = function(result) {

	console.log(result);

	$.ajax({
		url: '/examstats',
		type: 'PUT',
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(result),
		success: function(res) {
			// Do something with the result
			console.log(res);
		}
	});

	stats = getStatsStorageObject();
	
	stats.results.push(result);
	saveStatsToStorage(stats);
};

var getQuizResultObject = function() {
	return {"theme":theme,"note":getQuestionRatio(), "pourcentage":getQuestionPourcentage()};
};

var getQuizFAILResultObject = function() {
	var ratio = "0/" + nbquestion;
	return {"theme":theme,"note":ratio, "pourcentage": 0};
};

var getStatsStorageObject = function() {
	storage = localStorage.getItem("stats");
	if(storage == null){
		localStorage.setItem("stats",JSON.stringify({"results":[]}));
	}
	storage = localStorage.getItem("stats");
	json = JSON.parse(storage);
	return json;
};

var saveStatsToStorage = function(stats) {
	localStorage.setItem("stats", JSON.stringify(json));
	// console.log(localStorage.getItem("stats"));
};


