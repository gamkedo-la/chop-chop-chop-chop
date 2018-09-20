const LOW = 1;
const MID = 2;
const MAX = 3;
const MAX_FRUSTATION = 20;

var upgradeLevelTwo = false;
var upgradeLevelThree = false;

function playerClass() {
	this.x = 20;
	this.y = 40;
	this.oldX = this.x;
	this.oldY = this.y;
	this.speed = 6;
	
	// stats
	this.swingCount = 0;
	this.chopCount = 99;
	this.stepCount = 0;
	this.treeCount = 0;
	this.attackCount = 0;

	var walkIntoTileType = TILE_SMALL_TREE;
	this.sprite = playerWalking;
	this.width = this.sprite.spriteSheet.width/this.sprite.animationColFrames;
	this.height = this.sprite.spriteSheet.height/this.sprite.animationRowFrames;
	const NORTH = "north";
	const EAST = "east";
	const WEST = "west";
	const SOUTH = "south";
	this.direction = EAST; // direction helps prioritize chop
	this.state = {
		chopping: false,
		walking: false,
		waiting: false,
	};
	var axeHitboxWidth = 9;
	var axeHitboxHeight = 5;
	var axeOffsetX = ((playerSideChop.spriteSheet.width/2) - 35)/playerSideChop.animationColFrames;
	var axeOffsetY = -(playerSideChop.spriteSheet.height/6) - 1;
	this.axeHitbox = new colliderClass(this.x, this.y, axeHitboxWidth, axeHitboxHeight,
										axeOffsetX, axeOffsetY);
	this.axeSharpness = 0;
	this.axeLevel = LOW;
	this.axePower = 1;
	var chopTimer = 0;
	this.hitbox = new colliderClass(this.x, this.y, this.width/2, this.height,
											0, 0);
	this.currentFrustration = 0;
	this.invincible = false;
	this.invincibiltyTimer = 0;
	this.invincibiltyTimerFull = 45;

	this.leaveTrail = function() { // dust near the player's feet every so often
		
		const TRAIL_FRAME_INTERVAL = 6; // every nth frame, emit one particle
		const TRAIL_Y_OFFSET = 20; // foot position
		
		if (this.trailFrame == undefined) { // init
			//console.log('Trail starting!');
			this.trailFrame = 0;
		}
		
		this.trailFrame++;

		if (this.trailFrame % TRAIL_FRAME_INTERVAL == 0) { // time for another?
			//console.log('Trail at frame ' + this.trailFrame);
			spawnParticles('footstep', this.x, this.y+TRAIL_Y_OFFSET);
			this.stepCount++; // add to stats for GUI
		}

	}

	this.move = function() {
		this.oldX = this.x;
		this.oldY = this.y;
		var movementX = 0;
        var movementY = 0;
		this.state.walking = false;

        if (!this.state.chopping && !this.state.waiting) {
			if (leftKeyHeld) {
				movementX -= this.speed;
				this.direction = WEST;
				this.state.walking = true;
			}
			if (rightKeyHeld) {
				movementX += this.speed;
				this.direction = EAST;
				this.state.walking = true;
			}
			if (upKeyHeld) {
				movementY -= this.speed;
				//this.direction = NORTH;
				this.state.walking = true;
			}
			if (downKeyHeld) {
				movementY += this.speed;
				//this.direction = SOUTH;
				this.state.walking = true;
			}
		} else {
			return;
		}

		if (this.state.walking) { // occasionally leave a trail of particles (dust/footprints)
			this.leaveTrail(); // maybe use only at certain states/times/surfaces? (wet feet?)
		}

		if (checkTileCollision(this.x,this.y,movementX,movementY)) {
			movementX = 0;
	 		movementY = 0;
		}
		this.x += movementX;
		this.y += movementY;
		this.hitbox.update(this.x, this.y);
		//console.log("player direction: " + this.direction);
	}

	this.gotHit = function(addedFrustration) {
		if (this.invincible) {
			return;
		} else {
			this.currentFrustration += addedFrustration;
			if (this.currentFrustration >= MAX_FRUSTATION) {
				this.currentFrustration = 0;
				this.state.chopping = false;
				this.state.walking = false;
				this.invincible = true;
				this.invincibiltyTimer = 0;
				getNewFrustratedScene();
    			prepareCutscene(FrustratedScene);
    			return;
			};
			playerHurt.play();
			var radians = getRandomNumberBetweenMinMax(0, 360) * DEGREES_TO_RADIANS;
			var boopedX = Math.cos(radians) * this.speed * 10;
			var boopedY = Math.sin(radians) * this.speed * 10;
			if (checkTileCollision(this.x,this.y,boopedX,boopedY)) {
				this.x -= boopedX;
				this.y -= boopedY;
			} else {
				this.x += boopedX;
				this.y += boopedY;
			}
			this.invincibiltyTimer = this.invincibiltyTimerFull;
			this.invincible = true;
		}
	}

	this.chopTrees = function(direction) {
		var currentChoppingDirection = direction;
		if (currentChoppingDirection == EAST) {
			this.axeHitbox.update(this.x,this.y);
		} else if (currentChoppingDirection == WEST) {
			this.axeHitbox.update(this.x - axeOffsetX * 2,this.y);
		}
		var hit = false;
		for (var i = 0; i < objectList.length; i++) {
			var object = objectList[i];
			if (object.hasHitbox) {
				if (this.axeHitbox.isCollidingWith(object.hitbox)) {
					hit = true;
					//console.log("hit an object!");
					spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
					if (object.tileType == TILE_STALAGMITE) {
						metallicChop.play();
					} else {
						var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
						arrayOfChopSFXs[random].play();
					}
					object.gotHit(this.axePower);
					this.chopCount++; // add to score on GUI
					this.swingCount++; // a successful chop counts as a swing, too
				}
			}
		}
		if (!hit) {
			//console.log("missed all trees!");
			missedSwing.play();
			this.swingCount++; // add to score on GUI
		}
		hit = false;
		if (debug) this.axeHitbox.draw("blue");
	};

	this.draw = function() {
		if (this.invincibiltyTimer > 0 && this.invincible) {
			this.invincibiltyTimer--;
			if (this.invincibiltyTimer % 3 == 0 && this.invincibiltyTimer > 0) {
				return;
			}
			if (this.invincibiltyTimer <= 0 && this.invincible) {
				this.invincible = false;
			}
		}

		var contactFrame = 15;

		if (spacebarKeyHeld && chopTimer <= 0 && !this.state.waiting) {
			if (this.axeLevel == MAX) {
				this.state.chopping = true;
				contactFrame = playerSideChop.animationColFrames - 2;
				chopTimer = playerSideChop.animationColFrames - 1;
				playerSideChop.currentFrameIndex = 0;
			} else {
				this.state.chopping = true;
				chopTimer = playerSideChop.animationColFrames - 1;
				playerSideChop.currentFrameIndex = 2;
			}
		}

		if (chopTimer > 0) {
			playerSideChop.draw(this.x,this.y, 1, (this.direction != EAST));
			if (playerSideChop.currentFrameIndex == contactFrame) {
				if (this.axeLevel == MAX) {
					chopTimer = 0;
					var axeProjectile = new projectileClass(this.x,this.y, this.direction);
					objectList.push(axeProjectile);
					this.state.chopping = false;
					this.state.waiting = true;
				} else {
					this.chopTrees(this.direction);
				}
			}
			chopTimer--;
		} else {
			if (this.state.walking) {

			playerWalking.draw(this.x, this.y, 1, (this.direction != EAST));
			
			} else { // idle

			playerIdle.draw(this.x, this.y, 1, (this.direction != EAST));

			}
		}

		if (chopTimer <= 0) {
			if (this.axeLevel == MAX) {
				for (var j = 0; j < objectList.length; j++) {
					if (objectList[j].returned) {
						objectList[j].remove = true;
						this.state.waiting = false;
					}
				}
			} else {
				this.state.chopping = false;
			}
		} 

		if (debug) {
			drawRect(this.x - 3/2,this.y - 3/2, 3,3, "red");
			this.hitbox.draw("red");
		}
	}
} // end of playerClass

