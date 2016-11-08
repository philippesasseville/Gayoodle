//variables
var completedQuestions;
var goodAnswer;
var q = 0;
var qr = 0;

var getQuestionRatio = function() {
	return qr+"/"+q;
};
var getQuestionPourcentage = function() {
	var percent = (qr/q)*100;
	return parseFloat(Math.round(percent * 100) / 100).toFixed(2);
};

//Fonction en charge d'actualiser la note
var updateNote = function(ans, JqueryNode) {
	if(ans === true){
		qr++;
	}
	q++;
	var note = ((qr/q)*100);
	note = note.toFixed(0);
	JqueryNode.text("Note Courante : "+note+"%");
};

var nextQuestionMongo = function(){
	$.get( "./getQuestions", function( data ) {
		console.log(data);
		data = JSON.parse(data);
		updateUIforQuestion(data);
		setGoodAnswer(data)
	});
	
	var cols = document.querySelectorAll('#columns .column');
	[].forEach.call(cols, function(col) {
	  $(col).attr("draggable","true");
	  $(col).removeClass("good");
	  $(col).removeClass("bad");
	});
	$('#ans p').text("Glisser votre reponse ici");
	
};

var nextQuestion = function(){
	var url = "./api/randomQuestion";
	console.log("URL : "+ url);
	getJsonQuestion(url, function(data) {
		updateUIforQuestion(data);
		setGoodAnswer(data)
		console.log("DATA : "+ JSON.stringify(data));
	});


	var cols = document.querySelectorAll('#columns .column');
	[].forEach.call(cols, function(col) {
	  $(col).attr("draggable","true");
	  $(col).removeClass("good");
	  $(col).removeClass("bad");
	});
	$('#ans p').text("Glisser votre reponse ici");

};

var nextQuestionTheme = function(theme){
	var url = "./api/randomQuestionTheme/:"+theme;

	getJsonQuestion(url, function(data) {
		updateUIforQuestion(data);
		setGoodAnswer(data)
	});


	var cols = document.querySelectorAll('#columns .column');
	[].forEach.call(cols, function(col) {
	  $(col).attr("draggable","true");
	  $(col).removeClass("good");
	  $(col).removeClass("bad");
	});
	$('#ans p').text("Glisser votre reponse ici");

};

var getJsonQuestion = function(url, res) {
	$.getJSON(url, function(data) {
		res(data);
	});
};
var updateUIforQuestion = function(data) {
	$("#id_title").text(data.theme);
	$("#id_question").text(data.question);
	$("#col_ans1 p").text(data.reponses[0].text);
	$("#col_ans2 p").text(data.reponses[1].text);
	$("#col_ans3 p").text(data.reponses[2].text);
};
var setGoodAnswer = function(data) {
	if(data.reponses[0].ans == true){
			goodAnswer = data.reponses[0].text;
		}else if (data.reponses[1].ans == true){
			goodAnswer = data.reponses[1].text;
		}else{
			goodAnswer = data.reponses[2].text;
		}
		console.log(goodAnswer);
}

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
    if($(this).find("p").text() == goodAnswer){
		$(dragSrcEl).addClass("good");
	}
	else{
		$(dragSrcEl).addClass("bad");
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
