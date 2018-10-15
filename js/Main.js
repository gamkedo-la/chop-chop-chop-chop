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

var scroll = 0;
var scrollSpeed = 2;
var pixelsSkipPerLine = 45;
var scrollingTextPaused = false;
var scrollingTextSkipped = false;
var introText = ["chop-chop, intrepid  lumberjack, has  decided", "to  make  it  their  mission", "to  chop  down  every  tree",  "far  and  wide",
				"", "to  see  if  it  can  really  be  done","and  to  know  what  it  feels  like","when  you  do"];

var outroText = ["Wow!", "Look at all I've chopped.", "But now all the beautiful trees are missing.", "And no one else can have fun chopping...",
"Time to plant-plant, plant-plant", "Coming soon... maybe" ];

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
	objectList.push(player);
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
				drawRect(0,0,1600,1600,"black");
				if (drawScrollingText(introText)) {
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
					scroll = 0;
				}
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
			drawParticles();
			endCameraPan();
		}
	} /*end of openingMenuIsRunning || optionsMenu*/ else if (gameIsRunning) {
		if (!havingAMoment) {
			// draw game scene
			cameraPan();
			drawWorld();
			drawAnimatedTiles();
			drawAllAnimals();
			drawAndRemoveAllObjects();
			drawParticles();
			endCameraPan();
			drawGUI();
			if (endSequence) {
				drawRect(0,0, canvas.width,canvas.height, "black");
				waitBuffer += 2;
				if (waitBuffer < 200) {
					canvasContext.globalAlpha = waitBuffer/250;
				}
				drawScrollingText(outroText);
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

let toggleDebug = () => {
	debug = !debug;
}

function toggleScrollTextPause() {
    scrollingTextPaused = !scrollingTextPaused;
   if (scrollingTextPaused) {
        scrollSpeed = 0;
    } else {
        scrollSpeed = 2;
    }
}

function drawScrollingText(textList) {
    var scrollTextX = -55;
    var bufferSpace = 64;
    scroll -= scrollSpeed;
    canvasContext.save();
    canvasContext.translate(canvas.width / 2, scroll);
    for(var i = 0; i < textList.length; i++) {
        drawPixelfontCentered(textList[i], scrollTextX, canvas.height + i * pixelsSkipPerLine, 16, 16);
        if (i == textList.length-1) {
    		if (scroll < (canvas.height + ((i * -pixelsSkipPerLine) - bufferSpace))) {
    			canvasContext.restore();
    			drawRect(0, canvas.height - canvas.height/16, canvas.width, canvas.height/16, "black");
    			drawPixelfont("-W-  fast forward   -S-  rewind   -Space-  pause   -X-  skip", 32, canvas.height - canvas.height/20, 12,12);
    			return true;
    		} else if (scrollingTextSkipped) {
    			canvasContext.restore();
    			drawRect(0, canvas.height - canvas.height/16, canvas.width, canvas.height/16, "black");
    			drawPixelfont("-W-  fast forward   -S-  rewind   -Space-  pause   -X-  skip", 32, canvas.height - canvas.height/20, 12,12);
    			return true;
    		}
    	}
    }
    canvasContext.restore();
 	drawRect(0, canvas.height - canvas.height/16, canvas.width, canvas.height/16, "black");
    drawPixelfont("-W-  fast forward   -S-  rewind   -Space-  pause   -X-  skip", 32, canvas.height - canvas.height/20, 12,12);
}

function rewindScrollText() {
    if (!scrollingTextPaused) {
        scrollSpeed = -5;
    }
}

function fastForwardScrollText() {
    if (!scrollingTextPaused) {
        scrollSpeed = 7;
    }
}

function resetScrollSpeed() {
    if (!scrollingTextPaused) {
        scrollSpeed = 2;
    }
}
