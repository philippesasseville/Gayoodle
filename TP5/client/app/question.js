"use strict";
var Question = (function () {
    function Question(theme, question, answer1, answer2, answer3, ans) {
        console.log("construct");
        this.theme = theme;
        this.question = question;
        this.ans = ans;
        this.reponses = [{ text: answer1 },
            { text: answer2 },
            { text: answer3 }];
    }
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=question.js.map