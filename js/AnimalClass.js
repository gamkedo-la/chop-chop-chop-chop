var animalList = [];

function animalClass (newAnimal) {
	this.animal = newAnimal;
	this.home = newAnimal.home;
	this.img = newAnimal.img;
	this.width = newAnimal.width;
	this.height = newAnimal.height;
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

	this.x = this.home.x;
	this.y = this.home.y;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	
	this.centerX = this.x - this.width / 2;
	this.centerY = this.y - this.height / 2;
	
	this.waiting = false;
	this.meander = true;
	this.playerDetected = false;
	this.playerDetectedSoundPlayed = false;

	var colliderWidth = this.width;
	var colliderHeight = this.height/2;
	var colliderOffsetX = 0;
	var colliderOffsetY = this.height/8;
	this.hitbox = new colliderClass(this.x,this.y,
		colliderWidth,colliderHeight,colliderOffsetX,colliderOffsetY);

	this.draw = function () {
		if (worldGrid[this.arrayIndex] != TILE_REPLACE_ANIMAL) {
			return;
		}
		if (this.meander || this.playerDetected || this.waiting) {
			this.img.draw(this.x,this.y);
		}
		if (debug || worldEditor) {
			canvasContext.strokeStyle = "teal";
			canvasContext.lineWidth = 1;
			canvasContext.strokeRect(this.home.x - TILE_W/2, this.home.y - TILE_H/2, TILE_W, TILE_H);
			colorText("Home", this.home.x, this.home.y, "teal", "Verdana", "center");
		}
		if (debug) {
			this.hitbox.draw("green");
			outlineCircle(this.x,this.y, this.detectionRadius, "green",1);
			outlineCircle(this.home.x,this.home.y, this.homeRadius, "blue",1);
		}
	} // end of draw function


	this.move = function() {
		if (worldGrid[this.arrayIndex] != TILE_REPLACE_ANIMAL) {
			return;
		}
		this.detectionRadiusTrigger();
		this.homeRadiusTrigger();
		var closeToHome = this.speed;
		if (this.playerDetected) { // chasing player
			if (this.img.data.name === "deathCat" && this.playerDetectedSoundPlayed === false) {
				deathMeow.play();
				this.playerDetectedSoundPlayed = true;
			}
			if (this.img.data.name === "stebsBird" && this.playerDetectedSoundPlayed === false) {
				birdSound.play();
				this.playerDetectedSoundPlayed = true;
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
			this.x += moveXTowardPlayer;
			this.y += moveYTowardPlayer;
			this.hitbox.update(this.x,this.y);
			if (this.hitbox.isCollidingWith(player.hitbox)) {
				player.gotHit(this.attackPower);
			}
		} else if (this.waiting) { // else wait
				if (this.waitingTimer == 0) {
					//this.img.framesUntilNext = 25;
					this.meander = true;
					this.playerDetected = false;
					this.playerDetectedSoundPlayed = false;
					this.waiting = false;
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
			this.img.framesUntilNext = 25;
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
			this.x += moveXTowardHome;
			this.y += moveYTowardHome;
			this.hitbox.update(this.x,this.y);
		} // end of else return home
	} // end of move funtion

	this.detectionRadiusTrigger = function() {
		var radius = this.detectionRadius;
		var distX = Math.abs((this.x - this.width / 2) - player.x);
		var distY = Math.abs((this.y - this.height / 2) - player.y);
		var diffX = distX - player.width/4;
		var diffY = distY - player.height/2;

		if ((diffX*diffX+diffY*diffY)<=(radius*radius)) {
			this.playerDetected = true;
		}
	}

	this.homeRadiusTrigger = function() {
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
	TILE_SMALL_TREE_ALT,TILE_REPLACE_TREE,TILE_REPLACE_WATER,
	TILE_CLIFF_TOP_LEFT,TILE_CLIFF_TOP,TILE_CLIFF_TOP_RIGHT,
	TILE_CLIFF_LEFT,TILE_CLIFF_RIGHT,
	TILE_CLIFF_BOTTOM_LEFT,TILE_CLIFF_BOTTOM,TILE_CLIFF_BOTTOM_RIGHT,
	TILE_PIT_TOP_LEFT,TILE_PIT_TOP,TILE_PIT_TOP_RIGHT,
	TILE_PIT_LEFT,TILE_PIT_RIGHT,TILE_PIT_BOTTOM_LEFT,
	TILE_PIT_BOTTOM,TILE_PIT_BOTTOM_RIGHT,
	TILE_CLIFF_TOP_LEFT_2,TILE_CLIFF_TOP_LEFT_3,
	TILE_CLIFF_TOP_RIGHT_2,TILE_CLIFF_TOP_RIGHT_3,
	TILE_CLIFF_BOTTOM_RIGHT_2,TILE_CLIFF_BOTTOM_RIGHT_3,
	TILE_CLIFF_BOTTOM_LEFT_2,TILE_CLIFF_BOTTOM_LEFT_3,
	TILE_PIT_TOP_LEFT,TILE_PIT_TOP,TILE_PIT_TOP_RIGHT,
	TILE_PIT_RIGHT,TILE_PIT_LEFT,
	TILE_PIT_BOTTOM_RIGHT,TILE_PIT_BOTTOM,TILE_PIT_BOTTOM_LEFT,
	TILE_WATERFALL_BOTTOM_LEFT, TILE_WATERFALL_BOTTOM_CENTER,TILE_WATERFALL_BOTTOM_RIGHT,
	TILE_ROCK_PILE_ROUGH,TILE_ROCK_PILE_ROUGH_ALT,TILE_ROCK_PILE_SMOOTH,TILE_ROCK_PILE_SMOOTH_ALT];

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
