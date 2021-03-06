//variables
var completedQuestions;
var goodAnswer;
var q = 0;
var qr = 0;
var currentQuestionId = "";
var exam = false;

var pourcentage = 0;

var getQuestionRatio = function() {
	return qr+"/"+q;
};
var getQuestionPourcentage = function() {
	var percent = (qr/q)*100;
	return parseFloat(Math.round(percent * 100) / 100).toFixed(2);
};

//Fonction en charge d'actualiser la note
var updateNote = function(ans) {
	if(ans === true){
		qr++;
	}
	q++;
	var note = ((qr/q)*100);
	note = note.toFixed(0);
};

var nextQuestionMongo = function(){
	resetQuestionUI();
	//async get question request
	$.get( "./question", function( data ) {
		data = JSON.parse(data);
		updateUIforQuestion(data);
		currentQuestionId = data._id;
	});
};

var nextQuestionThemeMongo = function(theme){
	//async get question avec theme request
	resetQuestionUI();
	$.get( "./question/:" + theme, function( data ) {
		data = JSON.parse(data);
		updateUIforQuestion(data);
		currentQuestionId = data._id;
	});
};

var putQuickTestStats = function(data){
	console.log(JSON.stringify(data));
	$.ajax({
	    url: '/qtstats',
	    type: 'PUT',
	    contentType: "application/json",
	    data: JSON.stringify(data),
	    success: function(result) {
	        // Do something with the result
	        //console.log("success");
	    	}
	});
};

var resetQuestionUI = function(){
	var cols = document.querySelectorAll('#columns .column');
	[].forEach.call(cols, function(col) {
	  $(col).attr("draggable","true");
	  $(col).removeClass("good");
	  $(col).removeClass("bad");
	});
	$('#ans p').text("Glisser votre reponse ici");
};


var updateStats = function() {
	$.get('/examstats', function(data) {
		console.log("EXAM STATS" + JSON.stringify(data));
		$("#htmlpassed").text(data.HTMLwin);
		$("#csspassed").text(data.CSSwin);
		$("#jspassed").text(data.JSwin);
		$("#htmlfail").text(data.HTMLloss);
		$("#cssfail").text(data.CSSloss);
		$("#jsfail").text(data.JSloss);	
		$("#notemoy").text(data.examMoyenne + "%");
	});
	$.get('/qtstats', function(data) {
		console.log("QUICK STATS" + JSON.stringify(data));
		$("#qrpassed").text(data.questionsRapidesWin);
		$("#qrfailed").text(data.questionsRapidesLoss);
		$("#qrmoy").text(data.questionsRapidesMoy + "%");
	});

	
	json = getStatsStorageObject();
	// quickTestJson = getQuickTestStatsObject();

	// var htmlpassed = 0;
	// var csspassed = 0;
	// var jspassed = 0;
	// var htmlfail = 0;
	// var cssfail = 0;
	// var jsfail = 0;
	// var notemoy = 0;
	// var qrpassed = 0;
	// var qrfailed = 0;
	// var qrmoy = 0;
	
	// var pourcentagetotal= 0;
	// for(var i = 0; i < json.results.length; i++){
	// 	pourcentagetotal += parseFloat(json.results[i].pourcentage);
	// 	if(json.results[i].pourcentage >= 60){
	// 		if(json.results[i].theme == "HTML"){
	// 			htmlpassed++;
	// 		}else if(json.results[i].theme == "CSS"){
	// 			csspassed++;
	// 		}else{
	// 			jspassed++;
	// 		}
	// 	}else{
	// 		if(json.results[i].theme == "HTML"){
	// 			htmlfail++;
	// 		}else if(json.results[i].theme == "CSS"){
	// 			cssfail++;
	// 		}else{
	// 			jsfail++;
	// 		}
	// 	}
	// }
	
	// $("#htmlpassed").text(htmlpassed);
	// $("#csspassed").text(csspassed);
	// $("#jspassed").text(jspassed);
	// $("#htmlfail").text(htmlfail);
	// $("#cssfail").text(cssfail);
	// $("#jsfail").text(jsfail);

	// if(json.results.length == 0){
	// 	$("#notemoy").text("0%");
	// }else{
	// 	$("#notemoy").text(parseFloat(Math.round((pourcentagetotal/json.results.length) * 100) / 100).toFixed(0) + "%");
	// }

	// $("#qrpassed").text(quickTestJson.questionsReussites);

	// $("#qrfailed").text(quickTestJson.questionsDone - quickTestJson.questionsReussites);
	// if(quickTestJson.questionsDone == 0){
	// 	$("#qrmoy").text("0%");
	// }else{
	// 	$("#qrmoy").text(parseFloat(Math.round((quickTestJson.questionsReussites/quickTestJson.questionsDone) * 100)).toFixed(0) + "%");
	// }
}

