var canvas;
var canvasContext;

const SCREEN_W = 800;
const SCREEN_H = 600;

var framesPerSecond = 30;
var framesFromGameStart = 0;

var player;

var debug = false;

var havingAMoment = false;

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
	if(checkNextLevelTrigger()) advanceLevel();
}

function drawAll() {
	if (openingMenuIsRunning || optionsMenu) {
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
