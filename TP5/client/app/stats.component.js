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
var examstats_service_1 = require('./examstats.service');
var exam_service_1 = require('./exam.service');
var quickteststats_service_1 = require('./quickteststats.service');
var StatsComponent = (function () {
    function StatsComponent(examStatsService, examService, quickTestStatsService) {
        this.examStatsService = examStatsService;
        this.examService = examService;
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
        this.exams = [{ theme: "HTML", pourcentage: 50 }];
    }
    StatsComponent.prototype.ngOnInit = function () {
        this.init();
    };
    StatsComponent.prototype.clearStats = function () {
        var _this = this;
        this.examService.clear()
            .then(function () { return _this.quickTestStatsService.clear()
            .then(function () { return _this.examStatsService.clear()
            .then(function () { return _this.init(); }); }); });
    };
    StatsComponent.prototype.init = function () {
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
        this.examService.get().then(function (exams) { return _this.exams = exams; });
        return true;
    };
    StatsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mon-stats',
            templateUrl: '/templates/stats'
        }), 
        __metadata('design:paramtypes', [examstats_service_1.ExamStatsService, exam_service_1.ExamService, quickteststats_service_1.QuickTestStatsService])
    ], StatsComponent);
    return StatsComponent;
}());
exports.StatsComponent = StatsComponent;
//# sourceMappingURL=stats.component.js.map