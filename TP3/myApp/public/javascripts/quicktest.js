$(document).ready(function() {

  	// console.log("HELLO");
  	// var i = 1;
  	// console.log("ASDFOIJ " + i);
  	var url = "./api/randomQuestion";
	$.getJSON(url, function(data) {
		$("#id_title").text("OKTAMER:");
		$("#id_question").text(data.question);
		$("#id_ans1").text(data.rep1.text);
		$("#id_ans2").text(data.rep2.text);
		$("#id_ans3").text(data.rep3.text);
	});

	$("#id_button_next").click(function() {
		//TODO: Array de question faite xD
		location.href='/quicktest';
	})

  // $(".buttonNext").click(function() {
  //   $("#question1").load('./api/q1'), function(data) {
  //     console.log(data);
  //   };
  // });
});