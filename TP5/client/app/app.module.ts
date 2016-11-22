import { NgModule  }      from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule  }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RulesComponent } from './rules.component';
import { DashboardComponent } from './dashboard.component';
import { AddQuestionComponent }      from './addquestion.component';
import { QuestionService }      from './question.service';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, AppRoutingModule ],
  declarations: [ AppComponent, RulesComponent, DashboardComponent, AddQuestionComponent ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, QuestionService],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
