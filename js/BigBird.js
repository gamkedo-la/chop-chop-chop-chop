var animalList = [];

function bigBird (arrayIndex) {
	this.home = indexToCenteredXY(arrayIndex);
	this.img = stebsBird;
	this.width = this.img.spriteSheet.width/this.img.animationColFrames;
	this.height = this.img.spriteSheet.height/this.img.animationRowFrames;
	this.speed = 3;
	this.detectionRadius = 120;
	this.homeRadius = 300;
	this.idleRadius = 17;
	this.waiting = false;
	this.meander = true;
	this.waitingTimer = 30; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.idleTimer = 75; // frames
	var idleTimerFull = this.idleTimer;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	this.attackPower = 2;

	return new animalClass (this);
}