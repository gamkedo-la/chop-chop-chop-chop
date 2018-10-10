const LEFT_ARROW_KEY = 37;
const UP_ARROW_KEY = 38;
const RIGHT_ARROW_KEY = 39;
const DOWN_ARROW_KEY = 40;
const A_KEY = 65;
const W_KEY = 87;
const D_KEY = 68;
const S_KEY = 83;

const ZERO_KEY = 48;
const ONE_KEY = 49;
const TWO_KEY = 50;
const THREE_KEY = 51;
const FOUR_KEY = 52;
const FIVE_KEY = 53;
const SIX_KEY = 54;
const SEVEN_KEY = 55;
const EIGHT_KEY = 56;
const NINE_KEY = 57;

const O_KEY = 79; // for debug
const P_KEY = 80; // for pause

const KEY_TILDE = 192; // Access World Editor
const X_KEY = 88; // for increasing currentSetIndex in World Editor
const Z_KEY = 90; // for decreasing currentSetIndex in World Editor

const KEY_LEFT_SHIFT = 16; 
const SPACEBAR = 32;
const NUMBER_PAD_PLUS = 107; // to raise overall audio volume
const NUMBER_PAD_MINUS = 109; // to lower overall audio volume
const KEY_PLUS = 187; // to raise Music volume
const KEY_MINUS = 189; // to lower Music volume
const KEY_RIGHT_BRACKET = 221; // to raise SFX volume
const KEY_LEFT_BRACKET = 219; // to lower SFX volume

var mouseX = 0;
var mouseY = 0;
var mouseCanvasY = 0;
var mouseCanvasX = 0;
var continuousClick;

var leftKeyHeld = false;
var upKeyHeld = false;
var downKeyHeld = false;
var rightKeyHeld = false;
var spacebarKeyHeld = false;
var numberPadPlusHeld = false;
var numberPadMinusHeld = false;

function setupInput() {
    window.addEventListener("blur", windowOnBlur);
    window.addEventListener("focus", windowOnFocus);
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
   	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('mousedown',function() {
		continuousClick = setInterval(editTileOnMouseClick, 1);
	});
	canvas.addEventListener('mouseup',function() {
		clearInterval(continuousClick);
	});
	canvas.addEventListener('mouseout',function() {
		clearInterval(continuousClick);
	});
};

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left;
	mouseY = evt.clientY - rect.top;
	if (mouseX > canvas.width || mouseY > canvas.height) {
		clearInterval(continuousClick);
	}
	mouseCanvasX = mouseX + cameraPanX;
	mouseCanvasY = mouseY + cameraPanY;
}

function keyHoldState(keyHeld, setTo) {
    keyHeld = setTo;
}

function windowOnBlur() {
	clearInterval(gameUpdate);
	clearInterval(continuousClick);
	gameUpdate = null;
}

function windowOnFocus() {
	if (!gameUpdate) { // don't run this if we already started
		gameUpdate = setInterval(update, 1000 / framesPerSecond);
	} else {
		console.log("Avoiding a double update loop timer.");
	}
}

