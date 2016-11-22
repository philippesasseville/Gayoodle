import { Component  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
  	selector: 'mon-dashboard',
	templateUrl: '/templates/dashboard'
})

export class DashboardComponent {

	constructor(private router: Router) { }
	
	testo(): void {
    	this.router.navigate(['/quicktest']);
  	}
}
