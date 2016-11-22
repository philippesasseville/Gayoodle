import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { RulesComponent }      from './rules.component';
import { AddQuestionComponent }      from './addquestion.component';
import { QuickTestComponent }      from './quicktest.component';
import { ExamComponent }      from './exam.component';
import { ResultComponent }      from './result.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'rules',     component: RulesComponent },
  { path: 'addquestion',     component: AddQuestionComponent },
  { path: 'quicktest',     component: QuickTestComponent },
  { path: 'exam/:theme/:nb',     component: ExamComponent },
  { path: 'result/:theme/:totalGood/:totalQuestion', component: ResultComponent }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}