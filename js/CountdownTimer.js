// countdown timer as seen on the GUI
const GAME_COUNTDOWN_LENGTH = 500;

var countdownTimeRemaining = GAME_COUNTDOWN_LENGTH;
var countdownFinished = false;
var countdownTimerPaused = true;

function resetCountdownTimer() {
    // console.log("resetTimer() countdownTimeRemaining:" + GAME_COUNTDOWN_LENGTH);
    countdownTimeRemaining = GAME_COUNTDOWN_LENGTH;
}

function updateCountdownTimer(dt=1) {
	if(countdownTimerPaused) return;
    // console.log("updateTimer");
    countdownTimeRemaining -= dt;
    if (countdownTimeRemaining <= 0 && !countdownFinished) {
        onTimerComplete();
        countdownTimerPaused = true;
        countdownFinished = true;
    }
}

function onTimerComplete() {
	prepareCutscene(OutOfTimeScene);
}
