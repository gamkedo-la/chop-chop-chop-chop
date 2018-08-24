const LEFT_ARROW_KEY = 37;
const UP_ARROW_KEY = 38;
const RIGHT_ARROW_KEY = 39;
const DOWN_ARROW_KEY = 40;

const A_KEY = 65;
const W_KEY = 87;
const D_KEY = 68;
const S_KEY = 83;

const P_KEY = 80;//for pause

const SPACEBAR = 32;

const NUMBER_PAD_PLUS = 107; // to raise overall audio volume
const NUMBER_PAD_MINUS = 109; // to lower overall audio volume

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
};

function keyHoldState(keyHeld, setTo) {
    keyHeld = setTo;
}

function windowOnBlur() {
    clearInterval(gameUpdate);
}

function windowOnFocus() {
    gameUpdate = setInterval(update, 1000 / framesPerSecond);
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
			player.chopTreesAroundPlayer();
			spacebarKeyHeld = true;
			break;
    case NUMBER_PAD_PLUS:
      increaseMasterVolume();
      break;
    case NUMBER_PAD_MINUS:
      decreaseMasterVolume();
      break;
    }
    case P_KEY:
      pauseGame();
      break;
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
			player.state.still = false;
            break;
	}
};
