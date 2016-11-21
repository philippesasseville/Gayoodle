
//fontion executer lorsque le document est pret
$(document).ready(function() {

	var statsStr = localStorage.getItem("stats");
	var stats = JSON.parse(statsStr);
	var arrayLength = stats.results.length;
	var lastResult = stats.results[arrayLength-1];

	var resultPourcentage = lastResult.pourcentage;
	var resultRatio = lastResult.note;
	var resultTheme = lastResult.theme;
	var message = ":)";


	if (resultPourcentage <= 25) { //(0% à 25%)
		message = "Retourne étudier";
	} else if (resultPourcentage > 25 & resultPourcentage <= 50) { //(25% à 50%)
		message = "T'es capable de faire mieux!";
	} else if (resultPourcentage > 50 & resultPourcentage <= 75) { //(50% à 75%) 
		message = "Presque!";
	} else { //(75% à 100%)
		message = "Ouhh lalaa";
	}

	$("#id_theme").text(resultTheme);
	$("#id_resultat").text(resultRatio);
	$("#id_pourcentage").text(resultPourcentage + "%");
	$("#id_message").text(message);

	$("#id_backToDashboard").click(function() {
		location.href = "/dashboard";
	})

});


var random = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}   