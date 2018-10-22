let openingMenuIsRunning = true;
let optionsMenu = false;
let gameIsRunning = false;
let creditsRunning = false;
let gameIsPaused = false;
let endSequence = false;

var titleScreenHitboxes = [];
var optionScreenHitBoxes = [];
var musicHitboxes = [];
var sfxHitboxes = [];
var hitTitle = false;
var hitNewGame = false;
var hitOptions = false;
var hitCredits = false;

var hitOptionsTitle = false;
var hitMusic = false;
var hitSFX = false;
var hitSoundTest = false;
var hitMusicTest = false;
var hitBack = false;

var hitMusicPlus = false;
var hitMusicMinus = false;
var hitSfxPlus = false;
var hitSfxMinus = false;

var pendingShakes = 0;
var waitBuffer = 0;
var currentTestSoundIndex = -1;
var currentTestMusicIndex = 0;

//add background image for opening menu
function drawOpeningMenu() {
	var titleX = canvas.width / 3 - 120;
	var newGameX = canvas.width / 2 - 25;
	var optionsX = canvas.width / 2 - 24;
	var creditsX = canvas.width / 2 - 25;
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
	//drawPixelfont("Chop  Chop,Chop-Chop!", titleX, canvas.height / 2 - 20, 30, 30);
	canvasContext.drawImage(gamePics["logo"],Math.round((canvas.width/2)-(gamePics["logo"].width/2)), Math.round((canvas.height/2)-(gamePics["logo"].height/2))-20);

	var titleHitbox = new colliderClass(canvas.width/2,canvas.height / 2 - 6,
					    measurePixelfont("Chop  Chop,Chop-Chop!") * 2.40, 35,
					    0,0);

	if (hitNewGame) {
		if (pendingShakes) {
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			newGameX += xoffset;
			pendingShakes--;
		} else {
			if (scrollingTextPaused) {
				toggleScrollTextPause();
			}
		}
	}
	drawPixelfont("New Game", newGameX, canvas.height / 2 + 40,16,16);
	var newGameHitbox = new colliderClass(newGameX + ((measurePixelfont("New Game") * 1.38)/2),
										canvas.height / 2 + 47,
										measurePixelfont("New Game") * 1.38, 14,
										0,0);
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
	if (hitCredits) {
		if (pendingShakes) {
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			creditsX += xoffset;
			pendingShakes--;
		} else {
			if (scrollingTextPaused) {
				toggleScrollTextPause();
			}
			scrollingText = true;
			creditsRunning = true;
			hitCredits = false;
		}
	}
	drawPixelfont("Credits", creditsX, canvas.height / 2 + 120,16,16);
	var creditsHitbox = new colliderClass(creditsX + ((measurePixelfont("Credits") * 1.5)/2),
										canvas.height / 2 + 128,
										measurePixelfont("Credits") * 1.5, 16,
										0,0);
	titleScreenHitboxes = [titleHitbox,newGameHitbox,optionsHitbox,creditsHitbox];
	if (debug) {
		titleHitbox.draw("blue");
		newGameHitbox.draw("blue");
		optionsHitbox.draw("blue");
		creditsHitbox.draw("blue");
	}
}

