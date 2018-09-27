function alligatorClass (arrayIndex,worldTileType) {
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.home = indexToCenteredXY(arrayIndex);
	var alligator = new AnimatedSpriteClass({
		name: "alligator",
		spriteSheet: gamePics.alligatorSheet,
		animationRowFrames: 1,
		animationColFrames: 2,
		currentFrameIndex: 0,
		framesUntilNext: 25,
		loops: true
	});
	this.img = alligator;
	this.width = this.img.spriteSheet.width/this.img.animationColFrames;
	this.height = this.img.spriteSheet.height/this.img.animationRowFrames;
	this.speed = 2;
	this.detectionRadius = 150;
	this.homeRadius = 500;
	this.idleRadius = 60;
	this.neutral = false;
	this.waitingTimer = 30; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.idleTimer = 50; // frames
	var idleTimerFull = this.idleTimer;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	this.attackPower = 2;
	this.colliderWidth = this.width;
	this.colliderHeight = this.height;
	this.colliderOffsetX = 0;
	this.colliderOffsetY = 0;

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
	// same as standard but minus water and plus nothing/ground

	return new animalClass(this);

} // end of bigBird