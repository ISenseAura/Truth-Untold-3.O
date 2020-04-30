//From 
//https://github.com/Zerapium/Truth-Untold-Bot/blob/master/tools.js
//
class tools {
  constructor() {
  }
  
  toId(text : string){
  if (!text || typeof text !== "string") return "";
 // if (text) return text.toLowerCase().replace(/[^a-z0-9\-]/g, "");
  return text.toLowerCase().replace(/[^a-z0-9]/g, ""); 
  }
   sampleOne(array: any[]) {
		const len = array.length;
		if (!len) throw new Error("Tools.sampleOne() does not accept empty arrays");
		if (len === 1) return array.slice()[0];
		return this.shuffle(array)[0];
	}
   
  shuffle(array: any[]) {
		array = array.slice();

		// Fisher-Yates shuffle algorithm
		let currentIndex = array.length;
		let randomIndex = 0;
		let temporaryValue;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
}

export let Tools = new tools()

