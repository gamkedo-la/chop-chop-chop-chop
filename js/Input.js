const LEFT_ARROW_KEY = 37;
const UP_ARROW_KEY = 38;
const RIGHT_ARROW_KEY = 39;
const DOWN_ARROW_KEY = 40;

var leftKeyHeld = false;
var upKeyHeld = false;
var downKeyHeld = false;
var rightKeyHeld = false;
var moving = false;

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
            leftKeyHeld = true;
            break;
        case RIGHT_ARROW_KEY:
            rightKeyHeld = true;
            break;
        case UP_ARROW_KEY:
            upKeyHeld = true;
            break;
        case DOWN_ARROW_KEY:
            downKeyHeld = true;
        break;
    }
};

function keyReleased(evt) {
    switch (evt.keyCode) {
        case LEFT_ARROW_KEY:
            leftKeyHeld = false;
            break;
        case RIGHT_ARROW_KEY:
            rightKeyHeld = false;
            break;
        case UP_ARROW_KEY:
            upKeyHeld = false;
            break;
        case DOWN_ARROW_KEY:
            downKeyHeld = false;
            break;
  }
};