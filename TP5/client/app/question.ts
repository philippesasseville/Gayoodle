export class Question {

	constructor(theme: string,question: string, answer1: string, answer2: string, answer3: string, ans: number) {
	    console.log("construct");
	    this.theme = theme;
	    this.question = question;
	    this.ans = ans;
	    this.reponses = [{text: answer1},
	    	{text: answer2},
	    	{text: answer3}];
	}

	theme: string;
	question: string;
	ans: number;
	reponses: [{text: string},
	{text: string},
	{text: string}];
}