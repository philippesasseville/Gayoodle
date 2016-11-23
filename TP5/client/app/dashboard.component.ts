import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';



@Component({
	moduleId: module.id,
  	selector: 'mon-dashboard',
	templateUrl: '/templates/dashboard'
})

export class DashboardComponent {

  theme="HTML";
  nb="3";

	constructor(private router: Router) { }
	
  ngOnInit(): void {
  }

	goToQuickTest(): void {
    	this.router.navigate(['/quicktest']);
  }

  goToExam(): void {
    	this.router.navigate(['/exam', this.theme, this.nb]);
  }
}
