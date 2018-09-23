function pincherBug (arrayIndex,worldTileType) {
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.home = indexToCenteredXY(arrayIndex);
	var pincherBugMovement = new AnimatedSpriteClass({
		name: "pincherBug",
		spriteSheet: gamePics.pincherBugSheet,
		animationRowFrames: 1,
		animationColFrames: 2,
		currentFrameIndex: 0,
		framesUntilNext: 10,
		loops: true
	});
	this.img = pincherBugMovement;
	this.width = this.img.spriteSheet.width/this.img.animationColFrames;
	this.height = this.img.spriteSheet.height/this.img.animationRowFrames;
	this.speed = 2;
	this.detectionRadius = 150;
	this.homeRadius = 300;
	this.idleRadius = 60;
	this.neutral = false;
	this.waitingTimer = 30; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.idleTimer = 50; // frames
	var idleTimerFull = this.idleTimer;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	this.attackPower = 5;
	this.colliderWidth = this.width;
	this.colliderHeight = this.height - 12;
	this.colliderOffsetX = 0;
	this.colliderOffsetY = 0;

	this.collidableTiles = standardCollisionTiles;

	return new animalClass(this);

} // end of bigBird