function drawOptionsMenu() {
	var optionsTitleX = canvas.width / 3 + 35;
	var musicX = canvas.width / 3 + 20;
	var sfxX = canvas.width / 3 + 35;
	var soundTestX = canvas.width / 3 + 35;
	var musicTestX = canvas.width / 3 + 35;
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
	if (hitSFX) {
		if (pendingShakes) {
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			sfxX += xoffset;
			pendingShakes--;
		} else {
			hitSFX = false;
		}
	}

	drawPixelfont("SFX: " + Math.trunc(Math.round(chop1.volume * 10)), sfxX, canvas.height/2 + 20, 16, 16);
	var sfxHitbox = new colliderClass(sfxX + ((measurePixelfont("SFX: " + Math.trunc(Math.round(chop1.volume * 10))) * 1.32)/2),
				           /*Pixelfont Y + half hitbox height*/ canvas.height /2 + 27,
										measurePixelfont("SFX: " + Math.trunc(Math.round(chop1.volume * 10))) * 1.32, 15,
										0,0);

	if (hitSoundTest) {
		if (pendingShakes) {
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			soundTestX += xoffset;
			pendingShakes--;
		} else {
			currentTestSoundIndex++;
			if (currentTestSoundIndex == arrayOfSFXs.length - 1) {
				arrayOfSFXs[currentTestSoundIndex - 1].pause();
				arrayOfSFXs[currentTestSoundIndex].play();
				currentTestSoundIndex = -1;
			} else {
				if (currentTestSoundIndex > 0) {
					arrayOfSFXs[currentTestSoundIndex - 1].pause();
				}
				arrayOfSFXs[currentTestSoundIndex].play();
			}
			hitSoundTest = false;
		}
	}

	drawPixelfont("sound  test: " + (currentTestSoundIndex + 1), soundTestX, canvas.height/2 + 60, 16, 16);
	var soundTestHitbox = new colliderClass(soundTestX + ((measurePixelfont("sound  test: " + (currentTestSoundIndex + 1)) * 1.32)/2),
				           				canvas.height/2 + 60 + (14/2),
										measurePixelfont("sound  test: " + (currentTestSoundIndex + 1)) * 1.32, 15,
										0,0);

	if (hitMusicTest) {
		if (pendingShakes) {
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			musicTestX += xoffset;
			pendingShakes--;
		} else {
			currentTestMusicIndex++;
			backgroundMusic.pause();
			if (currentTestMusicIndex >= 5) {
				currentTestMusicIndex = 0;
			}
			if (currentTestMusicIndex == 0) {
				backgroundMusic.src = "music/ChopChopMenu_V1" + sourceExtension;
			}
			if (currentTestMusicIndex == 1) {
				backgroundMusic.src = "music/ChopChopForestV1" + sourceExtension;
			}
			if (currentTestMusicIndex == 2) {
				backgroundMusic.src = "music/animal_chase_v3" + sourceExtension;
			}
			if (currentTestMusicIndex == 3) {
				backgroundMusic.src = "music/ChopChop-GameOverLoop_v1" + sourceExtension;
			}
			if (currentTestMusicIndex == 4) {
				backgroundMusic.src = "music/dark_side_of_the_chop" + sourceExtension;
			}
			backgroundMusic.play();
			hitMusicTest = false;
		}
	}

	drawPixelfont("music  test: " + currentTestMusicIndex, musicTestX, canvas.height/2 + 80, 16, 16);
	var musicTestHitbox = new colliderClass(musicTestX + ((measurePixelfont("music  test: " + currentTestMusicIndex) * 1.32)/2),
				           				canvas.height/2 + 80 + (14/2),
										measurePixelfont("music  test: " + currentTestMusicIndex) * 1.32, 15,
										0,0);

	if (hitBack) {
		if (pendingShakes) {
			xoffset = Math.sin(pendingShakes / (HIT_SHAKE_SPEED * 10)) * (HIT_SHAKE_SIZE * 2);
			backX += xoffset;
			pendingShakes--;
		} else {
			waitBuffer++
			if (waitBuffer >= 10) {
				if (currentTestMusicIndex == 4) {
					objectList = [];
					objectList.push(player);
					animatedTileList = [];
					worldGrid = moonMainMenu;
				}
				hitBack = false;
				optionsMenu = false;
				openingMenuIsRunning = true;
				waitBuffer = 0;	
				currentTestSoundIndex = -1;
				currentTestMusicIndex = 0; 
			}
		}
	}

	drawPixelfont("back", backX, canvas.height - 150,13,13);
	var backHitbox = new colliderClass(backX + measurePixelfont("back") * 1.25/2,
										canvas.height - 144 /*Pixelfont Y + half hitbox height*/,
										measurePixelfont("back") * 1.25, 13,
										0,0);
	
	optionScreenHitBoxes = [optionsTitleHitbox,musicHitbox,sfxHitbox,
							soundTestHitbox,musicTestHitbox,backHitbox];
	drawMusicAndSfxOptions();

	if (debug) {
		optionsTitleHitbox.draw("blue");
		musicHitbox.draw("blue");
		sfxHitbox.draw("blue");
		soundTestHitbox.draw("blue");
		musicTestHitbox.draw("blue");
		backHitbox.draw("blue");
	}
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
	var musicPlusHitbox = new colliderClass(b1MusicX + ((measurePixelfont("+") * 1.15)/2),
					/*Pixelfont Y + half hitbox height*/    canvas.height / 2 - 12,
										measurePixelfont("+") * 1.5, 16,
										0,0);

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
	var musicMinusHitbox = new colliderClass(b2MusicX + ((measurePixelfont("-") * 1.20)/2),
					/*Pixelfont Y + half hitbox height*/    canvas.height / 2 - 12,
										measurePixelfont("-") * 1.5, 16,
										0,0);
	musicHitboxes = [musicPlusHitbox,musicMinusHitbox];

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
	drawPixelfont("+", b1SfxX, canvas.height/2 + 21, 13, 13);
	var sfxPlusHitbox = new colliderClass(b1SfxX + ((measurePixelfont("+") * 1.15)/2),
					/*Pixelfont Y + half hitbox height*/    canvas.height / 2 + 27,
										measurePixelfont("+") * 1.5, 16,
										0,0);
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
	drawPixelfont("-", b2SfxX, canvas.height/2 + 21, 13, 13);
	var sfxMinusHitbox = new colliderClass(b2SfxX + ((measurePixelfont("-") * 1.20)/2),
					/*Pixelfont Y + half hitbox height*/    canvas.height / 2 + 27,
										measurePixelfont("-") * 1.5, 16,
										0,0);
	sfxHitboxes = [sfxPlusHitbox,sfxMinusHitbox];
	if (debug) {
		musicPlusHitbox.draw("blue");
		musicMinusHitbox.draw("blue");
		sfxPlusHitbox.draw("blue");
		sfxMinusHitbox.draw("blue");
	}
}

