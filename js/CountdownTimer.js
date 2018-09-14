// countdown timer as seen on the GUI
const GAME_COUNTDOWN_LENGTH = 5000;

var countdownTimeRemaining = GAME_COUNTDOWN_LENGTH;

function resetCountdownTimer() {
    console.log("resetTimer() countdownTimeRemaining:" + GAME_COUNTDOWN_LENGTH);
    countdownTimeRemaining = GAME_COUNTDOWN_LENGTH;
}

function updateCountdownTimer(dt=1) {
    //console.log("updateTimer");
    countdownTimeRemaining -= dt;
    if (countdownTimeRemaining <= 0) {
        onTimerComplete();
    }
}

function onTimerComplete() {
	prepareCutscene(gameOverScene);
    console.log("onTimerComplete - // TODO - GAME OVER!");
}