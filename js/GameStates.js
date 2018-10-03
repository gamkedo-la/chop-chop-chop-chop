let openingMenuIsRunning = true;
let optionsMenu = false;
let gameIsRunning = false;
let gameIsPaused = false;

var titleScreenHitboxes = [];
var optionScreenHitBoxes = [];
var hitTitle = false;
var hitNewGame = false;
var hitOptions = false;
var titleX = 800 / 3 - 120;
var newGameX = 800 / 2;
var optionsX = 800 / 2;
var pendingShakes = 0;
var waitBuffer = 0;

//add background image for opening menu
function drawOpeningMenu() {
	var xoffset = 0;
	if (hitTitle) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			titleX += xoffset;
			pendingShakes--;
		} else {
			hitTitle = false;
		}
	}
	drawPixelfont("Chop  Chop,Chop-Chop!", titleX, canvas.height / 2 - 20, 30, 30); 
	var titleHitbox = new colliderClass(canvas.width/2 + 25,
										canvas.height / 2 - 4, 
										measurePixelfont("Chop  Chop,Chop-Chop!") * 2.65, 32,
										0,0);
	titleHitbox.draw("blue");
	if (hitNewGame) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			newGameX += xoffset;
			pendingShakes--;
		} else {
			waitBuffer++
			if (waitBuffer >= 10) {
			// TODO: Transition? Intro?
			countdownTimerPaused = false;
			openingMenuIsRunning = false; 
			gameIsRunning = true;
			advanceLevel();
			backgroundMusic.pause();
			backgroundMusic.src = "music/ChopChopForestV1" + sourceExtension;
			backgroundMusic.volume = 0.4;
			backgroundMusic.play();
			hitNewGame = false;
			waitBuffer = 0;
			}
		}
	}
	drawPixelfontCentered("New Game", newGameX, canvas.height / 2 + 40);
	var newGameHitbox = new colliderClass(canvas.width/2 - 4,
										canvas.height / 2 + 45, 
										measurePixelfont("New Game") - 2, 10,
										0,0);
	newGameHitbox.draw("blue");
	if (hitOptions) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			optionsX += xoffset;
			pendingShakes--;
		} else {
			waitBuffer++
			if (waitBuffer >= 10) {
			openingMenuIsRunning = false;
			optionsMenu = true;
			hitOptions = false;
			waitBuffer = 0;
			}
		}
	}
	drawPixelfontCentered("Options", optionsX, canvas.height / 2 + 80);
	var optionsHitbox = new colliderClass(canvas.width/2 - 4,
										canvas.height / 2 + 85, 
										measurePixelfont("Options") - 2, 10,
										0,0);
	optionsHitbox.draw("blue");
	titleScreenHitboxes = [titleHitbox,newGameHitbox,optionsHitbox];
}

function drawOptionsMenu() {
	var xoffset = 0;
	if (hitTitle) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			titleX += xoffset;
			pendingShakes--;
		} else {
			hitTitle = false;
		}
	}
	drawPixelfont("Options", titleX, canvas.height / 2 - 20, 30, 30); 
	var optionsTitleHitbox = new colliderClass(canvas.width/2 + 25,
										canvas.height / 2 - 4, 
										measurePixelfont("Options") * 2.65, 32,
										0,0);
	optionsTitleHitbox.draw("blue");
	optionScreenHitBoxes = [optionsTitleHitbox];
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

	drawPixelfontCentered("Game Paused", canvas.width / 2 - 10, canvas.height / 2,16,16);
	drawPixelfontCentered("Press 'P' to Resume Play", canvas.width / 2 - 20, canvas.height / 2 + 60,16,16);
}

let togglePauseGame = () => {
	if (!gameIsPaused) {
		gameIsPaused = true;
		countdownTimerPaused = true;
		windowOnBlur();
		drawPauseScreen();
	} else {
		gameIsPaused = false;
		countdownTimerPaused = false
		windowOnFocus();
	}
}


let resetGame = () => {
	
}
