var stringIndex = 0;
var wordsToShow = "";

var cutsceneDialogueIndex = 0;
var needNewString = false;

var displayTimer = 0; // counter 
var displayTimerLength = 60; // time in frames before new string is typed (game is at 30 frames per second)

var currentScene = null;

var upgradeLevelTwoScene = {
	displayLength: displayTimerLength,
	stringToDisplay: ["Through a burst of insight and creativity...", "Chop-Chop has improved their technique...",
					"...", '"What if I chopped harder?"']
};
var upgradeLevelThreeScene = {
	displayLength: displayTimerLength,
	stringToDisplay: ["Through a burst of insight and creativity...", "Chop-Chop has improved their technique...",
					"...", '"What if I threw my axe?"']
};
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

function playCutscene(data) {
	if (havingAMoment) {
		if (data.isGameOver) {
			gameOverOptions();
		}
		cutsceneDialogue(data);
		if (needNewString) {
			if (data.isGameOver && cutsceneDialogueIndex == data.stringToDisplay.length) {
				drawPixelfontCentered(wordsToShow, canvas.width/2, canvas.height/6);
				return;
				// stay on last string
			} else {
				cutsceneDialogueIndex++;
				needNewString = false;
				if (cutsceneDialogueIndex <= data.stringToDisplay.length - 1)
				wordsToShow = "";
			}
		}
		if (cutsceneDialogueIndex >= data.stringToDisplay.length) {
			if (data.isGameOver) {
				// do nothing - wait for input from player
			} else {
				havingAMoment = false;
				wordsToShow = "";
				stringIndex = 0;
				cutsceneDialogueIndex = 0;
				currentScene = null;
				particleList = [];
				player.x = player.oldX;
				player.y = player.oldY;
				needNewString = false;
				countdownTimerPaused = false;
				backgroundMusic.play();
			}
		}
	}
}

function cutsceneDialogue (data) {
	if (data.stringToDisplay[cutsceneDialogueIndex] == "no animal hit") {
		cutsceneDialogueIndex++
		return;
	}
	if (data.stringToDisplay[cutsceneDialogueIndex] == undefined || 
		cutsceneDialogueIndex == data.stringToDisplay.length) {
		drawPixelfontCentered(wordsToShow, canvas.width/2, canvas.height/6);
		return;
	} else {
		var choppedUpString = data.stringToDisplay[cutsceneDialogueIndex].split("");
	}

	if (stringIndex < choppedUpString.length) {
		if (data.isGameOver && cutsceneDialogueIndex == data.stringToDisplay.length) {
			// do nothing
		} else {
			wordsToShow += choppedUpString[stringIndex];
			drawPixelfontCentered(wordsToShow, canvas.width/2, canvas.height/6);
			stringIndex++; 
		}
	} else {
		drawPixelfontCentered(wordsToShow, canvas.width/2, canvas.height/6);
		displayTimer++
		if (displayTimer >= data.displayLength) {
			if (data.isGameOver && cutsceneDialogueIndex == data.stringToDisplay.length) {
				// do nothing
			} else {
				needNewString = true;
				stringIndex = 0;
				displayTimer = 0;
			}
		}
	}
}

function upgradeCheck() {
	const LEVEL_TWO_CHOPS = 100;
	const LEVEL_THREE_CHOPS = 104;

	if (player.chopCount >= LEVEL_TWO_CHOPS && !upgradeLevelTwo && 
		player.chopTimer === 0) {
		prepareCutscene(upgradeLevelTwoScene);
		upgradeLevelTwo = true;
		player.axeLevel = MID;
		player.axeSharpness += 1;
		player.axePower += player.axeSharpness;
		player.state = {
		chopping: false,
		walking: false,
		waiting: false,
		};
		//console.log("level up!");
	}
	if (player.chopCount >= LEVEL_THREE_CHOPS && !upgradeLevelThree && 
		player.chopTimer === 0) {
		prepareCutscene(upgradeLevelThreeScene);
		upgradeLevelThree = true;
		player.axeLevel = MAX;
		player.state = {
		chopping: false,
		walking: false,
		waiting: false,
		};
		//console.log("level up!");
	}
}

function prepareCutscene(scene) {
	framesFromGameStart = 0;
	havingAMoment = true;
	particleList = [];
	currentScene = scene;
	cutsceneSound.play();
	backgroundMusic.pause();
	if (scene.isGameOver) {
		backgroundMusic.src = "music/ChopChop-GameOverLoop_v1" + sourceExtension;
		backgroundMusic.play();
	}
}

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
			objectList = [];
			particleList = [];
			animatedTileList = [];
			backgroundMusic.pause();
			backgroundMusic.src = "music/ChopChopForestV1" + sourceExtension;
			backgroundMusic.volume = 0.4;
			backgroundMusic.play();
			countdownTimeRemaining = GAME_COUNTDOWN_LENGTH;
			countdownTimerPaused = false;
			var levelStartPosition = indexToCenteredXY(allLevels[currentLevelIndex].playerStartArrayIndex);
			player.x = levelStartPosition.x;
			player.y = levelStartPosition.y;
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
			currentLevelIndex = 0; // back to main menu
			worldGrid = Array.from(allLevels[currentLevelIndex].layout);
			worldCols = allLevels[currentLevelIndex].columns;
			worldRows = allLevels[currentLevelIndex].rows;
			particleList = [];
			animalList = [];
			objectList = [];
			particleList = [];
			animatedTileList = [];
			var levelStartPosition = indexToCenteredXY(allLevels[currentLevelIndex].playerStartArrayIndex);
			player.x = levelStartPosition.x;
			player.y = levelStartPosition.y;
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
