"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('./app.component');
var stats_component_1 = require('./stats.component');
var rules_component_1 = require('./rules.component');
var dashboard_component_1 = require('./dashboard.component');
var addquestion_component_1 = require('./addquestion.component');
var question_service_1 = require('./question.service');
var quicktest_component_1 = require('./quicktest.component');
var exam_component_1 = require('./exam.component');
var result_component_1 = require('./result.component');
var examstats_service_1 = require('./examstats.service');
var quickteststats_service_1 = require('./quickteststats.service');
var exam_service_1 = require('./exam.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routing_module_1.AppRoutingModule],
            declarations: [
                app_component_1.AppComponent,
                rules_component_1.RulesComponent,
                dashboard_component_1.DashboardComponent,
                addquestion_component_1.AddQuestionComponent,
                quicktest_component_1.QuickTestComponent,
                exam_component_1.ExamComponent,
                result_component_1.ResultComponent,
                stats_component_1.StatsComponent
            ],
            providers: [
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                question_service_1.QuestionService,
                examstats_service_1.ExamStatsService,
                quickteststats_service_1.QuickTestStatsService,
                exam_service_1.ExamService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map