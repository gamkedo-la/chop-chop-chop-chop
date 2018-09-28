function bigBird (arrayIndex,worldTileType) {
	var stebsBird = new AnimatedSpriteClass({
		name: "stebsBird",
		spriteSheet: gamePics.stebsBird,
		animationRowFrames: 1,
		animationColFrames: 2,
		framesUntilNext: 25,
	})
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.home = indexToCenteredXY(arrayIndex);
	this.img = stebsBird;
	this.width = this.img.spriteSheet.width/this.img.animationColFrames;
	this.height = this.img.spriteSheet.height/this.img.animationRowFrames;
	this.speed = 4;
	this.detectionRadius = 240;
	this.homeRadius = 600;
	this.idleRadius = 40;
	this.goalRadius = 50;
	this.neutral = false;
	this.waitingTimer = 30; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.idleTimer = 75; // frames
	var idleTimerFull = this.idleTimer;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	this.attackPower = 3;
	this.colliderWidth = this.width;
	this.colliderHeight = this.height/4;
	this.colliderOffsetX = 0;
	this.colliderOffsetY = this.height/4;

	this.collidableTiles = [];

	return new animalClass(this);

} // end of bigBird