export class Question {

	constructor(theme: string,question: string, answer1: string, answer2: string, answer3: string, slot1: boolean, slot2: boolean, slot3: boolean) {
	    console.log("construct");
	    this.theme = theme;
	    this.question = question;
	    this.reponses = [{text: answer1, ans: slot1 },{text: answer2, ans: slot2 },{text: answer3, ans: slot3 }];
	}

	theme: string;
	question: string;
	reponses: [{text: string, ans: boolean },
	{text: string, ans: boolean },
	{text: string, ans: boolean }]
}