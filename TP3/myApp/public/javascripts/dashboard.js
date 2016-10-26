
var examParameters;
$(document).ready(function() {

	
	$("#id_button_exam").click(function() {
		sessionStorage.setItem("theme", $('select[name=domaine] option:selected').attr('value'));
		sessionStorage.setItem("nbquestions", $('select[name=nbquestions] option:selected').attr('value'));
		window.location.href = '/exam'
	})

});
