
var examParameters;
var theme;
$(document).ready(function() {
	
	updateStats();
	
	for(var i = 0; i < json.results.length;i++){
		$("#modalcontent").append("<p></p>");
		$("#modalcontent p:last-child").text("Theme : " + json.results[i].theme +" , note : " + json.results[i].note);
	}
	
	theme = $('select[name=domaine] option:selected').attr('value');

	$("#id_button_exam").click(function() {
		sessionStorage.setItem("theme", theme);
		sessionStorage.setItem("nbquestions", $('select[name=nbquestions] option:selected').attr('value'));
		location.href = '/exam';
	});
	$("#id_button_reset").click(function() {
		localStorage.clear();
		updateStats();
	});

	$("#drop").change(function () {
        var end = this.value;
        var firstDropVal = $('#pick').val();
    });

	updateNbQuestionDropdown();
	$('#id_dropdown_domain').change(function() {
		theme = $('select[name=domaine] option:selected').attr('value');
		updateNbQuestionDropdown();

	});

});

var updateNbQuestionDropdown = function() {
	$('#id_dropdown').empty();
	
	$.get('/getNbQuestions/:' + theme, function(data) {
		var nb = data.substring(1);
	    if (nb >= 10) {
	    	$('#id_dropdown').append(
				$('<option></option>').val("3").html("3 Questions")
			);
	    	$('#id_dropdown').append(
				$('<option></option>').val("5").html("5 Questions")
			);
	    	$('#id_dropdown').append(
				$('<option></option>').val("10").html("10 Questions")
			);
	    } else if (nb >=5) {
	    	$('#id_dropdown').append(
				$('<option></option>').val("3").html("3 Questions")
			);
			$('#id_dropdown').append(
				$('<option></option>').val("5").html("5 Questions")
			);	
	    } else if (nb >=3) {
	    	$('#id_dropdown').append(
				$('<option></option>').val("3").html("3 Questions")
			);	    	
	    } else {
			$('#id_dropdown').append(
				$('<option></option>').val("1").html("1 Question")
			);	
	    }
	});
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