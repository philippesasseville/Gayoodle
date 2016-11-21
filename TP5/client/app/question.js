"use strict";
var Question = (function () {
    function Question(theme, question, answer1, answer2, answer3, slot1, slot2, slot3) {
        console.log("construct");
        this.theme = theme;
        this.question = question;
        this.reponses = [{ text: answer1, ans: slot1 }, { text: answer2, ans: slot2 }, { text: answer3, ans: slot3 }];
    }
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=question.js.map