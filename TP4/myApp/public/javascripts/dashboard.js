
var examParameters;
$(document).ready(function() {
	
	updateStats();
	
	for(var i = 0; i < json.results.length;i++){
		$("#modalcontent").append("<p></p>");
		$("#modalcontent p:last-child").text("Theme : " + json.results[i].theme +" , note : " + json.results[i].note);
	}
	
	$("#id_button_exam").click(function() {
		sessionStorage.setItem("theme", $('select[name=domaine] option:selected').attr('value'));
		sessionStorage.setItem("nbquestions", $('select[name=nbquestions] option:selected').attr('value'));
		location.href = '/exam';
	});
	$("#id_button_reset").click(function() {
		localStorage.clear();
		updateStats();
	});

});

var getStatsStorageObject = function() {
	storage = localStorage.getItem("stats");
	if(storage == null){
		localStorage.setItem("stats",JSON.stringify({"results":[]}));
	}
	storage = localStorage.getItem("stats");
	json = JSON.parse(storage);
	return json;
};

var getQuickTestStatsObject = function() {
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