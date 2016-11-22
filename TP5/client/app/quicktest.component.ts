import { Component, OnInit } from '@angular/core';
import { Question } from './question';
import { QuestionService } from './question.service'
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
  	selector: 'my-quicktest',
	templateUrl: '/templates/quicktest'
})

export class QuickTestComponent implements OnInit {

	constructor(private questionService: QuestionService, private router: Router) { }

	question: Question;
	err = "";
	questionText= "Loading...";
	theme = "Loading...";
	reponse1 = "Loading...";
	reponse2 = "Loading...";
	reponse3 = "Loading...";
	stats = "Stats: 0/0";
	reponseBonne = "";
	reponseChoisi = "Glisser votre reponse ici";
	goodClassBool = false;
	badClassBool = false;
	canDrop = true;

	totalAnswered = 0;
	totalGood = 0;

	ngOnInit(): void {
		this.init();
	}
	init() {
		this.questionText= "Loading...";
		this.theme = "Loading...";
		this.err = "";
		this.reponse1 = "Loading...";
		this.reponse2 = "Loading...";
		this.reponse3 = "Loading...";
		this.reponseBonne = "";
		this.reponseChoisi = "Glisser votre reponse ici";
		this.goodClassBool = false;
		this.badClassBool = false;
		this.canDrop = true;
		//load stats
		this.updateStats();
		
		this.questionService.get().then(question => {
			this.question = question; 
			this.theme = question.theme;
			this.questionText = question.question;
			this.reponse1 = question.reponses[0].text;
			this.reponse2 = question.reponses[1].text;
			this.reponse3 = question.reponses[2].text;
		});
	}

	onDragStart(event, data: any) {
		switch(event.target.id){
			case "1":	event.dataTransfer.setData('data', this.reponse1); break;
			case "2":	event.dataTransfer.setData('data', this.reponse2); break;
			case "3":	event.dataTransfer.setData('data', this.reponse3); break;
			default: console.log("oops");
		}
	}

	onDrop(event, data: any) {
		if (this.canDrop) {
			this.reponseChoisi = event.dataTransfer.getData('data');
			this.questionService.verify(this.questionText, this.reponseChoisi)
				.then(res => this.setClasses(res));
		}

		event.preventDefault();	
	}

	allowDrop(event) {
	  event.preventDefault();
	}

	setClasses(result) {
		if(result){
			this.goodClassBool = true;
			this.totalGood += 1;
		} else {
			this.badClassBool = true;
		}
		this.totalAnswered += 1;
		this.canDrop = false;
		this.updateStats();
	}

	updateStats() {
		if (this.totalAnswered != 0) {
			let percentage = this.totalGood/this.totalAnswered*100;
			this.stats = "Stats: " + this.totalGood + "/" + this.totalAnswered 
				+ " (" + percentage.toFixed(2) + "%)";
		}
	}
	
	clickSuivant() {
		if (this.canDrop) {
			this.err = "Veuillez choisir une reponse.";
			return;
		}
		this.init();
	}

	clickMenu() {
		this.router.navigate(['/dashboard']);
	}

}
