var stringIndex = 0;
var wordsToShow = "";

var cutsceneDialogueIndex = 0;
var needNewString = false;

var displayTimer = 0; // counter 
var displayTimerLength = 50; // time in frames before new string is typed (game is at 30 frames per second)

var currentScene = null;

var upgradeLevelTwoScene = {
	displayLength: displayTimerLength,
	stringToDisplay: ["Through a burst of insight and creativity...", "Chop-Chop has improved his technique...",
					"...", '"What if I chopped harder?"']
};
var upgradeLevelThreeScene = {
	displayLength: displayTimerLength,
	stringToDisplay: ["Through a burst of insight and creativity...", "Chop-Chop has improved his technique...",
					"...", '"What if I threw my axe?"']
};
var FrustratedScene = {
	displayLength: 50,
	stringToDisplay: ["Game Over"],
	isGameOver: true
};

function playCutscene(data) {
	if (havingAMoment) {
		countdownTimerPaused = true;
		if (data.isGameOver) {
			cutsceneDialogue(data.stringToDisplay[cutsceneDialogueIndex], data.displayLength);
			// game over sequence
			return;
		}
		cutsceneDialogue(data.stringToDisplay[cutsceneDialogueIndex], data.displayLength);
		if (needNewString) {
			cutsceneDialogueIndex++;
			needNewString = false;
			wordsToShow = "";
		}
		if (cutsceneDialogueIndex >= data.stringToDisplay.length) {
			havingAMoment = false;
			wordsToShow = "";
			stringIndex = 0;
			cutsceneDialogueIndex = 0;
			currentScene = null;
			player.x = player.oldX;
			player.y = player.oldY;
			needNewString = false;
			countdownTimerPaused = false;
		}
	}
}

function cutsceneDialogue (stringToDisplay, displayLength) {
	var choppedUpString = stringToDisplay.split("");
	if (stringIndex < choppedUpString.length) {
		wordsToShow += choppedUpString[stringIndex];
		drawPixelfontCentered(wordsToShow, canvas.width/2, canvas.height/6);
		stringIndex++; 
	} else {
		drawPixelfontCentered(wordsToShow, canvas.width/2, canvas.height/6);
		displayTimer++
		if (displayTimer >= displayLength) {
			needNewString = true;
			stringIndex = 0;
			displayTimer = 0;
		}
	}
}

upgradeCheck = function() {
	const LEVEL_TWO_CHOPS = 100;
	const LEVEL_THREE_CHOPS = 104;

	if (player.chopCount >= LEVEL_TWO_CHOPS && !upgradeLevelTwo) {
		prepareCutscene(upgradeLevelTwoScene);
		upgradeLevelTwo = true;
		player.axeLevel = MID;
		player.axeSharpness += 1;
		player.axePower += player.axeSharpness
		player.state = {
		chopping: false,
		walking: false,
		waiting: false,
		};
		//console.log("level up!");
	}
	if (player.chopCount >= LEVEL_THREE_CHOPS && !upgradeLevelThree) {
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
	currentScene = scene;
}
