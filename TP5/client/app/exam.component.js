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
var question_service_1 = require('./question.service');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
var ExamComponent = (function () {
    function ExamComponent(questionService, router, route) {
        this.questionService = questionService;
        this.router = router;
        this.route = route;
        this.err = "";
        this.questionText = "Loading...";
        this.reponse1 = "Loading...";
        this.reponse2 = "Loading...";
        this.reponse3 = "Loading...";
        this.stats = "Stats: 0/0";
        this.reponseBonne = "";
        this.reponseChoisi = "Glisser votre reponse ici";
        this.goodClassBool = false;
        this.badClassBool = false;
        this.canDrop = true;
        this.totalQuestion = 0;
        this.totalGood = 0;
        this.totalRepondu = 0;
    }
    ExamComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.theme = params['theme']; })
            .subscribe();
        this.route.params
            .switchMap(function (params) { return _this.totalQuestion = params['nb']; })
            .subscribe();
        this.init();
    };
    ExamComponent.prototype.init = function () {
        var _this = this;
        this.questionText = "Loading...";
        this.err = "";
        this.reponse1 = "Loading...";
        this.reponse2 = "Loading...";
        this.reponse3 = "Loading...";
        this.reponseBonne = "";
        this.reponseChoisi = "Glisser votre reponse ici";
        this.goodClassBool = false;
        this.badClassBool = false;
        this.canDrop = true;
        this.questionService.get(this.theme).then(function (question) {
            _this.question = question;
            _this.questionText = question.question;
            _this.reponse1 = question.reponses[0].text;
            _this.reponse2 = question.reponses[1].text;
            _this.reponse3 = question.reponses[2].text;
        });
    };
    ExamComponent.prototype.onDragStart = function (event, data) {
        switch (event.target.id) {
            case "1":
                event.dataTransfer.setData('data', this.reponse1);
                break;
            case "2":
                event.dataTransfer.setData('data', this.reponse2);
                break;
            case "3":
                event.dataTransfer.setData('data', this.reponse3);
                break;
            default: console.log("oops");
        }
    };
    ExamComponent.prototype.onDrop = function (event, data) {
        var _this = this;
        if (this.canDrop) {
            this.reponseChoisi = event.dataTransfer.getData('data');
            this.questionService.verifyExam(this.questionText, this.reponseChoisi)
                .then(function (res) { return _this.setClasses(res); }); //
        }
        event.preventDefault();
    };
    ExamComponent.prototype.allowDrop = function (event) {
        event.preventDefault();
    };
    ExamComponent.prototype.setClasses = function (result) {
        if (result) {
            this.goodClassBool = true;
            this.totalGood += 1;
        }
        else {
            this.badClassBool = true;
        }
        this.totalRepondu += 1;
        this.canDrop = false;
    };
    ExamComponent.prototype.clickSuivant = function () {
        if (this.canDrop) {
            this.err = "Veuillez choisir une reponse.";
            return;
        }
        if (this.totalRepondu == this.totalQuestion)
            this.router.navigate(['/dashboard']);
        else
            this.init();
    };
    ExamComponent.prototype.clickMenu = function () {
        this.router.navigate(['/dashboard']);
    };
    ExamComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-exam',
            templateUrl: '/templates/exam' //
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService, router_1.Router, router_2.ActivatedRoute])
    ], ExamComponent);
    return ExamComponent;
}());
exports.ExamComponent = ExamComponent;
//# sourceMappingURL=exam.component.js.map