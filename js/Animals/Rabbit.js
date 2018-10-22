function rabbitClass (arrayIndex,worldTileType) {
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.home = indexToCenteredXY(arrayIndex);
	var randomPositionOffset = getRoundedRandomNumberBetweenMinMax(16,24);
	if (getRandomNumberBetweenMinMax(0, 1) > 0.5) {
		randomPositionOffset *= -1;
	}
	if (getRandomNumberBetweenMinMax(0, 1) > 0.5) {
		this.home.x += randomPositionOffset;
	}
	if (getRandomNumberBetweenMinMax(0, 1) > 0.5) {
		this.home.y += randomPositionOffset;
	}
	var rabbitMovement = new AnimatedSpriteClass({
		name: "rabbit",
		spriteSheet: gamePics.rabbitSheet,
		animationRowFrames: 1,
		animationColFrames: 16,
		currentFrameIndex: 0,
		framesUntilNext: 1,
		loops: true
	});
	var randomFrameIndex = getRoundedRandomNumberBetweenMinMax(0,rabbitMovement.animationColFrames);
	rabbitMovement.currentFrameIndex = randomFrameIndex;
	this.img = rabbitMovement;
	this.width = this.img.spriteSheet.width/this.img.animationColFrames;
	this.height = this.img.spriteSheet.height/this.img.animationRowFrames;
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
	this.colliderWidth = this.width;
	this.colliderHeight = this.height;
	this.colliderOffsetX = 0;
	this.colliderOffsetY = 0;

	this.collidableTiles = standardCollisionTiles;

	return new animalClass(this);

} // end of bigBird