function checkTileCollision (x,y,movementX,movementY) {
	var nextX = Math.round(x + movementX);
    var nextY = Math.round(y + movementY);

    if (nextX < 0 || nextX > worldCols * TILE_W) {
    	return true;
    }

    if (nextY < 0 || nextY > worldRows * TILE_H) {
    	return true;
    }

	var walkIntoTileType = getTileTypeAtPixelCoord(nextX, nextY);

    if (walkIntoTileType === undefined) {
		return true;
	}

	if (isTileTypeCollidable(walkIntoTileType)) {
		//console.log("walkIntoTileType: " + walkIntoTileType);
		return true;
	}
}

function isTileTypeCollidable(tileType) {
	switch (tileType) {
		case TILE_EXTEND_COLLISION:
		case TILE_SMALL_TREE:
		case TILE_SMALL_TREE_ALT:
		case TILE_TALL_TREE:
		case TILE_REPLACE_TREE:
		case TILE_REPLACE_WATER:
		case TILE_REPLACE_WATERFALL:
		case TILE_CLIFF_TOP_LEFT:
		case TILE_CLIFF_TOP_LEFT_2:
		case TILE_CLIFF_TOP_LEFT_3:
		case TILE_CLIFF_TOP:
		case TILE_CLIFF_TOP_RIGHT:
		case TILE_CLIFF_TOP_RIGHT_2:
		case TILE_CLIFF_TOP_RIGHT_3:
		case TILE_CLIFF_LEFT:
		case TILE_CLIFF_RIGHT:
		case TILE_CLIFF_BOTTOM_LEFT:
		case TILE_CLIFF_BOTTOM_LEFT_2:
		case TILE_CLIFF_BOTTOM_LEFT_3:
		case TILE_CLIFF_BOTTOM:
		case TILE_CLIFF_BOTTOM_RIGHT:
		case TILE_CLIFF_BOTTOM_RIGHT_2:
		case TILE_CLIFF_BOTTOM_RIGHT_3:
		case TILE_CLIFF_VIEW_LEFT:
		case TILE_CLIFF_VIEW_MIDDLE:
		case TILE_CLIFF_VIEW_RIGHT:
		case TILE_PIT_TOP_LEFT:
		case TILE_PIT_TOP:
		case TILE_PIT_TOP_RIGHT:
		case TILE_PIT_LEFT:
		case TILE_PIT_RIGHT:
		case TILE_PIT_BOTTOM_LEFT:
		case TILE_PIT_BOTTOM:
		case TILE_PIT_BOTTOM_RIGHT:
		case TILE_ROCK_PILE_ROUGH:
		case TILE_ROCK_PILE_ROUGH_ALT:
		case TILE_ROCK_PILE_SMOOTH:
		case TILE_ROCK_PILE_SMOOTH_ALT:
		case TILE_BOULDER_TOP_LEFT:
		case TILE_BOULDER_TOP:
		case TILE_BOULDER_TOP_RIGHT:
		case TILE_BOULDER_MIDDLE_LEFT:
		case TILE_BOULDER_MIDDLE:
		case TILE_BOULDER_MIDDLE_RIGHT:
		case TILE_BOULDER_BOTTOM_LEFT:
		case TILE_BOULDER_BOTTOM:
		case TILE_BOULDER_BOTTOM_RIGHT:
			return true;
			break;
	}
}

function checkNextLevelTrigger(){
	if(	getTileTypeAtPixelCoord(player.hitbox.x, player.hitbox.y) == TILE_NEXT_LEVEL ||
		getTileTypeAtPixelCoord(player.hitbox.x+player.hitbox.w, player.hitbox.y) == TILE_NEXT_LEVEL ||
		getTileTypeAtPixelCoord(player.hitbox.x, player.hitbox.y+player.hitbox.h) == TILE_NEXT_LEVEL ||
		getTileTypeAtPixelCoord(player.hitbox.x+player.hitbox.w, player.hitbox.y+player.hitbox.h) == TILE_NEXT_LEVEL)
	{
		return true;
	}
	return false;
}
