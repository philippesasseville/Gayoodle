import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }     from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
@Component({
	moduleId: module.id,
  	selector: 'my-result',
	  templateUrl: '/templates/results'
})

export class ResultComponent implements OnInit {

  theme;
  totalGood;
  totalQuestion;
  pourcentage;
  message;


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .switchMap((params: Params) => this.theme = params['theme'])
    .subscribe();

    this.route.params
    .switchMap((params: Params) => this.totalGood = params['totalGood'])
    .subscribe();

    this.route.params
    .switchMap((params: Params) => this.totalQuestion = params['totalQuestion'])
    .subscribe();

    this.pourcentage = (this.totalGood/this.totalQuestion*100).toFixed(2) ;

    if (this.pourcentage <= 25) { //(0% à 25%)
      this.message = "Retourne étudier";
    } else if (this.pourcentage > 25 && this.pourcentage <= 50) { //(25% à 50%)
      this.message = "T'es capable de faire mieux!";
    } else if (this.pourcentage > 50 && this.pourcentage <= 75) { //(50% à 75%) 
      this.message = "Presque!";
    } else { //(75% à 100%)
      this.message = "Ouhh lalaa";
    }

  }

  goToDashboard(): void {
    this.router.navigate(["/dashboard"]);
  }
	
}
