let openingMenuIsRunning = true;
let optionsMenu = false;
let gameIsRunning = false;
let gameIsPaused = false;

var titleScreenHitboxes = [];
var optionScreenHitBoxes = [];
var hitTitle = false;
var hitNewGame = false;
var hitOptions = false;
var hitOptionsTitle = false;
var hitBack = false;
var pendingShakes = 0;
var waitBuffer = 0;

//add background image for opening menu
function drawOpeningMenu() {
	var titleX = canvas.width / 3 - 120;
	var newGameX = canvas.width / 2 - 25;
	var optionsX = canvas.width / 2 - 24;
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
	//titleHitbox.draw("blue");
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
	drawPixelfont("New Game", newGameX, canvas.height / 2 + 40,16,16);
	var newGameHitbox = new colliderClass(newGameX + ((measurePixelfont("New Game") * 1.38)/2),
										canvas.height / 2 + 47, 
										measurePixelfont("New Game") * 1.38, 14,
										0,0);
	//newGameHitbox.draw("blue");
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
	drawPixelfont("Options", optionsX, canvas.height / 2 + 80,16,16);
	var optionsHitbox = new colliderClass(optionsX + ((measurePixelfont("Options") * 1.47)/2),
										canvas.height / 2 + 87, 
										measurePixelfont("Options") * 1.47, 14,
										0,0);
	//optionsHitbox.draw("blue");
	titleScreenHitboxes = [titleHitbox,newGameHitbox,optionsHitbox];
}

function drawOptionsMenu() {
	var optionsTitleX = canvas.width / 3 + 35;
	var backX = canvas.width / 3 + 100
	var xoffset = 0;
	if (hitOptionsTitle) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			optionsTitleX += xoffset;
			pendingShakes--;
		} else {
			hitOptionsTitle = false;
		}
	}
	drawPixelfont("Options", optionsTitleX, canvas.height / 2 - 75, 30, 30); 
	var optionsTitleHitbox = new colliderClass(optionsTitleX + ((measurePixelfont("Options") * 2.87)/2),
										canvas.height / 2 - 59 /*Pixelfont Y + half hitbox height*/, 
										measurePixelfont("Options") * 2.87, 32,
										0,0);
	//optionsTitleHitbox.draw("blue");
	if (hitBack) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			backX += xoffset;
			pendingShakes--;
		} else {
			waitBuffer++
			if (waitBuffer >= 10) {
			openingMenuIsRunning = true;
			optionsMenu = false;
			hitBack = false;
			waitBuffer = 0;
			}
		}
	}
	drawPixelfont("back", backX, canvas.height - 150); 
	var backHitbox = new colliderClass(backX + measurePixelfont("back")/2,
										canvas.height - 145 /*Pixelfont Y + half hitbox height*/, 
										measurePixelfont("back"), 10,
										0,0);
	backHitbox.draw("blue");
	optionScreenHitBoxes = [optionsTitleHitbox,backHitbox];
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
