import { Component, OnInit } from '@angular/core';
import { Question } from './question';
import { QuestionService } from './question.service'
import { Router } from '@angular/router';
import { ActivatedRoute, Params }     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
	moduleId: module.id,
  	selector: 'my-exam', //
	templateUrl: '/templates/exam' //
})

export class ExamComponent implements OnInit { //

	constructor(private questionService: QuestionService, private router: Router, private route: ActivatedRoute) { }

	theme;

	question: Question;
	err = "";
	questionText= "Loading...";
	reponse1 = "Loading...";
	reponse2 = "Loading...";
	reponse3 = "Loading...";
	stats = "Stats: 0/0";
	percentage; //
	reponseBonne = "";
	reponseChoisi = "Glisser votre reponse ici";
	goodClassBool = false;
	badClassBool = false;
	canDrop = true;

	totalQuestion = 0;
	totalGood = 0;
	totalRepondu = 0;

	ngOnInit(): void {
		this.route.params
		.switchMap((params: Params) => this.theme = params['theme'])
    	.subscribe();

    	this.route.params
		.switchMap((params: Params) => this.totalQuestion = params['nb'])
    	.subscribe();

		this.init();
	}
	init() {
		this.questionText= "Loading...";
		this.err = "";
		this.reponse1 = "Loading...";
		this.reponse2 = "Loading...";
		this.reponse3 = "Loading...";
		this.reponseBonne = "";
		this.reponseChoisi = "Glisser votre reponse ici";
		this.goodClassBool = false;
		this.badClassBool = false;
		this.canDrop = true;

		this.questionService.get(this.theme).then(question => {
			this.question = question; 
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
			this.questionService.verifyExam(this.questionText, this.reponseChoisi)
				.then(res => this.setClasses(res)); //
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
		this.totalRepondu += 1;
		this.canDrop = false;
	}
	
	clickSuivant() {
		if (this.canDrop) {
			this.err = "Veuillez choisir une reponse.";
			return;
		}
		if(this.totalRepondu == this.totalQuestion){
			//compile results
			this.questionService.compile(this.theme, (this.totalGood/this.totalQuestion*100));
			this.router.navigate(['/result', this.theme, this.totalGood, this.totalQuestion]);
		}
		else
			this.init();
	}

	clickMenu() {
		//compile results
		this.questionService.compile(this.theme, 0);
		this.router.navigate(['/dashboard']);
	}

}
