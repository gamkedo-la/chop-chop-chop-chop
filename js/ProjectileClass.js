function projectileClass (x,y, direction) {
	this.y = y;
	this.speed = 10;
	this.x = (direction == "west") ? x - this.speed : x + this.speed;
	this.startingPointX = this.x;
	this.img = maxAxeProjectile;
	this.width = this.img.spriteSheet.width / this.img.animationColFrames;
	this.height = this.img.spriteSheet.height;
	this.direction = direction;
	this.changedDirection = false;
	this.returned = false;
	this.remove = false;
	
	var projectileHitboxWidth = this.width;
	var projectileHitboxHeight = this.height;
	var projectileOffsetX = 0;
	var projectileOffsetY = 0;
	this.axeHitbox = new colliderClass(this.x, this.y, projectileHitboxWidth, projectileHitboxHeight,
										projectileOffsetX, projectileOffsetY);
	var projectileEndPoint = 0;

	this.draw = function () {
		this.img.draw(this.x, this.y);
		if (debug) {
			this.axeHitbox.draw("blue");
			drawRect(this.x, this.y,2,2, "red");
			drawRect(projectileEndPoint, this.y,2,2, "green");
		}
	}

	this.move = function() {
		axeWhirl.play();
		if (this.direction == "west") {
			projectileEndPoint = (this.startingPointX - (this.speed * 32));
			if (!this.changedDirection) {
				this.x -= this.speed;
				if (this.x <= projectileEndPoint) {
				this.changedDirection = true;
				}
			} else {
				this.x += this.speed;
			}
			if (this.x >= this.startingPointX && this.changedDirection) {
				this.returned = true;
			} 
		} else {
			projectileEndPoint = (this.startingPointX + (this.speed * 32));
			if (!this.changedDirection) {
				this.x += this.speed;
				if (this.x >= projectileEndPoint) {
					this.changedDirection = true;
				}
			} else {
				this.x -= this.speed;
			}
			if (this.x <= this.startingPointX && this.changedDirection) {
				this.returned = true;
			}
		}
		this.axeHitbox.update(this.x, this.y);
		this.collisionChecks();
	} // end of this.move function

	this.collisionChecks = function() {
		for (var i = 0; i < objectList.length; i++) {
			var object = objectList[i];
			if (object.hasHitbox) {
				if (this.axeHitbox.isCollidingWith(object.hitbox)) {
					if (object.animal) {
						player.hitAnAnimal = true;
						console.log("HIT AN ANIMAL! >:C");
						animalHit.play();
						player.gotHit(animal.attackPower);
					} else {
						spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
						var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
						arrayOfChopSFXs[random].play();
						object.gotHit(player.axePower);
						player.chopCount++; // add to score on GUI
						if (object.tileType == TILE_LOLLIPOP && object.health <=0) {
							player.powerupActive = true;
							player.state.chopping = false;
							player.state.waiting = false;
							playerSideChopMax.loops = true;
							playerSideChopMax.currentFrameIndex = 0;
							axeWhirl.pause();
							axeWhirl.currentTime = 0;
							this.returned = true;
							this.remove = true;
							spacebarKeyHeld = false;
							break;
						}
					}
				} // end of if axeHitbox connects with object hitbox
			} // end of if object.hasHitbox (error would throw for non-hitbox having objects such as stumps)
		} // end of for loop for incrementing array index
		var arrayIndexUnderAxe = getTileIndexAtPixelCoord(this.axeHitbox.x,this.axeHitbox.y);
		if (worldGrid[arrayIndexUnderAxe] == TILE_PUMPKIN) {
			var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
			arrayOfChopSFXs[random].play();
			worldGrid[arrayIndexUnderAxe] = TILE_JACK_O;
			spawnParticles('debris0', this.axeHitbox.x, this.axeHitbox.y);
			spawnParticles('debris2', this.axeHitbox.x, this.axeHitbox.y);
			spawnParticles('debris1', this.axeHitbox.x, this.axeHitbox.y);
			spawnParticles('debris2', this.axeHitbox.x, this.axeHitbox.y);
			spawnParticles('debris0', this.axeHitbox.x, this.axeHitbox.y);
			hit = true;
		}
	} // end of collisionChecks function
} // end of projectileClass
