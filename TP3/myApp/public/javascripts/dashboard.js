
var examParameters;
$(document).ready(function() {
	
	json = JSON.parse(localStorage.getItem("stats"));
	
	console.log(json);
	
	$("#htmlpassed").text("Kappo?");

	$("#csspassed").text("Kappo?");

	$("#jspassed").text("Kappo?");

	$("#htmlfail").text("Kappo?");

	$("#cssfail").text("Kappo?");

	$("#jsfail").text("Kappo?");

	$("#notemoy").text("Kappo?");

	$("#qrpassed").text("Kappo?");

	$("#qrfailed").text("Kappo?");

	$("#qrmoy").text("Kappo?");
	
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
	});

});
