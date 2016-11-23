import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ExamStats } from './examstats';

@Injectable()
export class ExamStatsService {

	private examStatsUrl = '/examstats';

  	constructor(private http: Http) { }

  	private headers = new Headers({'Content-Type': 'application/json'});

	handleError(err : Error): void{
		// console.log(err);
	}

	get(): Promise<ExamStats> {
    	return this.http.get(this.examStatsUrl)
               .toPromise()
               .then(response => response.json() as ExamStats)
               .catch(this.handleError);
  	}

}