let openingMenuIsRunning = true;
let optionsMenu = false;
let gameIsRunning = false;
let gameIsPaused = false;

var titleScreenHitboxes = [];
var optionScreenHitBoxes = [];
var musicHitboxes = [];
var sfxHitboxes = [];
var hitTitle = false;
var hitNewGame = false;
var hitOptions = false;
var hitOptionsTitle = false;
var hitMusic = false;
var hitSFX = false;
var hitBack = false;
var hitMusicPlus = false;
var hitMusicMinus = false;
var hitSfxPlus = false;
var hitSfxMinus = false;
var pendingShakes = 0;
var waitBuffer = 0;
var newGameX = 800 / 2 - 25;

//add background image for opening menu
function drawOpeningMenu() {
	var titleX = canvas.width / 3 - 120;
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
		}
	}
    scrollText(testList);
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
	var musicX = canvas.width / 3 + 20;
	var sfxX = canvas.width / 3 + 35;
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
	if (hitMusic) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			musicX += xoffset;
			pendingShakes--;
		} else {
			hitMusic = false;
		}
	}

	drawPixelfont("Music: " + Math.trunc(Math.round(backgroundMusic.volume * 10)), musicX, canvas.height/2 - 20, 16, 16); 
	var musicHitbox = new colliderClass(musicX + ((measurePixelfont("Music: " + Math.trunc(Math.round(backgroundMusic.volume * 10))) * 1.39)/2),
				           /*Pixelfont Y + half hitbox height*/ canvas.height / 2 - 12, 
										measurePixelfont("Music: " + Math.trunc(Math.round(backgroundMusic.volume * 10))) * 1.39, 14,
										0,0);
	//musicHitbox.draw("blue");
	if (hitSFX) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			sfxX += xoffset;
			pendingShakes--;
		} else {
			hitSFX = false;
		}
	}

	drawPixelfont("SFX: " + Math.trunc(Math.round(chop1.volume * 10)), sfxX, canvas.height/2 + 40, 16, 16); 
	var sfxHitbox = new colliderClass(sfxX + ((measurePixelfont("SFX: " + Math.trunc(Math.round(chop1.volume * 10))) * 1.32)/2),
				           /*Pixelfont Y + half hitbox height*/ canvas.height /2 + 47, 
										measurePixelfont("SFX: " + Math.trunc(Math.round(chop1.volume * 10))) * 1.32, 15,
										0,0);
	//sfxHitbox.draw("blue");	
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

	drawPixelfont("back", backX, canvas.height - 150,13,13); 
	var backHitbox = new colliderClass(backX + measurePixelfont("back") * 1.25/2,
										canvas.height - 144 /*Pixelfont Y + half hitbox height*/, 
										measurePixelfont("back") * 1.25, 13,
										0,0);
	//backHitbox.draw("blue");
	optionScreenHitBoxes = [optionsTitleHitbox,musicHitbox,sfxHitbox,backHitbox];
	drawMusicAndSfxOptions();
	}

function drawMusicAndSfxOptions() {
	var b1MusicX = canvas.width / 3 + 150;
	var b2MusicX = canvas.width / 3 + 200;
	var b1SfxX = canvas.width / 3 + 150;
	var b2SfxX = canvas.width / 3 + 200;
	var xoffset = 0;

	if (hitMusicPlus) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			b1MusicX += xoffset;
			pendingShakes--;
		} else {
			increaseMusicVolume();
			hitMusicPlus = false;
		}
	}
	drawPixelfont("+", b1MusicX, canvas.height/2 - 18, 13, 13); 
	var musicB1Hitbox = new colliderClass(b1MusicX + ((measurePixelfont("+") * 1.15)/2),
					/*Pixelfont Y + half hitbox height*/    canvas.height / 2 - 12, 
										measurePixelfont("+") * 1.5, 16,
										0,0);
	//musicB1Hitbox.draw("blue");	

	if (hitMusicMinus) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			b2MusicX += xoffset;
			pendingShakes--;
		} else {
			decreaseMusicVolume();
			hitMusicMinus = false;
		}
	}
	drawPixelfont("-", b2MusicX, canvas.height/2 - 18, 13, 13); 
	var musicB2Hitbox = new colliderClass(b2MusicX + ((measurePixelfont("-") * 1.20)/2),
					/*Pixelfont Y + half hitbox height*/    canvas.height / 2 - 12, 
										measurePixelfont("-") * 1.5, 16,
										0,0);
	//musicB2Hitbox.draw("blue");
	musicHitboxes = [musicB1Hitbox,musicB2Hitbox];

	if (hitSfxPlus) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			b1SfxX += xoffset;
			pendingShakes--;
		} else {
			increaseSFXVolume();
			hitSfxPlus = false;
		}
	}
	drawPixelfont("+", b1SfxX, canvas.height/2 + 41, 13, 13); 
	var sfxB1Hitbox = new colliderClass(b1SfxX + ((measurePixelfont("+") * 1.15)/2),
					/*Pixelfont Y + half hitbox height*/    canvas.height / 2 + 47, 
										measurePixelfont("+") * 1.5, 16,
										0,0);
	//sfxB1Hitbox.draw("blue");	
	if (hitSfxMinus) {
		if (pendingShakes) { 
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			b2SfxX += xoffset;
			pendingShakes--;
		} else {
			decreaseSFXVolume();
			hitSfxMinus = false;
		}
	}
	drawPixelfont("-", b2SfxX, canvas.height/2 + 41, 13, 13); 
	var sfxB2Hitbox = new colliderClass(b2SfxX + ((measurePixelfont("-") * 1.20)/2),
					/*Pixelfont Y + half hitbox height*/    canvas.height / 2 + 47, 
										measurePixelfont("-") * 1.5, 16,
										0,0);
	//sfxB2Hitbox.draw("blue");
	sfxHitboxes = [sfxB1Hitbox,sfxB2Hitbox];
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
