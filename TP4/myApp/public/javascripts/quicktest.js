
//fontion executer lorsque le document est pret
$(document).ready(function() {

	nextQuestionMongo();

	$("#id_button_next").click(function() {
		
		var obj = {"answer_of_life" : 42};

		putQuickTestStats(obj);
		
		var quickTestStats = getFile();
			
		var isResultOk = $('#ans p').text() == goodAnswer;
		if (isResultOk) {
			quickTestStats.questionsReussites = quickTestStats.questionsReussites+1;
		}
		quickTestStats.questionsDone = quickTestStats.questionsDone+1;
		localStorage.setItem("quicktestStats", JSON.stringify(quickTestStats));
		
		updateNote(isResultOk, $("#note"));
		nextQuestionMongo();
	});

	$("#id_button_back").click(function() {
		location.href = "/dashboard"
	});

});

var getFile = function() {
		var quickTestStats;
		var quickTestStatsStr = localStorage.getItem("quicktestStats");
		if (quickTestStatsStr == null) {
			quickTestStats = {"questionsDone":0, "questionsReussites":0};
			localStorage.setItem("quicktestStats", JSON.stringify(quickTestStats));
		} else {
			quickTestStats = JSON.parse(quickTestStatsStr);
		}
		return quickTestStats;
};
