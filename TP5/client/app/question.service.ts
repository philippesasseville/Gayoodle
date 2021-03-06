import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question';

@Injectable()
export class QuestionService {

	private questionUrl = '/question';  // URL to web api
	private verifyUrl = '/verify';  // URL to web api
	private verifyExamUrl = '/verifyexam';  // URL to web api
	private compileExamUrl = '/examstats';

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
		// console.log(err);
	}

	get(theme: string): Promise<Question> {
		let url;
		if(!theme)
			url = this.questionUrl;
		else
			url = this.questionUrl+"/:"+ theme;

    	return this.http.get(url)
               .toPromise()
               .then(response => response.json() as Question)
               .catch(this.handleError);
  	}


  	verify(question: String, reponseChoisi: String): Promise<boolean> {
		return this.http
			.post(this.verifyUrl, JSON.stringify({question: question, reponseChoisi: reponseChoisi}), {headers: this.headers})
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	  verifyExam(question: String, reponseChoisi: String): Promise<boolean> {
		return this.http
			.post(this.verifyExamUrl, JSON.stringify({question: question, reponseChoisi: reponseChoisi}), {headers: this.headers})
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	compile(theme: String, pourcentage: Number): Promise<boolean>{
		return this.http
			.post(this.compileExamUrl, JSON.stringify({theme: theme,pourcentage: pourcentage}), {headers: this.headers})
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}


}