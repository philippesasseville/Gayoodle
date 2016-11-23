import { NgModule  }      from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule  }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StatsComponent } from './stats.component';
import { RulesComponent } from './rules.component';
import { DashboardComponent } from './dashboard.component';
import { AddQuestionComponent }      from './addquestion.component';
import { QuestionService }      from './question.service';
import { QuickTestComponent }      from './quicktest.component';
import { ExamComponent }      from './exam.component';
import { ResultComponent }      from './result.component';
import { ExamStatsService } from './examstats.service';
import { QuickTestStatsService } from './quickteststats.service';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, AppRoutingModule ],
  declarations: 
  	[ 
  		AppComponent, 
  		RulesComponent, 
  		DashboardComponent, 
  		AddQuestionComponent,
  		QuickTestComponent,
      ExamComponent,
      ResultComponent,
      StatsComponent
	],
  providers: 
  	[
  		{provide: LocationStrategy, useClass: HashLocationStrategy}, 
  		QuestionService,
      ExamStatsService,
      QuickTestStatsService
	],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
