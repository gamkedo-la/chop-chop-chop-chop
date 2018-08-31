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
	this.direction = EAST; // direction helps prioritize chop
	this.state = {
		chopping: false,
		walking: false
	};
	var axeHitboxWidth = 6;
	var axeHitboxHeight = 5;
	var axeOffsetX = (playerSideChop.spriteSheet.width/2)/playerSideChop.animationColFrames;
	var axeOffsetY = -(playerSideChop.spriteSheet.height/4);
	this.axeHitbox = new colliderClass(this.x, this.y, axeHitboxWidth, axeHitboxHeight,
										axeOffsetX, axeOffsetY);
	this.axeSharpness = 0;
	this.axeLevel = 0;
	this.axePower = 1 + this.axeSharpness + this.axeLevel;
	var chopTimer = 0;
	this.hitbox = new colliderClass(this.x, this.y, this.width/2, this.height,
											1, 0);
	this.currentFrustration = 0;
	this.invincible = false;
	this.invincibiltyTimer = 0;
	this.invincibiltyTimerFull = 45;

	this.move = function() {
		var movementX = 0;
        var movementY = 0;
		this.state.walking = false;

        if (!this.state.chopping) {
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
			console.log(this.currentFrustration);
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
					var random = getRoundedRandomNumberBetweenMinMax(0, 1);
					arrayOfChopSFXs[random].play();
					object.gotHit(this.axePower);
				}
			}
		}
		if (!hit) {
			//console.log("missed all trees!");
			missedSwing.play();
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

		var contactFrame = 0;

		if (spacebarKeyHeld && chopTimer == 0) {
			chopTimer = playerSideChop.animationColFrames;
		}
		if (chopTimer > 0) {
			this.state.chopping = true;
			if (chopTimer > 0) {
				playerSideChop.draw(this.x,this.y, 1, (this.direction != EAST));
				if (playerSideChop.currentFrameIndex == contactFrame) {
					this.chopTrees(this.direction);
				}
				chopTimer--;
				if (chopTimer <= 0) {
					player.state.chopping = false;
				}
			}
		
		} else { // not chopping

			if (this.state.walking) {
	
				playerWalking.draw(this.x, this.y, 1, (this.direction != EAST));
				
			} else { // idle

				playerIdle.draw(this.x, this.y, 1, (this.direction != EAST));

			}
		}

		if (debug) {
			drawRect(this.x - 3/2,this.y - 3/2, 3,3, "red");
			this.hitbox.draw("red");
		}
	}
} // end of objectClass
