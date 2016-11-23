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
var router_1 = require('@angular/router');
var examstats_service_1 = require('./examstats.service');
var quickteststats_service_1 = require('./quickteststats.service');
var DashboardComponent = (function () {
    function DashboardComponent(router, examStatsService, quickTestStatsService) {
        this.router = router;
        this.examStatsService = examStatsService;
        this.quickTestStatsService = quickTestStatsService;
        this.theme = "HTML";
        this.nb = "3";
        this.htmlpassed = 0;
        this.csspassed = 0;
        this.jspassed = 0;
        this.htmlfail = 0;
        this.cssfail = 0;
        this.jsfail = 0;
        this.notemoy = 0;
        this.qrpassed = 0;
        this.qrfailed = 0;
        this.qrmoy = 0;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.examStatsService.get().then(function (stats) {
            _this.htmlpassed = stats.HTMLwin;
            _this.csspassed = stats.CSSwin;
            _this.jspassed = stats.JSwin;
            _this.htmlfail = stats.HTMLloss;
            _this.cssfail = stats.CSSloss;
            _this.jsfail = stats.JSloss;
            _this.notemoy = stats.examMoyenne;
        });
        this.quickTestStatsService.get().then(function (qtstats) {
            _this.qrpassed = qtstats.questionsRapidesWin;
            _this.qrfailed = qtstats.questionsRapidesLoss;
            _this.qrmoy = qtstats.questionsRapidesMoy;
        });
    };
    DashboardComponent.prototype.goToQuickTest = function () {
        this.router.navigate(['/quicktest']);
    };
    DashboardComponent.prototype.goToExam = function () {
        this.router.navigate(['/exam', this.theme, this.nb]);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mon-dashboard',
            templateUrl: '/templates/dashboard'
        }), 
        __metadata('design:paramtypes', [router_1.Router, examstats_service_1.ExamStatsService, quickteststats_service_1.QuickTestStatsService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map