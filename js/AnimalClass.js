var animalList = [];

function animalClass (img,x,y,width,height,arrayIndex) {
	this.x = x;
	this.y = y;
	this.img = img;
	this.width = width;
	this.height = height;
	this.centerX = this.x - this.width / 2;
	this.centerY = this.y - this.height / 2;
	this.speed = 3;
	this.detectionRadius = this.width * 5;
	this.playerDetected = false;
	this.waiting = false;
	this.waitingTimer = 45; // frames
	var waitingTimerFull = this.waitingTimer; // frames
	this.homeRadius = this.detectionRadius * 3;
	this.home = indexToCenteredXY(arrayIndex); 
	// some of these vars will depend on the animal type and will be fleshed out in inherited classes

	this.draw = function() {
		drawRect(this.x - this.width,this.y - this.height,this.width,this.height, "red");
		outlineCircle(this.x - this.width / 2,this.y - this.height / 2, this.detectionRadius, "green",1);
		outlineCircle(this.centerX,this.centerY, this.homeRadius, "blue",1);
		this.detectionRadiusTrigger();
		this.homeRadiusTrigger();
		/*canvasContext.drawImage(this.img,this.x - this.width/4,this.y - this.height/4 - TILE_H/2);*/	
	}

	this.move = function() {
		var closeToHome = 2;
		if (this.playerDetected) {
			var moveXTowardPlayer = this.x < player.x ? this.speed : -this.speed;
			var moveYTowardPlayer = this.y < player.y ? this.speed : -this.speed;
			this.x += moveXTowardPlayer;
			this.y += moveYTowardPlayer;
		} else { // else wait
			if (this.waiting) {
				if (this.waitingTimer == 0) {
					this.waiting = false;
					this.waitingTimer = waitingTimerFull;
				}
				if (this.waitingTimer > 0) {
					this.waitingTimer--;
					return;
				}
			} else { // else return home
				var moveXTowardHome = this.x < this.home.x ? this.speed : -this.speed;
				var moveYTowardHome = this.y < this.home.y ? this.speed : -this.speed;
				if (this.x <= this.home.x + closeToHome) {
					moveXTowardHome = 0;
				}
				if (this.y <= this.home.y + closeToHome) {
					moveYTowardHome = 0;
				}
				this.x += moveXTowardHome;
				this.y += moveYTowardHome;
			} // end of else return home
		} // end of else wait
	} // end of move function

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