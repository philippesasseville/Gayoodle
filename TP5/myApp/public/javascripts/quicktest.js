
//fontion executer lorsque le document est pret
$(document).ready(function() {

	exam = false;

	nextQuestionMongo();


	//$("#note").text(parseFloat(Math.round(percent * 100) / 100).toFixed(0) + "%");

	$("#id_button_next").click(function() {
		
		var quickTestStats = getFile();

		//var obj = {"isResultOk" : isResultOk};

		//putQuickTestStats(obj);
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
