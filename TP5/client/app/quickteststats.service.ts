import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { QuickTestStats } from './quickteststats';

@Injectable()
export class QuickTestStatsService {

	private qtStatsUrl = '/qtstats';


  	constructor(private http: Http) { }

  	private headers = new Headers({'Content-Type': 'application/json'});

	handleError(err : Error): void{
		// console.log(err);
	}

	get(): Promise<QuickTestStats> {
    	return this.http.get(this.qtStatsUrl)
               .toPromise()
               .then(response => response.json() as QuickTestStats)
               .catch(this.handleError);
  	}
  clear(): Promise<Boolean> {
      return this.http.delete(this.qtStatsUrl)
              .toPromise()
              .then()
              .catch(this.handleError);
  }

}