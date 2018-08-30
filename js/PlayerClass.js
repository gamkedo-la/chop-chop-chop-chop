function playerClass() {
	this.x = 20;
	this.y = 20;
	this.speed = 6;
	var walkIntoTileType = TILE_TREE;
	this.sprite = playerWalking;
	this.width = this.sprite.spriteSheet.width/this.sprite.animationColFrames;
	this.height = this.sprite.spriteSheet.height/this.sprite.animationRowFrames;
	const NORTH = "north";
	const EAST = "east";
	const WEST = "west";
	const SOUTH = "south";
	this.direction = WEST; // direction helps prioritize chop
	this.state = {
		chopping: false
	};
	var axeHitboxWidth = 6;
	var axeHitboxHeight = 5;
	var axeOffsetX = this.width/2;
	var axeOffsetY = -this.width/4;
	this.axeHitbox = new colliderClass(this.x, this.y, axeHitboxWidth, axeHitboxHeight,
										axeOffsetX, axeOffsetY);
	this.axeSharpness = 0;
	this.axeLevel = 0;
	this.axePower = 1 + this.axeSharpness + this.axeLevel;
	this.playerHitbox = new colliderClass(this.x, this.y, this.width, this.height,
											0, 0);

	this.move = function() {
		var movementX = 0;
        var movementY = 0;

        if (!this.state.chopping) {
			if (leftKeyHeld) {
				movementX -= this.speed;
				this.direction = WEST;
			}
			if (rightKeyHeld) {
				movementX += this.speed;
				this.direction = EAST;
			}
			if (upKeyHeld) {
				movementY -= this.speed;
				//this.direction = NORTH;
			}
			if (downKeyHeld) {
				movementY += this.speed;
				//this.direction = SOUTH;
			}
		} else {
			return;
		}

		var nextX = Math.round(this.x + movementX);
        var nextY = Math.round(this.y + movementY);

        if (nextX < 0 || nextX > worldCols * TILE_W) {
        	nextX = this.x;
        }

        if (nextY < 0 || nextY > worldRows * TILE_H) {
        	nextY = this.y;
        }

        var walkIntoTileType = getTileTypeAtPixelCoord(nextX, nextY);

        if (walkIntoTileType === undefined) {
			walkIntoTileType = TILE_EXTEND_COLLISION;
		}

		if (isTileTypeCollidable(walkIntoTileType)) {
			this.x = this.x;
			this.y = this.y;
		} else {
			this.x = nextX;
			this.y = nextY;
		}
		this.playerHitbox.update(this.x, this.y);
		//console.log("player direction: " + this.direction);
	}

	this.chopTrees = function(direction) {
		var currentChoppingDirection = direction;
		if (currentChoppingDirection == EAST) {
			this.axeHitbox.update(this.x,this.y);
		} else if (currentChoppingDirection == WEST) {
			this.axeHitbox.update(this.x - axeOffsetX * 2,this.y);
		}
		for (var i = 0; i < objectList.length; i++) {
			var object = objectList[i];
			if (object.hasHitbox) {
				if (this.axeHitbox.isCollidingWith(object.hitbox)) {
					console.log("hit an object!");
					spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
					chop1.play();
					object.gotHit(this.axePower);
				}
			}
		}
		if (debug) this.axeHitbox.draw("blue");
	};

	this.draw = function() {
		var contactFrame = 0;
		if (this.direction == EAST && spacebarKeyHeld) {
			this.state.chopping = true;
			playerSideChop.draw(this.x,this.y);
			if (playerSideChop.currentFrameIndex == contactFrame) {
				this.chopTrees(this.direction);
			}
		} else if (this.direction == WEST && spacebarKeyHeld) {
			this.state.chopping = true;
			playerSideChop.draw(this.x, this.y, 1,true);
			if (playerSideChop.currentFrameIndex == contactFrame) {
				this.chopTrees(this.direction);
			}
		} else {
			playerWalking.draw(this.x,this.y);
			playerSideChop.currentFrameIndex = 2;
		}
		if (debug) {
			drawRect(this.x - 3/2,this.y - 3/2, 3,3, "red");
			this.playerHitbox.draw("red");
		}
	}
} // end of objectClass
