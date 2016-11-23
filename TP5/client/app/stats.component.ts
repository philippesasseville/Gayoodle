import { Component, OnInit } from '@angular/core';

import { ExamStatsService } from './examstats.service';
import { ExamService } from './exam.service';
import { QuickTestStatsService } from './quickteststats.service';
import { ExamStats } from './examstats';
import { QuickTestStats } from './quickteststats';
import { Exam } from './exam';

@Component({
	moduleId: module.id,
  	selector: 'mon-stats',
	  templateUrl: '/templates/stats'
})

export class StatsComponent {

  theme="HTML";
  nb="3";

  htmlpassed =0;
  csspassed =0;
  jspassed =0;
  htmlfail =0;
  cssfail =0;
  jsfail =0;
  notemoy =0;

  qrpassed =0;
  qrfailed =0;
  qrmoy =0;

  exams: Exam[] = [{theme:"HTML",pourcentage: 50}];

	constructor(private examStatsService: ExamStatsService,private examService: ExamService, private quickTestStatsService: QuickTestStatsService) { }
	
  ngOnInit(): void {
      this.examStatsService.get().then(stats => {
        this.htmlpassed = stats.HTMLwin;
        this.csspassed = stats.CSSwin;
        this.jspassed = stats.JSwin;
        this.htmlfail = stats.HTMLloss;
        this.cssfail = stats.CSSloss;
        this.jsfail = stats.JSloss;
        this.notemoy = stats.examMoyenne;
      });

      this.quickTestStatsService.get().then(qtstats => {
        this.qrpassed = qtstats.questionsRapidesWin;
        this.qrfailed = qtstats.questionsRapidesLoss;
        this.qrmoy = qtstats.questionsRapidesMoy;
      });

      this.examService.get().then(exams => this.exams = exams);
  }
}
