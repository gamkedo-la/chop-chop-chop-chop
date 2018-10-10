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

var step = 0;

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
    initScroll();
};

function loadingDoneSoStartGame() {
	console.log("All assets loaded! Starting update loop.");
	worldGrid = Array.from(allLevels[currentLevelIndex].layout);
	backgroundMusic.play();
	gameUpdate = setInterval(update, 1000 / framesPerSecond);
	resetCountdownTimer();
	player = new playerClass();
};

function update() {
	upgradeCheck();
    drawAll();
    if (worldEditor) {
        roomTileCoordinate();
  	}
    framesFromGameStart++
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
				//} else if (creditsMenu) {
					// drawCreditsMenu():
				}else {
					drawOpeningMenu();
				}
				drawAndRemoveAllObjects();
				player.draw();
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
			} else if (waitBuffer >= 85) {
				// TODO: Intro?
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
			}
		} else {
			cameraPan();
			drawWorld();
			drawAnimatedTiles();
			if (optionsMenu) {
				drawOptionsMenu();
			//} else if (creditsMenu) {
				// drawCreditsMenu():
			} else {
				drawOpeningMenu();
			}
			drawAndRemoveAllObjects();
			player.draw();
			drawParticles();
			endCameraPan();
		}
	} else if (gameIsRunning) {
		if (!havingAMoment) {
			// draw game scene
			cameraPan();
			drawWorld();
			drawAnimatedTiles();
			drawAndRemoveAllObjects();
			drawAllAnimals();
			if (!worldEditor) {
				player.draw();
			}
			drawParticles();
			endCameraPan();
			drawGUI();
		} else {
			drawRect(0, 0, canvas.width, canvas.height, "black");
			player.x = Math.round(canvas.width / 2) - ((cutsceneAnimation.spriteSheet.width/cutsceneAnimation.animationColFrames)/2);
			player.y = Math.round(canvas.height / 2) - ((cutsceneAnimation.spriteSheet.height/cutsceneAnimation.animationRowFrames)/2);
			cutsceneAnimation.draw(player.x, player.y, 1, false);
			if (Math.random()>0.75) spawnParticles("grindstone_sparks", player.x-8, player.y-3);
			drawParticles();
		}
	}
}

function moveAll() {
	if (!worldEditor && !havingAMoment) {
		player.move();
	}
	moveAllAnimals();
	moveParticles();
}

let toggleDebug = () => {
	debug = !debug;
}

function initScroll() {
    canvasContext.fillStyle = "white";
    canvasContext.font = "20pt Verdana";
    canvasContext.textAlign = "center";
    step = 0;
}
 
function scrollText(enterText, speed) {
    step -= 2;
    canvasContext.clearRect(0, 0, canvasContext.measureText(enterText), canvasContext.measureText(enterText));
    canvasContext.save();
    canvasContext.translate(canvas.width / 2, step);
    canvasContext.fillText(enterText, 0, canvas.height);
    canvasContext.restore();     
    
}