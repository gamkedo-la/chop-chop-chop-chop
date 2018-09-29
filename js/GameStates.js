let openingMenuIsRunning = true;
let gameIsRunning = false;
let gameIsPaused = false;

//add background image for opening menu
function drawOpeningMenu() {
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorRect(canvas.width / 2 - 300, canvas.height / 2 - 50, 600, 160, "white");
	colorRect(canvas.width / 2 - 298, canvas.height / 2 - 48, 596, 156, "black");

	drawPixelfont("Chop-Cho, Ch-C", canvas.width / 3, canvas.height / 2 - 20, 20, 20);
	drawPixelfontCentered("Get it?", canvas.width / 2, canvas.height / 2 + 40);
	drawPixelfontCentered("Click to play", canvas.width / 2, canvas.height / 2 + 80);
}

function drawPauseScreen() {
	drawAll();

	for (let x = 0; x < canvas.width; x += 16) {
		for (let y = 0; y < canvas.height; y += 16) {
			colorRect(x + 8, y, 8, 8, "black");
			colorRect(x, y + 8, 8, 8, "black");
		}
	}

	colorRect(canvas.width / 2 - 300, canvas.height / 2 - 50, 600, 160, "white");
	colorRect(canvas.width / 2 - 298, canvas.height / 2 - 48, 596, 156, "black");

	drawPixelfont("Game Paused", canvas.width / 2 - 10, canvas.height / 2);
	drawPixelfont("Press P to Resume Play", canvas.width / 2 - 10, canvas.height / 2 + 80);
}

let togglePauseGame = () => {
	if (!gameIsPaused) {
		gameIsPaused = true;
		windowOnBlur();
		drawPauseScreen();
	} else {
		gameIsPaused = false;
		windowOnFocus();
	}
}

let toggleDebug = () => {
	debug = !debug;
}

var relaxingIdeas = [' take a nice bath..."', ' have a cup of cocoa..."', ' dance like no one is watching..."',
						' eat a whole cake..."', ' play some video games..."', ' take a long nap..."',
						' watch my favorite movie..."', ' make a tasty soup..."', ' read a book..."',
						' eat a whole pizza..."', ' veg out..."',' sharpen my axe..."'];

var frustratedSayings = ['"I am so frustrated..."', '"I feel stumped..."', 
							'"Everything is working against me..."'];

var firstRandomRelaxingIdeasIndex = 0;
var secondRandomRelaxingIdeasIndex = 0;
var firstRelaxingIdeasString = "";
var secondRelaxingIdeasString = "";

var firstRandomFrustratedSayingsIndex = 0;
var secondRandomFrustratedSayingsIndex = 0;
var firstFrustratedSayingsString = "";
var secondFrustratedSayingsString = "";

let randomFrustratedSayingsIndex = () => {
	firstRandomFrustratedSayingsIndex = getRoundedRandomNumberBetweenMinMax(0,frustratedSayings.length -1);
	firstFrustratedSayingsString = frustratedSayings[firstRandomFrustratedSayingsIndex];
	secondRandomFrustratedSayingsIndex = getRoundedRandomNumberBetweenMinMax(0,frustratedSayings.length -1);
	secondFrustratedSayingsString = frustratedSayings[secondRandomFrustratedSayingsIndex];
	if (secondRandomFrustratedSayingsIndex == firstRandomFrustratedSayingsIndex) {
		console.log("duplicate furstationSayings... Remedying");
		var savingArrayForLater = frustratedSayings.slice();
		frustratedSayings.splice(firstRandomFrustratedSayingsIndex,1);
		secondRandomFrustratedSayingsIndex = getRoundedRandomNumberBetweenMinMax(0,frustratedSayings.length -1)
		secondFrustratedSayingsString = frustratedSayings[secondRandomFrustratedSayingsIndex];
		frustratedSayings = savingArrayForLater;
	}
	firstRandomRelaxingIdeasIndex = getRoundedRandomNumberBetweenMinMax(0,relaxingIdeas.length -1);
	firstRelaxingIdeasString = relaxingIdeas[firstRandomRelaxingIdeasIndex];
	secondRandomRelaxingIdeasIndex = getRoundedRandomNumberBetweenMinMax(0,relaxingIdeas.length -1);
	secondRelaxingIdeasString = relaxingIdeas[secondRandomRelaxingIdeasIndex];
	if (secondRandomRelaxingIdeasIndex == firstRandomRelaxingIdeasIndex) {
		console.log("duplicate relaxingIdeas... Remedying");
		var savingArrayForLater = relaxingIdeas.slice();
		frustratedSayings.splice(firstRandomRelaxingIdeasIndex,1);
		secondRandomRelaxingIdeasIndex = getRoundedRandomNumberBetweenMinMax(0,relaxingIdeas.length -1)
		secondRelaxingIdeasString = relaxingIdeas[secondRandomRelaxingIdeasIndex];
		frustratedSayings = savingArrayForLater;
	}
}	

