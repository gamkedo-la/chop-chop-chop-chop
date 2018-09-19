var animalList = [];
var playing = false;
function animalClass (newAnimal) {
	this.animal = newAnimal;
	this.home = newAnimal.home;
	this.img = newAnimal.img;
	this.width = this.img.spriteSheet.width/this.img.animationColFrames;
	this.height = this.img.spriteSheet.height/this.img.animationRowFrames;
	this.speed = newAnimal.speed;
	this.arrayIndex = newAnimal.arrayIndex;
	this.tileType = newAnimal.tileType;
	this.detectionRadius = newAnimal.detectionRadius;
	this.homeRadius = newAnimal.homeRadius;
	this.waitingTimer = newAnimal.waitingTimer; // frames
	var waitingTimerFull = this.waitingTimer;
	this.idleRadius = newAnimal.idleRadius;
	this.idleTimer = newAnimal.idleTimer; // frames
	var idleTimerFull = this.idleTimer;
	this.attackPower = newAnimal.attackPower;
	this.collidableTiles = newAnimal.collidableTiles;
	const EAST = "east";
	const WEST = "west";
	this.direction = WEST;
	this.x = this.home.x;
	this.y = this.home.y;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	
	this.centerX = this.x - this.width / 2;
	this.centerY = this.y - this.height / 2;
	
	this.waiting = false;
	this.meander = true;
	this.neutral = newAnimal.neutral;
	this.playerDetected = false;
	this.playerDetectedSoundPlayed = false;

	var colliderWidth = this.width;
	var colliderHeight = this.height/2;
	var colliderOffsetX = 0;
	var colliderOffsetY = this.height/8;
	this.hitbox = new colliderClass(this.x,this.y,
		colliderWidth,colliderHeight,colliderOffsetX,colliderOffsetY);

	this.draw = function () {
		if (worldGrid[this.arrayIndex] != TILE_REPLACE_ANIMAL &&
			worldGrid[this.arrayIndex] != TILE_REPLACE_WATER) {
			return;
		}
		if (this.meander || this.playerDetected || this.waiting) {
			this.img.draw(this.x,this.y, 1, (this.direction != WEST));
		} 
		if (debug || worldEditor) {
			canvasContext.strokeStyle = "teal";
			canvasContext.lineWidth = 1;
			canvasContext.strokeRect(this.home.x - TILE_W/2, this.home.y - TILE_H/2, TILE_W, TILE_H);
			colorText("Home" + "\n" + this.img.name, this.home.x, this.home.y, "teal", "Verdana", "center");
		}
		if (debug) {
			this.hitbox.draw("green");
			outlineCircle(this.x,this.y, this.detectionRadius, "green",1);
			outlineCircle(this.home.x,this.home.y, this.homeRadius, "blue",1);
		}
	} // end of draw function


	this.move = function() {
		if (worldGrid[this.arrayIndex] != TILE_REPLACE_ANIMAL &&
			worldGrid[this.arrayIndex] != TILE_REPLACE_WATER) {
			return;
		}
		this.detectionRadiusTrigger();
		this.homeRadiusTrigger();
		var closeToHome = this.speed;
		if (this.playerDetected) { // chasing player
			if (!playing) {
				backgroundMusic.pause();
				backgroundMusic.src = "music/animal_chase_v3" + sourceExtension;
				backgroundMusic.play();
				playing = true;
			}
			var buffer = .04;
			if (backgroundMusic.currentTime > backgroundMusic.duration - buffer) {
				backgroundMusic.play();
			}
			if (this.img.data.name === "deathCat" && this.playerDetectedSoundPlayed === false) {
				deathMeow.play();
				this.playerDetectedSoundPlayed = true;
				player.attackCount++; // stats for GUI
			}
			if (this.img.data.name === "stebsBird" && this.playerDetectedSoundPlayed === false) {
				birdSound.play();
				this.playerDetectedSoundPlayed = true;
				player.attackCount++; // stats for GUI
			}
			this.meander = false;
			this.img.framesUntilNext = 8;
			var moveXTowardPlayer = this.x < player.x ? this.speed : -this.speed;
			var moveYTowardPlayer = this.y < player.y ? this.speed : -this.speed;
			if (this.checkTileCollision(this.x,this.y,moveXTowardPlayer,moveYTowardPlayer)) {
				moveXTowardPlayer = 0;
				moveYTowardPlayer = 0;
			}
			if (this.x <= player.x + closeToHome &&
			    this.x >= player.x - closeToHome) {
				moveXTowardPlayer = 0;
			}
			if (this.y <= player.y + closeToHome &&
			    this.y >= player.y - closeToHome) {
				moveYTowardPlayer = 0;
			}
			if (moveXTowardPlayer == -this.speed) {
				this.direction = WEST;
			} else if (moveXTowardPlayer == this.speed) {
				this.direction = EAST;
			} else if (moveXTowardPlayer == 0) {
				this.direction = this.direction;
			}
			this.x += moveXTowardPlayer;
			this.y += moveYTowardPlayer;
			this.hitbox.update(this.x,this.y);
			if (this.hitbox.isCollidingWith(player.hitbox)) {
				if (this.neutral) {
					// don't hit the player
				} else {
					player.gotHit(this.attackPower);
				}
			}
		} else if (this.waiting) { // else wait
				if (this.waitingTimer == 0) {
					//this.img.framesUntilNext = 25;
					this.meander = true;
					this.playerDetected = false;
					this.playerDetectedSoundPlayed = false;
					this.waiting = false;
					this.img.framesUntilNext = 25;
					this.waitingTimer = waitingTimerFull;
					this.idlePosition.x = this.home.x;
					this.idlePosition.y = this.home.y;
				}
				if (this.waitingTimer > 0) {
					this.waitingTimer--;
					return;
				}
		} else { // else return home
			this.playerDetected = false;
			var moveXTowardHome = this.x < this.idlePosition.x ? this.speed : -this.speed;
			var moveYTowardHome = this.y < this.idlePosition.y ? this.speed : -this.speed;
			if (this.x <= this.idlePosition.x + closeToHome &&
			    this.x >= this.idlePosition.x - closeToHome) {
				moveXTowardHome = 0;
			}
			if (this.y <= this.idlePosition.y + closeToHome &&
			    this.y >= this.idlePosition.y - closeToHome) {
				moveYTowardHome = 0;
			} // end of check if animal.y is home.y

			if (moveXTowardHome == 0 && moveYTowardHome == 0) {
				//animal is home, begin idling
				this.meander = true;
				this.idleTimer--;
				if(this.idleTimer == 0) {
					let radians = getRandomNumberBetweenMinMax(0, 360) * DEGREES_TO_RADIANS;
					let radius = getRandomNumberBetweenMinMax(0, this.idleRadius);
					this.idlePosition.x = Math.cos(radians) * radius + this.home.x;
					this.idlePosition.y = Math.sin(radians) * radius + this.home.y;
					this.idleTimer = idleTimerFull;
				}
			}

			if (this.checkTileCollision(this.x,this.y,moveXTowardHome,moveYTowardHome)) {
				moveXTowardHome = 0;
		 		moveYTowardHome = 0;
				this.idlePosition = {x: this.x, y: this.y};
			}

			if (moveXTowardHome < 0) {
				this.direction = WEST;
			} else if (moveXTowardHome > 0) {
				this.direction = EAST;
			} else if (moveXTowardHome == 0) {
				this.direction = this.direction;
			}
			this.x += moveXTowardHome;
			this.y += moveYTowardHome;
			this.hitbox.update(this.x,this.y);
		} // end of else return home
	} // end of move funtion

	this.detectionRadiusTrigger = function() {
		if (this.neutral) {
			// don't detect the player
		} else {
			var radius = this.detectionRadius;
			var distX = Math.abs((this.x - this.width / 2) - player.x);
			var distY = Math.abs((this.y - this.height / 2) - player.y);
			var diffX = distX - player.width/4;
			var diffY = distY - player.height/2;

			if ((diffX*diffX+diffY*diffY)<=(radius*radius)) {
				this.playerDetected = true;
			}
		}
	}

	this.homeRadiusTrigger = function() {
		if (this.neutral) {
			// don't check if player is still in home
		} else {
			var radius = this.homeRadius;
			var distX = Math.abs(this.centerX - player.x);
			var distY = Math.abs(this.centerY - player.y);
			var diffX = distX - player.width/4;
			var diffY = distY - player.height/2;

			if ((diffX*diffX+diffY*diffY)>(radius*radius)) {
				if (this.playerDetected) {
					this.waiting = true;
				}
				this.playerDetected = false;
			}
		}
	}

	this.checkTileCollision = function(x,y,movementX,movementY) {
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

		if (this.tileTypeCollidable(walkIntoTileType)) {
			//console.log("walkIntoTileType: " + walkIntoTileType);
			return true;
		}
	}

	this.tileTypeCollidable = function(tileType) {
		if (this.collidableTiles == []) {
			return false;
		} else if (this.collidableTiles.indexOf(tileType) > -1) {
			return true;
		}
	}
} // end of animal class

