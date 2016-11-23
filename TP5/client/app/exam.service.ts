import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Exam } from './exam';

@Injectable()
export class ExamService {

	private examsUrl = '/exams';

  	constructor(private http: Http) { }

  	private headers = new Headers({'Content-Type': 'application/json'});

	handleError(err : Error): void{
		 console.log(err);
	}

	get(): Promise<Exam[]> {
    	return this.http.get(this.examsUrl)
               .toPromise()
               .then(response => response.json() as Exam[])
               .catch(this.handleError);
  	}

  clear(): Promise<Boolean> {
      return this.http.delete(this.examsUrl)
              .toPromise()
              .then()
              .catch(this.handleError);
  }
}