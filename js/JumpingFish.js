var animalList = [];

function jumpingFish (arrayIndex,worldTileType) {
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.home = indexToCenteredXY(arrayIndex);
	var fishJump = new AnimatedSpriteClass({
		name: "jumpingFish",
		spriteSheet: gamePics.jumpingFish,
		animationRowFrames: 1,
		animationColFrames: 4,
		currentFrameIndex: 0,
		framesUntilNext: 6,
		loops: true
	});
	this.img = fishJump;
	this.speed = 4;
	this.underwater = false;
	this.heightOfJump = 64;
	this.detectionRadius = 100;
	this.homeRadius = 10;
	this.idleRadius = 0;
	this.neutral = true;
	this.waitingTimer = 30; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.idleTimer = 50; // frames
	var idleTimerFull = this.idleTimer;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	this.attackPower = 5;

	this.collidableTiles = standardCollisionTiles;

	this.move = function() {
		if (!this.underwater && !this.changedDirection) {
			this.y += this.speed
		}
		if (this.y >= this.y + this.heightOfJump) {
			this.speed = -this.speed;
			this.changedDirection = true;
		} else if (this.y <= this.home.y && this.changedDirection) {
			this.underwater = true;
			this.changedDirection = false;
		}
	}

	this.draw = function() {
		if (!this.underwater && !this.changedDirection) {
			this.img.draw(this.x,this.y,1,false,false);
		} else if (!this.underwater && this.changedDirection) {
			this.img.draw(this.x,this.y,1,true,true);
		} else if (this.underwater && this.changedDirection) {
			// don't draw
		}
	}

	return new animalClass(this);

} // end of bigBird