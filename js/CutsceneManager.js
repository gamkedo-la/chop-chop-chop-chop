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

function playCutscene(data) {
	if (havingAMoment) {
		if (data.isGameOver) {
			gameOverOptions();
		}
		countdownTimerPaused = true;
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
		player.axePower = player.restoreAxePower;
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
