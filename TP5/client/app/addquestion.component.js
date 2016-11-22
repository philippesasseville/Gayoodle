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
var question_1 = require('./question');
var question_service_1 = require('./question.service');
var AddQuestionComponent = (function () {
    function AddQuestionComponent(questionService) {
        this.questionService = questionService;
        this.theme = "HTML";
        this.question = "";
        this.reponse1 = "";
        this.reponse2 = "";
        this.reponse3 = "";
        this.reponse = "";
        this.err = "";
        this.slot1 = false;
        this.slot2 = false;
        this.slot3 = false;
    }
    AddQuestionComponent.prototype.post = function () {
        //call question service
        if (!this.question)
            this.err = "Veuillez entrer une question!";
        else if (!this.reponse1 || !this.reponse2 || !this.reponse3)
            this.err = "Veuillez entrer 3 reponses!";
        else if (!this.reponse)
            this.err = "Veuillez indiquer la bonne reponse!";
        else {
            if (this.reponse === "reponse1")
                this.slot1 = true;
            else if (this.reponse === "reponse2") {
                this.slot2 = true;
            }
            else if (this.reponse === "reponse3") {
                this.slot3 = true;
            }
            var q = new question_1.Question(this.theme, this.question, this.reponse1, this.reponse2, this.reponse3, this.slot1, this.slot2, this.slot3);
            console.log(JSON.stringify(q));
            this.questionService.create(q);
            this.err = "Question soumise!";
            this.theme = "HTML";
            this.question = "";
            this.reponse1 = "";
            this.reponse2 = "";
            this.reponse3 = "";
            this.reponse = "";
            this.slot1 = false;
            this.slot2 = false;
            this.slot3 = false;
        }
    };
    AddQuestionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-addquestion',
            templateUrl: '/templates/addquestion'
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService])
    ], AddQuestionComponent);
    return AddQuestionComponent;
}());
exports.AddQuestionComponent = AddQuestionComponent;
//# sourceMappingURL=addquestion.component.js.map