import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question';

@Injectable()
export class QuestionService {

	private questionUrl = 'myApp/question';  // URL to web api

  	constructor(private http: Http) { }

  	private headers = new Headers({'Content-Type': 'application/json'});

	create(question: Question): Promise<Question> {
	  return this.http
	    .post(this.questionUrl, JSON.stringify(question), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json().data)
	    .catch(this.handleError);
	}

	handleError(): void{
		console.log("error in question service");
	}
}
