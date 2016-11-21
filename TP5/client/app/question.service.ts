import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question';

@Injectable()
export class QuestionService {

	private questionUrl = 'myApp/question';  // URL to web api

  	constructor(private http: Http) { }

  	private headers = new Headers({'Content-Type': 'application/json'});

	create(theme: string,question: string, answer1: string, answer2: string, answer3: string, slot1: boolean, slot2: boolean, slot3: boolean): Promise<Question> {
	  return this.http
	    .post(this.questionUrl, JSON.stringify(
	    	{ 	
	    		theme: theme,
	    		question: question,
	    		reponses:[{text: answer1, ans: slot1},
	    				  {text: answer2, ans: slot2},
	    				  {text: answer3, ans: slot3}]
	    	}
	    ), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json().data)
	    .catch(this.handleError);
	}

	handleError(): void{
		console.log("error in question service");
	}
}