function drawCredits() {
	drawRect(0,0,canvas.width,canvas.height, "black");
	if (drawScrollingText(creditsText)) {
		scrollingText = false;
		creditsRunning = false;
		endSequence = false;
		if (allLevels[currentLevelIndex].name == "Moon") {
			resetGame(0);
		}
	}
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

let resetGame = (levelIndex) => {
	wordsToShow = "";
	stringIndex = 0;
	cutsceneDialogueIndex = 0;
	currentScene = null;
	needNewString = false;
	cutsceneSound.pause();
	cutsceneSound.currentTime = 0;
	currentLevelIndex = levelIndex;
	worldGrid = Array.from(allLevels[currentLevelIndex].layout);
	worldCols = allLevels[currentLevelIndex].columns;
	worldRows = allLevels[currentLevelIndex].rows;
	animalList = [];
	objectList = [];
	objectList.push(player);
	particleList = [];
	animatedTileList = [];
	backgroundMusic.pause();
	if (allLevels[currentLevelIndex].name == "Main Menu") { 
		backgroundMusic.src = "music/ChopChopMenu_V1" + sourceExtension;
		player.direction = EAST;
		openingMenuIsRunning = true;
		gameIsRunning = false;
		player.axeLevel = LOW;
		player.swingCount = 0;
		player.stepCount = 0;
		player.treeCount = 0;
		player.attackCount = 0;
		player.chopCount = 0;
		upgradeLevelTwo = false;
		upgradeLevelThree = false;
		waitBuffer = 0;
		countdownTimerPaused = true;
	} else if (allLevels[currentLevelIndex].name == "Moon") {
		backgroundMusic.src = "music/dark_side_of_the_chop" + sourceExtension;
		countdownTimerPaused = false;
	} else { // all other levels
		backgroundMusic.src = "music/ChopChopForestV1" + sourceExtension;
		countdownTimerPaused = false;
	}
	backgroundMusic.volume = volumeDefault; // found in Audio.js
	backgroundMusic.play();
	resetCountdownTimer();
	var levelStartPosition = indexToCenteredXY(allLevels[currentLevelIndex].playerStartArrayIndex);
	player.x = levelStartPosition.x;
	player.y = levelStartPosition.y;
	player.currentFrustration = 0; 
	player.invincible = false;
	spacebarKeyHeld = false;
	player.chopTimer = 0;
	scroll = 0;
	savedAlpha = 0;
	havingAMoment = false;
	scrollingTextSkipped = false;
}

let toggleDebug = () => {
	debug = !debug;
}
