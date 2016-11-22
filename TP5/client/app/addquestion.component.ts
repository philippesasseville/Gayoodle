import { Component  } from '@angular/core';
import { Question } from './question';

import { QuestionService } from './question.service'

@Component({
	moduleId: module.id,
  	selector: 'my-addquestion',
	templateUrl: '/templates/addquestion'
})

export class AddQuestionComponent {

	constructor(private questionService: QuestionService) { }

	theme = "HTML";
	question = "";
	reponse1 = "";
	reponse2 = "";
	reponse3 = "";
	reponse = "";
	err = ""
	ans = -1;

	post() {
		//call question service
		if(!this.question)
			this.err = "Veuillez entrer une question!";
		else if(!this.reponse1 || !this.reponse2 || !this.reponse3)
			this.err = "Veuillez entrer 3 reponses!";
		else if(!this.reponse)
			this.err = "Veuillez indiquer la bonne reponse!";
		else {
			if(this.reponse === "reponse1")
				this.ans = 0;
			else if(this.reponse === "reponse2") {
				this.ans = 1;
			}
			else if(this.reponse === "reponse3") {
				this.ans = 2;
			}

			var q = new Question(this.theme,this.question,this.reponse1,this.reponse2,this.reponse3, this.ans);

			console.log(JSON.stringify(q));

			this.questionService.create(q);

			this.err = "Question soumise!"
			this.theme = "HTML";
			this.question = "";
			this.reponse1 = "";
			this.reponse2 = "";
			this.reponse3 = "";
			this.reponse = "";
			this.ans = -1;
		}
	}
}
