// Andrew Ang
// Hangman
var listOfCharGuesses = [];
var listOfWords = ['apples', 'oranges', 'grapes', 'bananas', 'mango', 'pineapple', 'durian'];
var correctWord = listOfWords[Math.floor(Math.random()*listOfWords.length)];
var userGuessBool = [];
var maxTries = 5;
var numOfTries = 0;

function hangman() {

	var input = document.getElementById("guess").value;
	// if the user has guessed the word yet
	for (var i = correctWord.length - 1; i >= 0; i--) {
		userGuessBool.push(false);
	}
	if(numOfTries >= maxTries)
	{
		return;
	}


	// check the input that the user typed in
	if (input.length == 0) { // user entered nothing ask for input
		document.getElementById("playerInfo").innerHTML = "Please guess a letter or word.";
		return;
	} else if (input.length == 1) { // single character
		if(listOfCharGuesses.indexOf(input) == -1) { // only add to array if they havent guessed it before
			listOfCharGuesses.push(input);
		} else {
			document.getElementById("playerInfo").innerHTML = "You have already guessed " + input.toString() +
				"<br>" + "Please guess something else.";
			return;
		}
		// mark if seen
		for (var i = 0; i < correctWord.length; i++) {
			if (input == correctWord[i])
			{
				userGuessBool[i] = true;
			} 
		}
		document.getElementById("gameBoard").innerHTML = ""; // reset the results each time
		// make the table output, dashes if they havent guessed it yet, the letter if they have
		for (var i = 0; i < correctWord.length; i++) {
			if(userGuessBool[i])
			{
				document.getElementById("gameBoard").innerHTML += correctWord[i] + " ";
			} else {
				document.getElementById("gameBoard").innerHTML += "_ ";
			}	
		}

		// if they guess all of the characters without guessing the word
		for(var i = 0; i < correctWord.length; i++) {
			if (userGuessBool[i] && i == correctWord.length - 1) {
				document.getElementById("playerInfo").innerHTML = "You Win!";
				numOfTries = 1000;
			    return;
			} else if (!userGuessBool[i]) {
				break;
			}
		}
	} else { // if they are guessing a whole word
		if (input == correctWord) 
		{
			// display the answer
			document.getElementById("gameBoard").innerHTML = correctWord.toString();
			// tell the user that they won
			document.getElementById("playerInfo").innerHTML = "You Win!";
			numOfTries = 1000;
			return;
		} else {
			// tell the user that they lose
			document.getElementById("playerInfo").innerHTML = "You Lose!" + "<br>" + "The answer was: " + correctWord.toString();
			numOfTries = 1000;
			return;
		}
	}
	if(correctWord.indexOf(input) == -1) // only increment if you guess it wrong
	{
		numOfTries++;
	}

		// the user guessed the word and is within their limit
	if(input == correctWord && numOfTries < maxTries) {
		document.getElementById("playerInfo").innerHTML = "You Win!";
		numOfTries = 1000;
		return;
	} else if (numOfTries >= maxTries) {
		document.getElementById("playerInfo").innerHTML = "You Lose!" + "<br>" + "The answer was: " + correctWord.toString();
		numOfTries = 1000;
		return;
	}
	// print the output
	document.getElementById("playerInfo").innerHTML = "Number of tries left: " + (maxTries - numOfTries).toString() + "<br>" 
	+ "Your single character guesses so far: " + listOfCharGuesses.toString();
	//"Your word guesses so far: " + listOfWordGuesses.toString();

	document.getElementById("guess").value = "";
	document.getElementById("guess").focus();
}
