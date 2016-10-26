
//fontion executer lorsque le document est pret
$(document).ready(function() {

	var stats = JSON.parse(localStorage.getItem(stats));
	console.log(stats);
	var pourcentage = random(0,100);
	var message = ":)";


	if (pourcentage <= 25) { //(0% à 25%)
		message = "Retourne étudier";
	} else if (pourcentage > 25 & pourcentage <= 50) { //(25% à 50%)
		message = "T'es capable de faire mieux!";
	} else if (pourcentage > 50 & pourcentage <= 75) { //(50% à 75%) 
		message = "Presque!";
	} else { //(75% à 100%)
		message = "Ouhh lalaa";
	}

	$("#id_theme").text("CSS");
	$("#id_resultat").text("8/10");
	$("#id_pourcentage").text(pourcentage + "%");
	$("#id_message").text(message);

	$("#id_backToDashboard").click(function() {
		location.href = "/dashboard";
	})

});


var random = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}   