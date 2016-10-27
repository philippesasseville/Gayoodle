
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


var updateStats = function() {
	json = getStatsStorageObject();
	quickTestJson = getQuickTestStatsObject();

	var htmlpassed = 0;
	var csspassed = 0;
	var jspassed = 0;
	var htmlfail = 0;
	var cssfail = 0;
	var jsfail = 0;
	var notemoy = 0;
	var qrpassed = 0;
	var qrfailed = 0;
	var qrmoy = 0;
	
	var pourcentagetotal= 0;
	for(var i = 0; i < json.results.length; i++){
		pourcentagetotal += parseFloat(json.results[i].pourcentage);
		if(json.results[i].pourcentage >= 60){
			if(json.results[i].theme == "HTML"){
				htmlpassed++;
			}else if(json.results[i].theme == "CSS"){
				csspassed++;
			}else{
				jspassed++;
			}
		}else{
			if(json.results[i].theme == "HTML"){
				htmlfail++;
			}else if(json.results[i].theme == "CSS"){
				cssfail++;
			}else{
				jsfail++;
			}
		}
	}
	
	$("#htmlpassed").text(htmlpassed);

	$("#csspassed").text(csspassed);

	$("#jspassed").text(jspassed);

	$("#htmlfail").text(htmlfail);

	$("#cssfail").text(cssfail);

	$("#jsfail").text(jsfail);

	if(json.results.length == 0){
		$("#notemoy").text("0%");
	}else{
		$("#notemoy").text(parseFloat(Math.round((pourcentagetotal/json.results.length) * 100) / 100).toFixed(0) + "%");
	}

	$("#qrpassed").text(quickTestJson.questionsReussites);

	$("#qrfailed").text(quickTestJson.questionsDone - quickTestJson.questionsReussites);
	if(quickTestJson.questionsDone == 0){
		$("#qrmoy").text("0%");
	}else{
		$("#qrmoy").text(parseFloat(Math.round((quickTestJson.questionsReussites/quickTestJson.questionsDone) * 100)).toFixed(0) + "%");
	}
}
