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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var QuestionService = (function () {
    function QuestionService(http) {
        this.http = http;
        this.questionUrl = '/question'; // URL to web api
        this.verifyUrl = '/verify'; // URL to web api
        this.verifyExamUrl = '/verifyexam'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    QuestionService.prototype.create = function (question) {
        return this.http
            .post(this.questionUrl, JSON.stringify(question), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    QuestionService.prototype.handleError = function (err) {
        // console.log(err);
    };
    QuestionService.prototype.get = function (theme) {
        var url;
        if (!theme)
            url = this.questionUrl;
        else
            url = this.questionUrl + "/:" + theme;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    QuestionService.prototype.verify = function (question, reponseChoisi) {
        return this.http
            .post(this.verifyUrl, JSON.stringify({ question: question, reponseChoisi: reponseChoisi }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    QuestionService.prototype.verifyExam = function (question, reponseChoisi) {
        return this.http
            .post(this.verifyExamUrl, JSON.stringify({ question: question, reponseChoisi: reponseChoisi }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    QuestionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuestionService);
    return QuestionService;
}());
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map