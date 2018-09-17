var animalList = [];

function rabbitClass (arrayIndex,worldTileType) {
	var rabbitIdle = new AnimatedSpriteClass({
		name: "rabbit",
		spriteSheet: gamePics.rabbitSheet,
		animationRowFrames: 1,
		animationColFrames: 4,
		framesUntilNext: 1,
		currentFrameIndex: 1,
		loops: false;
	});
	var rabbitHop = new AnimatedSpriteClass({
		name: "rabbitHop",
		spriteSheet: gamePics.rabbitSheet,
		animationRowFrames: 1,
		animationColFrames: 4,
		currentFrameIndex: 1,
		framesUntilNext: 10,
	});
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.home = indexToCenteredXY(arrayIndex);
	this.img = rabbit;
	this.speed = 2;
	this.detectionRadius = 0;
	this.homeRadius = 40;
	this.idleRadius = 40;
	this.neutral = true;
	this.waitingTimer = 30; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.idleTimer = 50; // frames
	var idleTimerFull = this.idleTimer;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	this.attackPower = 5;

	this.collidableTiles = standardCollisionTiles;

	return new animalClass(this);

} // end of bigBird