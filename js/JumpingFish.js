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
	this.changedDirection = false;
	this.heightOfJump = 96;
	var jumpThreshold = this.y + this.heightOfJump;
	this.detectionRadius = 10;
	this.homeRadius = 10;
	this.idleRadius = 10;
	this.neutral = true;
	this.waitingTimer = 30; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.idleTimer = 50; // frames
	var idleTimerFull = this.idleTimer;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	this.attackPower = 4;

	this.collidableTiles = [TILE_EXTEND_COLLISION,TILE_SMALL_TREE, TILE_NOTHING,
	TILE_SMALL_TREE_ALT,TILE_TALL_TREE,TILE_STALAGMITE,TILE_REPLACE_TREE,
	TILE_CLIFF_TOP_LEFT,TILE_CLIFF_TOP,TILE_CLIFF_TOP_RIGHT,
	TILE_CLIFF_LEFT,TILE_CLIFF_RIGHT,
	TILE_CLIFF_BOTTOM_LEFT,TILE_CLIFF_BOTTOM,TILE_CLIFF_BOTTOM_RIGHT,
	TILE_PIT_TOP_LEFT, TILE_PIT_TOP, TILE_PIT_TOP_RIGHT,
	TILE_PIT_LEFT, TILE_PIT_RIGHT, TILE_PIT_BOTTOM_LEFT,
	TILE_PIT_BOTTOM, TILE_PIT_BOTTOM_RIGHT,
	TILE_CLIFF_TOP_LEFT_2, TILE_CLIFF_TOP_LEFT_3,
	TILE_CLIFF_TOP_RIGHT_2, TILE_CLIFF_TOP_RIGHT_3,
	TILE_CLIFF_BOTTOM_RIGHT_2, TILE_CLIFF_BOTTOM_RIGHT_3,
	TILE_CLIFF_BOTTOM_LEFT_2, TILE_CLIFF_BOTTOM_LEFT_3,
	TILE_BOULDER_TOP_LEFT, TILE_BOULDER_TOP, TILE_BOULDER_TOP_RIGHT,
	TILE_BOULDER_MIDDLE_LEFT, TILE_BOULDER_MIDDLE, TILE_BOULDER_MIDDLE_RIGHT,
	TILE_BOULDER_BOTTOM_LEFT, TILE_BOULDER_BOTTOM, TILE_BOULDER_BOTTOM_RIGHT,
	TILE_CLIFF_VIEW_LEFT,TILE_CLIFF_VIEW_MIDDLE,TILE_CLIFF_VIEW_RIGHT,
	TILE_PIT_TOP_LEFT,TILE_PIT_TOP,TILE_PIT_TOP_RIGHT,
	TILE_PIT_RIGHT,TILE_PIT_LEFT,TILE_PIT_BOTTOM_RIGHT,TILE_PIT_BOTTOM,TILE_PIT_BOTTOM_LEFT,
	TILE_WATERFALL_BOTTOM_LEFT, TILE_WATERFALL_BOTTOM_CENTER,TILE_WATERFALL_BOTTOM_RIGHT,
	TILE_ROCK_PILE_ROUGH,TILE_ROCK_PILE_ROUGH_ALT,TILE_ROCK_PILE_SMOOTH,TILE_ROCK_PILE_SMOOTH_ALT]; 
	// same as standard but minus water and plus nothing/ground; 

	this.move = function() {
		if (!this.changedDirection) {
			this.y += this.speed;
			if (this.y >= jumpThreshold) {
				this.changedDirection = true;
			}
		} else {
			this.y -= this.speed;
		}
		if (this.y <= this.home.y && this.changedDirection) {
			this.underwater = true;
		}
	}

	this.draw = function() {
		if (!this.underwater && !this.changedDirection) {
			this.img.draw(this.x,this.y,1,false,false);
		} else if (!this.underwater && this.changedDirection) {
			this.img.draw(this.x,this.y,1,true,true, 180);
		} else if (this.underwater && this.changedDirection) {
			// don't draw
		}
	}

	return new animalClass(this);

} // end of jumpingFish