var animalList = [];

function animalClass (img,width,height,arrayIndex) {
	this.home = indexToCenteredXY(arrayIndex);
	this.x = this.home.x;
	this.y = this.home.y;
	this.img = img;
	this.width = width;
	this.height = height;
	this.centerX = this.x - this.width / 2;
	this.centerY = this.y - this.height / 2;
	this.speed = 3;
	this.detectionRadius = this.width * 6;
	this.playerDetected = false;
	this.waiting = false;
	this.meander = true;
	this.waitingTimer = 45; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.homeRadius = this.detectionRadius * 2;
	this.idleRadius = this.width/2;
	this.idleTimer = 90; // frames
	var idleTimerFull = this.idleTimer;
	this.idlePosition = {x: this.home.x, y: this.home.y};
	var colliderWidth = this.width;
	var colliderHeight = this.height;
	var colliderOffsetX = 0;
	var colliderOffsetY = 0;
	this.hitbox = new colliderClass(this.x,this.y,
		colliderWidth,colliderHeight,colliderOffsetX,colliderOffsetY);
	// some of these vars will depend on the animal type and will be fleshed out in inherited classes

	this.draw = function () {
		if (this.meander || this.playerDetected || this.waiting) {
			this.img.draw(this.x,this.y);
	  }
		drawRect(this.home.x, this.home.y,1,1, "teal");
		this.hitbox.draw("green");
		outlineCircle(this.x,this.y, this.detectionRadius, "green",1);
		outlineCircle(this.home.x,this.home.y, this.homeRadius, "blue",1);
	} // end of draw function


	this.move = function() {
		this.detectionRadiusTrigger();
		this.homeRadiusTrigger();
		var closeToHome = 2;
		if (this.playerDetected) {
			this.meander = false;
			this.img.framesUntilNext = 8;
			var moveXTowardPlayer = this.x < player.x ? this.speed : -this.speed;
			var moveYTowardPlayer = this.y < player.y ? this.speed : -this.speed;
			 if (checkTileCollision(this.x,this.y,moveXTowardPlayer,moveYTowardPlayer)) {
			 	moveXTowardPlayer = 0;
			 	moveYTowardPlayer = 0;
			 }
			this.x += moveXTowardPlayer;
			this.y += moveYTowardPlayer;
			this.hitbox.update(this.x,this.y);
		} else if (this.waiting) { // else wait
				this.meander = true;
				if (this.waitingTimer == 0) {
					this.img.framesUntilNext = 25;
					this.playerDetected = false;
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
			this.meander = true;
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
			if (checkTileCollision(this.x,this.y,moveXTowardHome,moveYTowardHome)) {
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
} // end of animal class

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