var FrustratedScene = {}; 
var hitAnAnimalStringFirst = "no animal hit";
var hitAnAnimalStringSecond = "no animal hit";

function getNewFrustratedScene() { // called in PlayerClass.js this.gotHit();
	FrustratedScene = {};
	randomFrustratedSayingsIndex();
	if (player.hitAnAnimal) {
		hitAnAnimalStringFirst = '"I don' + "'" + 't want to hurt any animal friends either..."';
		hitAnAnimalStringSecond = "Why did I do that?...";
	}
	// edits to this scene will display in the game
	FrustratedScene = {
		displayLength: 70,
		stringToDisplay: [
						firstFrustratedSayingsString, 
						secondFrustratedSayingsString, 
						hitAnAnimalStringFirst,
						hitAnAnimalStringSecond,
						'"I should just go home..."',
						'"Maybe' + firstRelaxingIdeasString,
						'"Then' + secondRelaxingIdeasString,
						'"Yeah, that sounds good..."', '"But..."', '"Maybe I should try again?"'
						],
		isGameOver: true
	}; 
}

var OutOfTimeScene = {
	displayLength: 90,
	stringToDisplay: ["The flow of time is always cruel..."],
	isGameOver: true
};

var leftPosition = true;

let gameOverOptions = () => {
	var continueX = canvas.width/3 - 100;
	var quitX = canvas.width/2 + 100;
	var optionsY = canvas.height - 100;
	var selectorXContinue = continueX - 10;
	var selectorXQuit = continueX - 10 + (canvas.width/2 - 67);
	var selectorY = optionsY + 6;
	var	selectorX = selectorXContinue;

	if (leftKeyHeld) {
		leftPosition = true;
	} else if (rightKeyHeld) {
		leftPosition = false;
	}

	if (leftPosition) {
		// do nothing
	} else {
		selectorX = selectorXQuit
	}
	
	if (spacebarKeyHeld) {
		if (selectorX == selectorXContinue) {
			wordsToShow = "";
			stringIndex = 0;
			cutsceneDialogueIndex = 0;
			currentScene = null;
			needNewString = false;
			// TODO: Wrap these changes and relevant others into resetLevel function
			worldGrid = Array.from(allLevels[currentLevelIndex].layout);
			particleList = [];
			animalList = [];
			backgroundMusic.pause();
			backgroundMusic.src = "music/ChopChopForestV1" + sourceExtension;
			backgroundMusic.volume = 0.4;
			backgroundMusic.play();
			countdownTimeRemaining = GAME_COUNTDOWN_LENGTH;
			countdownTimerPaused = false;
			player.x = 20;
			player.y = 40;
			player.invincible = false;
			spacebarKeyHeld = false;
			player.chopTimer = 0;
			havingAMoment = false;
		} else if (selectorX == selectorXQuit) {
			wordsToShow = " ";
			stringIndex = 0;
			cutsceneDialogueIndex = 0;
			currentScene = null;
			needNewString = false;
			// TODO: Wrap these changes and relevant others into resetGame function
			countdownTimeRemaining = GAME_COUNTDOWN_LENGTH;
			countdownTimerPaused = false;
			openingMenuIsRunning = true;
			backgroundMusic.pause();
			backgroundMusic.src = "music/ChopChopMenu_V1" + sourceExtension;
			backgroundMusic.volume = 0.4;
			backgroundMusic.play();
			currentLevelIndex = 0; // back to level one
			worldGrid = Array.from(allLevels[currentLevelIndex].layout);
			particleList = [];
			animalList = [];
			player.x = 20;
			player.y = 40;
			player.invincible = false;
			spacebarKeyHeld = false;
			player.chopTimer = 0;
			havingAMoment = false;
		}
	}

	const BLINK_RATE = 16;
	if (selectorX == selectorXContinue) {
		if (framesFromGameStart % BLINK_RATE <= (BLINK_RATE/2-1)) {
			// blinking
		} else {
			drawPixelfont("Continue!", continueX, optionsY, 20,20);
		}
	} else {
		drawPixelfont("Continue!", continueX, optionsY, 20,20);
	}

	if (selectorX == selectorXQuit) {
		if (framesFromGameStart % BLINK_RATE <= (BLINK_RATE/2-1)) {
			// blinking
		} else {
			drawPixelfont("Quit...", quitX, optionsY, 20,20);
		}
	} else {		
		drawPixelfont("Quit...", quitX, optionsY, 20,20);
	}

	drawRect(selectorX, selectorY, 6,6, "white");
}

let resetGame = () => {
	
}
