// countdown timer as seen on the GUI
const GAME_COUNTDOWN_LENGTH = 500;

var countdownTimeRemaining = GAME_COUNTDOWN_LENGTH;
var countdownFinished = false;

function resetCountdownTimer() {
    console.log("resetTimer() countdownTimeRemaining:" + GAME_COUNTDOWN_LENGTH);
    countdownTimeRemaining = GAME_COUNTDOWN_LENGTH;
}

function updateCountdownTimer(dt=1) {
    //console.log("updateTimer");
    countdownTimeRemaining -= dt;
    if (countdownTimeRemaining <= 0 && !countdownFinished) {
        onTimerComplete();
        countdownFinished = true;
    }
}

function onTimerComplete() {
	prepareCutscene(FrustratedScene);
}