var standardCollisionTiles = [TILE_EXTEND_COLLISION,TILE_SMALL_TREE,
	TILE_SMALL_TREE_ALT,TILE_TALL_TREE,TILE_STALAGMITE,TILE_REPLACE_TREE,TILE_REPLACE_WATER,
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
	TILE_PIT_RIGHT,TILE_PIT_LEFT,
	TILE_PIT_BOTTOM_RIGHT,TILE_PIT_BOTTOM,TILE_PIT_BOTTOM_LEFT,
	TILE_WATERFALL_BOTTOM_LEFT, TILE_WATERFALL_BOTTOM_CENTER,TILE_WATERFALL_BOTTOM_RIGHT,
	TILE_ROCK_PILE_ROUGH,TILE_ROCK_PILE_ROUGH_ALT,TILE_ROCK_PILE_SMOOTH,TILE_ROCK_PILE_SMOOTH_ALT];

function spawnAnimalBasedOnTile(tileType, arrayIndex) {
	switch (tileType) {
		case TILE_DEATH_CAT:
			animal = new deathCat(arrayIndex,tileType);
			animalList.push(animal);
			worldGrid[arrayIndex] = TILE_REPLACE_ANIMAL;
			break;
		case TILE_STEBS_BIRD:
			animal = new bigBird(arrayIndex,tileType);
			animalList.push(animal);
			worldGrid[arrayIndex] = TILE_REPLACE_ANIMAL;
			break;
		case TILE_RABBIT:
			var rabbitsToSpawn = [];
			rabbitsToSpawn = arrayWithRange(getRoundedRandomNumberBetweenMinMax(2, 4));
			//console.log(rabbitsToSpawn);
			for (var r = 0; r < rabbitsToSpawn.length; r++) {
				animal = new rabbitClass(arrayIndex,tileType);
				animalList.push(animal);
			}
			worldGrid[arrayIndex] = TILE_REPLACE_ANIMAL;
			break;
		case TILE_JUMPING_FISH:
			animal = new jumpingFish(arrayIndex,tileType);
			animalList.push(animal);
			worldGrid[arrayIndex] = TILE_WATER;
			break;
		case TILE_ALLIGATOR:
			animal = new alligatorClass(arrayIndex,tileType);
			animalList.push(animal);
			worldGrid[arrayIndex] = TILE_WATER;
			break;
		case TILE_PINCHER_BUG:
			animal = new pincherBug(arrayIndex,tileType);
			animalList.push(animal);
			worldGrid[arrayIndex] = TILE_REPLACE_ANIMAL;
			break;
	}
}

function drawAllAnimals() {
	for (var i = 0; i < animalList.length; i++) {
		animalList[i].draw();
	}
}

function moveAllAnimals() {
	for (var i = 0; i < animalList.length; i++) {
		animalList[i].move();
	}
}
