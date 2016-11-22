import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question';

@Injectable()
export class QuestionService {

	private questionUrl = '/question';  // URL to web api

  	constructor(private http: Http) { }

  	private headers = new Headers({'Content-Type': 'application/json'});

	create(question: Question): Promise<Question> {
	  return this.http
	    .post(this.questionUrl, JSON.stringify(question), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json().data as Question)
	    .catch(this.handleError);
	}

	handleError(err : Error): void{
		console.log(err);
	}

	get(): Promise<Question> {
    return this.http.get(this.questionUrl)
               .toPromise()
               .then(response => response.json() as Question)
               .catch(this.handleError);
  }

}