function keyPressed(evt) {
    switch (evt.keyCode) {
        case LEFT_ARROW_KEY:
        case A_KEY:
			leftKeyHeld = true;
			break;
		case RIGHT_ARROW_KEY:
		case D_KEY:
            rightKeyHeld = true;
			break;
		case UP_ARROW_KEY:
		case W_KEY:
			upKeyHeld = true;
			break;
		case DOWN_ARROW_KEY:
		case S_KEY:
			downKeyHeld = true;
			break;
		case SPACEBAR:
			spacebarKeyHeld = true;
            pauseScrollText = !pauseScrollText;
            toggleScrollText();
			break;
		case NUMBER_PAD_PLUS:
		case KEY_PLUS:
			increaseMusicVolume();
			break;
		case NUMBER_PAD_MINUS:
		case KEY_MINUS:
			decreaseMusicVolume();
			break;
		case KEY_RIGHT_BRACKET:
			increaseSFXVolume();
			break;
		case KEY_LEFT_BRACKET:
			decreaseSFXVolume();
			break;
		case P_KEY:
			togglePauseGame();
			break;
		case O_KEY:
			toggleDebug();
		break;
		case KEY_TILDE:
			worldEditor = !worldEditor;
			if (worldEditor) {
				countdownTimerPaused = true;
				console.log("worldEditor ON!");
				console.log("Please select a set of tiles using:" + "\n"
   				+ "0 for nothing" + "\n"
   				+ "1 for ground tiles" + "\n"
   				+ "2 for tree tiles" + "\n"
   				+ "3 for cliff tiles" + "\n"
   				+ "4 for water tiles" + "\n"
   				+ "5 for water tiles" + "\n"
   				+ "8 for animal tiles" + "\n");
			}
			if (!worldEditor) {
				countdownTimerPaused = false;
				worldGrid = [];
				animalList = [];
				objectList = [];
				animatedTileSet = [];
				worldGrid = Array.from(allLevels[currentLevelIndex].layout);
				drawWorld();
				player.invincible = false;
				console.log("worldEditor OFF...");
			}
		break;
		case X_KEY:
			if (worldEditor) {
				currentSetIndex++;
				if (worldPics[currentlySelectedSet[currentSetIndex]] == undefined) {
					currentSetIndex = 0;
				}
			}
            
            if (!pauseScrollText) {
                scrollSpeed = -10;
            }
		break;
		case Z_KEY:
			if (worldEditor) {
				currentSetIndex--;
				if (currentSetIndex < 0) {
					for (var i = 100; i > -1; i--) {
						if (worldPics[currentlySelectedSet[i]] == undefined) {
							continue;
						} else {
							currentSetIndex = i;
							break;
						}
					}
				}
			} 
            
            if (!pauseScrollText) {
                scrollSpeed = 10; 
            }
		break;
		case KEY_LEFT_SHIFT:
			copyToClipboard();
		break;
		case ZERO_KEY:
			if (worldEditor) {
				pickASet(nothingSet);
				console.log("Nothing tile selected");
			}
		break;
		case ONE_KEY:
			if (worldEditor) {
				pickASet(groundSet);
				console.log("groundSet selected");
			}
		break;
		case TWO_KEY:
			if (worldEditor) {
				pickASet(treeSet);
				console.log("treeSet selected");
			}
		break;
		case THREE_KEY:
			if (worldEditor) {
				pickASet(cliffSet);
				console.log("cliffSet selected");
			}
		break;
		case FOUR_KEY:
			if (worldEditor) {
				pickASet(waterSet);
				console.log("waterSet selected");
			}
		break;
		case FIVE_KEY:
			if (worldEditor) {
				pickASet(pathSet);
				console.log("pathSet selected");
			}
		break;
		case SEVEN_KEY:
			if (worldEditor) {
				pickASet(moonSet);
				console.log("moonSet selected");
			}
		break;
		case EIGHT_KEY:
			if (worldEditor) {
				pickASet(animalSet);
				console.log("animalSet selected");
			}
		break;
    }
};

function keyReleased(evt) {
    switch (evt.keyCode) {
        case LEFT_ARROW_KEY:
        case A_KEY:
            leftKeyHeld = false;
            break;
        case RIGHT_ARROW_KEY:
		case D_KEY:
            rightKeyHeld = false;
            break;
        case UP_ARROW_KEY:
		case W_KEY:
            upKeyHeld = false;
            break;
        case DOWN_ARROW_KEY:
		case S_KEY:
            downKeyHeld = false;
        case SPACEBAR:
			spacebarKeyHeld = false;
            break;
        case Z_KEY:
            if (!pauseScrollText) {
               scrollSpeed = 2; 
            }
            break;
        case X_KEY:
             if (!pauseScrollText) {
                scrollSpeed = 2;
            }
            break;
	}
};
