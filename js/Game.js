//The Game class that handles starting, ending the game and most of the interactions between the two classes
class Game {
	constructor() { // The Class constructor with its properties
		this.missed = 0;
		this.phrases = this.createPhrases();
		this.activePhrase = null;
	}
	startGame() { //The Method that starts the game by..
		const overlayDiv = document.getElementById('overlay');
		overlayDiv.style.display = 'none'; //Hiding the Overlay div(the start page),
		this.activePhrase = this.getRandomPhrase(); //Getting a random Phrase by calling the getRandomPhrase method and..
		return this.activePhrase.addPhraseToDisplay(); //Displaying it by calling the addPhraseToDisplay method
	}
	getRandomPhrase() { //This method returns a random phrase from the "this.phrases" property.
		const randomPhrase = Math.floor(Math.random() * this.phrases.length);
		const newPhrase = new Phrase(this.phrases[randomPhrase].phrase);
		return newPhrase;
	}
	handleInteraction(htmlButton) { //The Interaction method that checks to see if the letter of the button...
		htmlButton = event.target;
		if (this.activePhrase.checkLetter(htmlButton.textContent) === false) { //Clicked is in the phrase being displayed.
			htmlButton.setAttribute('disabled', true); //And set its attributes accordinly, and also..
			htmlButton.className = 'wrong';
			this.removeLife(); //retains or remove a life,...
		} else {
			htmlButton.className = 'chosen';
			this.activePhrase.showMatchedLetter(htmlButton.textContent); // or displays the letter depending on whether it is or not.
			if (this.checkForWin() !== false) { //It aslo checks if the game is won by call the checkForWin method.
				this.gameOver(true);
			}
		}
	}
	handleKeyInteraction(htmlKey) { //This method has the exact same fuction as the handleInteraction,but for the physical Keyboard
		htmlKey = event.key.toLowerCase();
		const keys = document.querySelectorAll('#qwerty button');
		keys.forEach(key => {
			if (key.innerHTML === htmlKey) {
				if (this.activePhrase.checkLetter(htmlKey) === true) {
					this.activePhrase.showMatchedLetter(htmlKey);
					key.setAttribute('class', 'chosen');
					if (this.checkForWin() !== false) {
						this.gameOver(true);
					}
				} else {
					if (key.className === 'wrong') {
						return false;
					}
					key.setAttribute('class', 'wrong');
					this.removeLife();
				}
			}
		})
	}
	createPhrases() { //The method that creates the phrases for the game.
		const phraseObject = [new Phrase('I Love You'), new Phrase('Change Requires Action'),
			new Phrase('Momento Mori'), new Phrase('The Future is Architected'), new Phrase('I am Alive')
		];
		return phraseObject;
	}
	checkForWin() { //This method checks if the game is won, by checking if any of the...
		const liLetters = document.querySelectorAll('ul li');
		for (let i = 0; i < liLetters.length; i++) {
			if (liLetters[i].classList.contains('hide')) { //Li elements still has an 'hide' class
				return false; //returns false if any of them does.
			}
		}
	}
	removeLife() { //The method that replaces a 'live heart' with a 'lost heart' every value in the 'missed' property.
		const liveHearts = document.querySelectorAll('.tries img');
		liveHearts[this.missed].src = 'images/lostHeart.png';
		this.missed += 1;
		if (this.missed > 4) { //And calls the 'gameOver' method when the missed value is greater than 4.
			this.gameOver(false);
		}
	}
	gameOver(gameWon) { //This method handles the win and lose div page shown when the game is won or lost.
		const overlayDiv = document.querySelector('#overlay');
		if (gameWon === false) {
			overlayDiv.className = 'lose';
			$('#game-over-message').text('You Lose!').css('color', 'black');
			$('#overlay').fadeIn(1000);
			$('#overlay').css('background-color', 'red');
			$('#btn__reset').text('Try Again').css('color', 'red').hide().fadeIn(2000);
		} else if (gameWon === true) {
			overlayDiv.className = 'win';
			$('#game-over-message').text('You Win!').css('color', 'red');
			$('#btn__reset').text('Play Again?').css('color', 'red').hide().fadeIn(2000);
			$('#overlay').css('background-color', 'green').fadeIn(600);
		}
	}
	resetGame() { //This resets the game when the start button is clicked by...
		const ul = document.querySelector('ul');
		const keyDiv = document.querySelectorAll('#qwerty button');
		const hearts = document.querySelectorAll('.tries img')
		ul.innerHTML = ''; //Deleting all the li elements from the parent Node,..
		keyDiv.forEach(key => {
			key.classList.remove('chosen', 'wrong'); //removes any 'chosen' or 'wrong' class,..
			key.classList.add('key');
			key.disabled = false;
		});
		this.missed = 0; //resetting the missed value back to 0...
		hearts.forEach(liveHeart => {
			liveHeart.setAttribute('src', 'images/liveHeart.png'); //and giving all the hearts a 'liveHeart' source.
		});
	}
}
