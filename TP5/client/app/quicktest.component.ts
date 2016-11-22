import { Component, OnInit } from '@angular/core';
import { Question } from './question';
import { QuestionService } from './question.service'

@Component({
	moduleId: module.id,
  	selector: 'my-quicktest',
	templateUrl: '/templates/quicktest'
})

export class QuickTestComponent implements OnInit {

	question: Question;

	questionText= "meme";
	reponse1 = "";
	reponse2 = "";
	reponse3 = "";
	reponseChoisi = "Glisser votre reponse ici"
	reponseBonne = "";

	ngOnInit(): void {
		this.questionService.get().then(question => {
			this.question = question; 
			this.questionText = question.question;
			this.reponse1 = question.reponses[0].text;
			this.reponse2 = question.reponses[1].text;
			this.reponse3 = question.reponses[2].text;
		});
	}

	constructor(private questionService: QuestionService) { }

	onDragStart(event, data: any) {
		switch(event.target.id){
			case "1":	event.dataTransfer.setData('data', this.reponse1); break;
			case "2":	event.dataTransfer.setData('data', this.reponse2); break;
			case "3":	event.dataTransfer.setData('data', this.reponse3); break;
			default: console.log("oops");
		}
	}
	onDrop(event, data: any) {
	  let dataTransfer = event.dataTransfer.getData('data');
	  this.reponseChoisi = event.dataTransfer.getData('data');

	  let isGood = this.checkAnswer();
	  
	  if (isGood) {console.log("GOOD SHIT");} else {console.log("TU SUCK");}


	  event.preventDefault();
	}
	allowDrop(event) {
	  event.preventDefault();
	}


	checkAnswer() {
		this.question.reponses.forEach((item, index) => {
		    if (item.ans) {
		    	this.reponseBonne = item.text;
		    }
		});

		if (this.reponseChoisi === this.reponseBonne) {
			return true;
		} else {
			return false;
		}
	}



}
