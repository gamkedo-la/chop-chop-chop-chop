function deathCat (arrayIndex,worldTileType) {
	var placeholderDeathCatMeander = new AnimatedSpriteClass({
		name: "deathCat",
		spriteSheet: gamePics.placeholderDeathCatMeanderSheet,
		animationRowFrames: 1,
		animationColFrames: 2,
		framesUntilNext: 25,
	});
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.home = indexToCenteredXY(arrayIndex);
	this.img = placeholderDeathCatMeander;
	this.width = this.img.spriteSheet.width/this.img.animationColFrames;
	this.height = this.img.spriteSheet.height/this.img.animationRowFrames;
	this.speed = 3;
	this.detectionRadius = 120;
	this.homeRadius = 300;
	this.idleRadius = 17;
	this.neutral = false;
	this.waitingTimer = 30; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.idleTimer = 75; // frames
	var idleTimerFull = this.idleTimer;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	this.colliderWidth = this.width;
	this.colliderHeight = this.height/2 + 4;
	this.colliderOffsetX = 0;
	this.colliderOffsetY = this.height/6;
	this.attackPower = 2;

	this.collidableTiles = standardCollisionTiles;

	return new animalClass(this);
}