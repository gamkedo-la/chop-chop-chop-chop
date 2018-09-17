let openingMenuIsRunning = true;
let gameIsRunning = false;
let gameIsPaused = false;

var currentScene = null;
var stringIndex = 0;
var wordsToShow = "";

var upgradeLevelTwoScene = {
	cutsceneTime: 3, // in seconds, multiplied by frames per second later
	stringToDisplay: "This is level two"
};
var upgradeLevelThreeScene = {
	cutsceneTime: 3,
	stringToDisplay: "Whoa Level 3? whaaaaa"
};
var gameOverScene = {
	cutsceneTime: 5,
	stringToDisplay: "Game Over"
};

//add background image for opening menu
function drawOpeningMenu() {
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorRect(canvas.width / 2 - 300, canvas.height / 2 - 50, 600, 160, "white");
	colorRect(canvas.width / 2 - 298, canvas.height / 2 - 48, 596, 156, "black");

	drawPixelfont("Chop-Cho, Ch-C", canvas.width / 3, canvas.height / 2);
	drawPixelfont("Get it?......Click to play", canvas.width / 3, canvas.height / 2 + 80);
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

let upgradeCheck = () => {
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

function playCutscene(data) {
	if (havingAMoment) {
		cutsceneDialogue(data.stringToDisplay);
		if (framesFromGameStart >= framesPerSecond * data.cutsceneTime) {		
			havingAMoment = false;
			wordsToShow = "";
			stringIndex = 0;
			currentScene = null;
			player.x = player.oldX;
			player.y = player.oldY;
		}
	}
}

function cutsceneDialogue (stringToDisplay) {
	var choppedUpString = stringToDisplay.split("");
	if (stringIndex < choppedUpString.length) {
		wordsToShow += choppedUpString[stringIndex];
		drawPixelfont(wordsToShow, canvas.width/4, canvas.height/6);
		stringIndex++; 
	} else {
		drawPixelfont(wordsToShow, canvas.width/4, canvas.height/6);
	}
}

let toggleDebug = () => {
	debug = !debug;
}
