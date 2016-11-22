import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard.component';
import { RulesComponent }      from './rules.component';
import { AddQuestionComponent }      from './addquestion.component';
import { QuickTestComponent }      from './quicktest.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'rules',     component: RulesComponent },
  { path: 'addquestion',     component: AddQuestionComponent },
  { path: 'quicktest',     component: QuickTestComponent }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}