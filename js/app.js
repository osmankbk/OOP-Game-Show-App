/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js
  Goal: Exceed Expectation
  */
// Going for Exceed Expectation, if i fall short, please fail me so I can try again. Thank You.
const keyDiv = document.querySelector('#qwerty'); //Stored the div of the keys i'll be adding an evntListener on in a variable.
const button = document.querySelector('#btn__reset'); //Stored the start button in a variable as well.
let game; //created an instance of the game Object, stored in a variable, to be used multiple times.

button.addEventListener('click', (e) => { //Add an eventListener on the button that...
	game = new Game();
	game.resetGame();
	game.startGame(); // starts a new game by call the startGame method.
});
keyDiv.addEventListener('click', (e) => { //Added an eventListener on the div of the onscreen Keyboard and..
	if (e.target.className === 'key') { // Delegated the event to its children.
		game.handleInteraction(event.target); // The handleInteraction method is called when any of the child element is clicked
	}
});
document.addEventListener('keydown', (e) => { // An eventListener for the physical Keyboard. It calls..
	game.handleKeyInteraction(event.key); // The handleKeyInteraction when any of the keys is pressed.
});