var updateUIforQuestion = function(data) {
	$("#id_title").text(data.theme);
	$("#id_question").text(data.question);
	$("#col_ans1 p").text(data.reponses[0].text);
	$("#col_ans2 p").text(data.reponses[1].text);
	$("#col_ans3 p").text(data.reponses[2].text);
};

// drag and drop logic

var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  //this.style.opacity = '0.4';

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', $(this).find("p").text());
}

function handleDrop(e) {
  // this/e.target is current target element.
  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // on verifie que la drop zone est bonne
  if ($(this).attr('id') === "ans") {
	// on popule le tag p
    $(this).find("p").text(e.dataTransfer.getData('text/html'));
    // classe pour lindicateur visuel
    console.log("SEND");
    console.log(exam);
    if(exam){
		verifyAnswerWithServerExam(e.dataTransfer.getData('text/html'));
    }else{
		verifyAnswerWithServer(e.dataTransfer.getData('text/html'));
    }
	// on desactive le drag car le user ne peux pas changer de reponse.
    [].forEach.call(cols, function(col) {
	  $(col).attr("draggable","false");
	});
  }

  return false;
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDragEnd(e) {
	// this/e.target is the source node.

	[].forEach.call(cols, function (col) {
	  col.classList.remove('over');
	 });
}

// on lie les fonction au evenement du modele drag and drop html5
var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false)
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);
});

var verifyAnswerWithServer = function(data){
	console.log("sending : " + data + " to server.");
	$.ajax({
	    url: '/verify',
	    type: 'PUT',
	    dataType: "json",
  		contentType: "application/json",
	    data: JSON.stringify({ans : data, question_id : currentQuestionId}),
	    success: function(result) {
	        // Do something with the result
	        console.log(result);
	        if(result){
				$(dragSrcEl).addClass("good");
				updateNote(true);
				console.log("good "+q+" "+qr+" "+pourcentage);
				var percent = (qr/q)*100;
				$("#note").text(parseFloat(Math.round(percent * 100) / 100).toFixed(0) + "%");
	        }else{
	        	$(dragSrcEl).addClass("bad");
	        	updateNote(false);
	        	console.log("bad "+q+" "+qr+" "+pourcentage);
	        	var percent = (qr/q)*100;
	        	$("#note").text(parseFloat(Math.round(percent * 100) / 100).toFixed(0) + "%");
	        }
	    }
	});
};

var verifyAnswerWithServerExam = function(data){
	console.log("sending : " + data + " to server.");
	$.ajax({
	    url: '/verifyexam',
	    type: 'PUT',
	    dataType: "json",
  		contentType: "application/json",
	    data: JSON.stringify({ans : data, question_id : currentQuestionId}),
	    success: function(result) {
	        // Do something with the result
	        console.log(result);
	        if(result){
				$(dragSrcEl).addClass("good");
				updateNote(true);
				var percent = (qr/q)*100;
				$("#note").text(parseFloat(Math.round(percent * 100) / 100).toFixed(0) + "%");
	        }else{
	        	$(dragSrcEl).addClass("bad");
	        	updateNote(false);
	        	var percent = (qr/q)*100;
				$("#note").text(parseFloat(Math.round(percent * 100) / 100).toFixed(0) + "%");
	        }
	    }
	});
};