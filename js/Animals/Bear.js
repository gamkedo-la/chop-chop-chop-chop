function bearClass (arrayIndex,worldTileType) {
	var bearMovement = new AnimatedSpriteClass({
		name: "bear",
		spriteSheet: gamePics.bearSheet,
		animationRowFrames: 1,
		animationColFrames: 2,
		currentFrameIndex: 0,
		framesUntilNext: 8,
		loops: true
	});
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.home = indexToCenteredXY(arrayIndex);
	this.img = bearMovement;
	this.width = this.img.spriteSheet.width/this.img.animationColFrames;
	this.height = this.img.spriteSheet.height/this.img.animationRowFrames;
	this.speed = 3;
	this.detectionRadius = 100;
	this.homeRadius = 75;
	this.idleRadius = 50;
	this.neutral = false;
	this.waitingTimer = 45; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.idleTimer = 90; // frames
	var idleTimerFull = this.idleTimer;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	this.attackPower = 4;
	this.colliderWidth = this.width;
	this.colliderHeight = this.height/2;
	this.colliderOffsetX = 0;
	this.colliderOffsetY = this.height/4 - 2;

	this.collidableTiles = standardCollisionTiles;

	return new animalClass(this);

} // end of bigBird