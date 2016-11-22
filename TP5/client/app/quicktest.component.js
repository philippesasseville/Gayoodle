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
var QuickTestComponent = (function () {
    function QuickTestComponent(questionService) {
        this.questionService = questionService;
        this.questionText = "meme";
        this.reponse1 = "";
        this.reponse2 = "";
        this.reponse3 = "";
        this.reponseChoisi = "Glisser votre reponse ici";
<<<<<<< HEAD
        this.reponseBonne = "";
=======
        this.goodClassBool = false;
        this.badClassBool = false;
>>>>>>> cb1263afc3fba3da2e6d1059fe44140ff569e01a
    }
    QuickTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.questionService.get().then(function (question) {
            _this.question = question;
            _this.questionText = question.question;
            _this.reponse1 = question.reponses[0].text;
            _this.reponse2 = question.reponses[1].text;
            _this.reponse3 = question.reponses[2].text;
        });
    };
    QuickTestComponent.prototype.onDragStart = function (event, data) {
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
    QuickTestComponent.prototype.onDrop = function (event, data) {
        this.reponseChoisi = event.dataTransfer.getData('data');
<<<<<<< HEAD
        var isGood = this.checkAnswer();
        if (isGood) {
            console.log("GOOD SHIT");
        }
        else {
            console.log("TU SUCK");
        }
=======
        if (1)
            this.goodClassBool = true;
        else
            this.badClassBool = true;
>>>>>>> cb1263afc3fba3da2e6d1059fe44140ff569e01a
        event.preventDefault();
    };
    QuickTestComponent.prototype.allowDrop = function (event) {
        event.preventDefault();
    };
    QuickTestComponent.prototype.checkAnswer = function () {
        var _this = this;
        this.question.reponses.forEach(function (item, index) {
            if (item.ans) {
                _this.reponseBonne = item.text;
            }
        });
        if (this.reponseChoisi === this.reponseBonne) {
            return true;
        }
        else {
            return false;
        }
    };
    QuickTestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-quicktest',
            templateUrl: '/templates/quicktest'
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService])
    ], QuickTestComponent);
    return QuickTestComponent;
}());
exports.QuickTestComponent = QuickTestComponent;
//# sourceMappingURL=quicktest.component.js.map