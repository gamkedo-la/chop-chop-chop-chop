function jumpingFish (arrayIndex,worldTileType) {
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.home = indexToCenteredXY(arrayIndex);
	this.x = this.home.x;
	this.y = this.home.y;
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
	this.width = this.img.spriteSheet.width/this.img.animationColFrames;
	this.height = this.img.spriteSheet.height/this.img.animationRowFrames;
	this.speed = 4;
	this.underwater = false;
	this.changedDirection = false;
	this.splashDown = false;
	var heightOfJump = 96;
	this.jumpThreshold = this.y - heightOfJump;
	this.underwaterTimer = 0;
	this.underwaterTimerFinish = 60;
	this.attackPower = 4;
	var colliderWidth = this.width/2 + 2;
	var colliderHeight = this.height - 6;
	var colliderOffsetX = 0;
	var colliderOffsetY = 0;
	this.hitbox = new colliderClass(this.x,this.y,
		colliderWidth,colliderHeight,colliderOffsetX,colliderOffsetY);

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
		if (this.underwater) {
			if (this.underwaterTimer >= this.underwaterTimerFinish) {
				this.underwaterTimer = 0;
				this.underwater = false;
				this.changedDirection = false;
				this.splashDown = false;
				spawnParticles("splash", this.x, this.y);
			}
		} else if (!this.changedDirection && !this.underwater) {
			this.y -= this.speed;
			if (this.y < this.jumpThreshold && !this.changedDirection) {
				this.changedDirection = true;
			}
		} else if (this.changedDirection && !this.underwater){
			this.y += this.speed;
		}
		if (this.y > this.home.y + 1 && this.changedDirection) {
			this.underwater = true;
			this.underwaterTimer++;
		}
		this.hitbox.update(this.x,this.y);
	}

	this.draw = function() {
		if (!this.underwater && !this.changedDirection) {
			this.img.draw(this.x,this.y,1,true);
		} else if (!this.underwater && this.changedDirection) {
			this.img.draw(this.x,this.y,1,false,true, 180,-this.width/2,-this.height/2);
		} else if (this.underwater && this.changedDirection) {
			if (!this.splashDown) {
				spawnParticles("splash", this.x, this.y);
				this.splashDown = true;
			}
		}
		if (worldEditor) {
			canvasContext.strokeStyle = "teal";
			canvasContext.lineWidth = 1;
			canvasContext.strokeRect(this.home.x - TILE_W/2, this.home.y - TILE_H/2, TILE_W, TILE_H);
			colorText("Home" + "\n" + this.img.name, this.home.x, this.home.y, "teal", "Verdana", "center");
		}
		if (debug) {
			drawRect(this.x,this.y,2,2,"yellow");
			drawRect(this.home.x,this.home.y,2,2,"teal");
			this.hitbox.draw("green");
		}
	}

	new animalClass(this);

} // end of jumpingFish