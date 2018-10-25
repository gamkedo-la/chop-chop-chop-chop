var canvas;
var canvasContext;

const SCREEN_W = 800;
const SCREEN_H = 600;

var framesPerSecond = 30;
var framesFromGameStart = 0;

var player;

var debug = false;

var havingAMoment = false;
var savedAlpha = 0;

window.onload = function () {
	canvas = document.createElement("canvas");
	canvasContext = canvas.getContext("2d");

	document.body.appendChild(canvas);
	canvas.width = SCREEN_W;
	canvas.height = SCREEN_H;
	canvasContext.imageSmoothingEnabled = false;
	drawRect(0, 0, canvas.width, canvas.height, "black");
	colorText("Loading. . .", canvas.width / 2, canvas.height / 2, "white", "30px Courier New", "center");
	setupInput();
	loadImages();
	makeAnimatedSprites();
};

function loadingDoneSoStartGame() {
	console.log("All assets loaded! Starting update loop.");
	worldGrid = Array.from(allLevels[currentLevelIndex].layout);
	backgroundMusic.play();
	gameUpdate = setInterval(update, 1000 / framesPerSecond);
	resetCountdownTimer();
	countdownTimerPaused = true;
	player = new playerClass();
	objectList.push(player);
};

function update() {
	upgradeCheck();
    drawAll();
    if (worldEditor) {
        roomTileCoordinate();
  	}
    framesFromGameStart++;
	moveAll();
	if (framesFromGameStart % (framesPerSecond + 8) == 0) {
		updateCountdownTimer();
	}
	playCutscene(currentScene);
	if(player.checkNextLevelTrigger()) advanceLevel();
}

function drawAll() {
	if (openingMenuIsRunning || optionsMenu) {
		if (hitNewGame && pendingShakes == 0) {
			waitBuffer++
			if (waitBuffer < 35) {
				cameraPan();
				drawWorld();
				drawAnimatedTiles();
				if (optionsMenu) {
					drawOptionsMenu();
				} else {
					drawOpeningMenu();
				}
				drawAndRemoveAllObjects();
				drawParticles();
				endCameraPan();
			}
			if (waitBuffer >= 35 && waitBuffer < 85) {
				if (waitBuffer % 6 == 0) {
					savedAlpha += 0.07;
					if (savedAlpha >= 1) {
						savedAlpha = 1;
					}
					drawRect(0,0,1600,1600,"black", savedAlpha);
				}
				if (scrollingTextPaused) {
					toggleScrollTextPause();
				}
			} else if (waitBuffer >= 85) {
				canvasContext.globalAlpha = 1.0;
				scrollingText = true;
				if (drawScrollingText(introText)) {
					scrollingText = false;
					canvasContext.globalAlpha = 1.0;
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
					savedAlpha = 0;
				}
			}
		} else {
			if (creditsRunning) {
				drawCredits();
				return;
			}
			cameraPan();
			drawWorld();
			drawAnimatedTiles();
			if (optionsMenu) {
				drawOptionsMenu();
			} else {
				drawOpeningMenu();
			}
			drawAndRemoveAllObjects();
			drawParticles();
			endCameraPan();
		}
	} /*end of openingMenuIsRunning || optionsMenu*/ else if (gameIsRunning) {
		if (!havingAMoment && !endSequence) {
			// draw game scene
			cameraPan();
			drawWorld();
			drawAnimatedTiles();
			drawAllAnimals();
			drawAndRemoveAllObjects();
			drawParticles();
			endCameraPan();
			drawGUI();
		} else if (endSequence) {
			waitBuffer++;
			if (waitBuffer < 15) {
				cameraPan();
				drawWorld();
				drawAnimatedTiles();
				drawAllAnimals();
				drawAndRemoveAllObjects();
				drawParticles();
				endCameraPan();
				drawGUI();
			} else if (waitBuffer >= 15 && waitBuffer < 60) {
				if (waitBuffer % 6 == 0) {
					savedAlpha += 0.07;
					if (savedAlpha >= 1) {
						savedAlpha = 1;
					}	
					drawRect(0,0,1600,1600,"black", savedAlpha);
				}
				if (scrollingTextPaused) {
					toggleScrollTextPause();
				}
				if (waitBuffer == 59) {
					savedAlpha = 0;
				}
			} else if (waitBuffer >= 60 && waitBuffer < 122) {
				if (waitBuffer % 6 == 0) {
					savedAlpha += 0.07;
					if (savedAlpha >= 1) {
						savedAlpha = 1;
					}
					drawRect(0,0,1600,1600,"black",1);
					canvasContext.globalAlpha = savedAlpha;
					canvasContext.drawImage(gamePics["endScreen"],Math.round((canvas.width/2)-(gamePics["endScreen"].width/2)), 
											Math.round((canvas.height/2)-(gamePics["endScreen"].height/2))-20);
					canvasContext.globalAlpha = 1;	
				}
			} else if (waitBuffer >= 122 && waitBuffer < 392) {
				drawRect(0,0,1600,1600,"black", 1);
				canvasContext.drawImage(gamePics["endScreen"],Math.round((canvas.width/2)-(gamePics["endScreen"].width/2)), 
											Math.round((canvas.height/2)-(gamePics["endScreen"].height/2))-20);
				if (waitBuffer == 391) {
					savedAlpha = 0;
				}
			} else if (waitBuffer >= 392 && waitBuffer < 452) {
				if (waitBuffer % 6 == 0) {
					savedAlpha += 0.07;
					if (savedAlpha >= 1) {
						savedAlpha = 1;
					}	
					drawRect(0,0,1600,1600,"black", savedAlpha);
				}
			}

			if (waitBuffer >= 452) {
				countdownTimerPaused = true;
				if (drawScrollingText(outroText)) {
					openingMenuIsRunning = true;
					creditsRunning = true;
				}
			}
		} else {
			drawRect(0, 0, canvas.width, canvas.height, "black");
			player.x = Math.round(canvas.width / 2) - ((cutsceneAnimation.spriteSheet.width/cutsceneAnimation.animationColFrames)/2);
			player.y = Math.round(canvas.height / 2) - ((cutsceneAnimation.spriteSheet.height/cutsceneAnimation.animationRowFrames)/2);
			cutsceneAnimation.draw(player.x, player.y, 1, false);
			if (Math.random()>0.75) spawnParticles("grindstone_sparks", player.x-8, player.y-3);
			drawParticles();
		} //end of cut scene animations
	} //end of game is running
} //end of draw all

function moveAll() {
	if (!worldEditor && !havingAMoment) {
		objectList[0].move();
	}
	moveAllObjects();
	moveAllAnimals();
	moveParticles();
}