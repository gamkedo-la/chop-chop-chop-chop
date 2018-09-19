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
	drawRect(0, 0, canvas.width, canvas.height, "blue");
	colorText("Loading. . .", canvas.width / 2, canvas.height / 2, "white", "30px Courier New", "center");
	setupInput();
	loadImages();
	makeAnimatedSprites();
};

function loadingDoneSoStartGame() {
	console.log("All assets loaded! Starting update loop.");
	canvas.onclick = function() {
	    if (openingMenuIsRunning) {
			countdownTimerPaused = false;
	    	openingMenuIsRunning = false;
	    	gameIsRunning = true;
				backgroundMusic.pause();
				backgroundMusic.src = "music/ChopChopForestV1" + sourceExtension;
				backgroundMusic.play();
	    }
	}
	gameUpdate = setInterval(update, 1000 / framesPerSecond);
	resetCountdownTimer();
	player = new playerClass();
	//backgroundMusic.play();
};

/*function startGame() {

}*/

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
	if (openingMenuIsRunning) {
		drawOpeningMenu();
	} else if (gameIsRunning) {
		if (!havingAMoment) {
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
			player.draw();
			player.x = canvas.width / 2;
			player.y = canvas.height / 2;
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
