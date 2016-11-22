import { Component  } from '@angular/core';
import { Question } from './question';
import { QuestionService } from './question.service'

@Component({
	moduleId: module.id,
  	selector: 'my-quicktest',
	templateUrl: '/templates/quicktest'
})

export class QuickTestComponent {

	constructor(private questionService: QuestionService) { }

	// get() {
	// 	this.questionService.getRandomQuestion();

	// }
}
