function playerClass() {
	this.x = SCREEN_W/2;
	this.y = SCREEN_H/2;
	this.speed = 6;
	this.image = gamePics.playerImage;
	this.width = this.image.width;
	this.height = this.image.height;

	/*this.setCollisionBox = function() {
		this.collisionBox.topLeft = this.x + 
	}*/

	this.move = function() {
		if (leftKeyHeld) {
			this.x -= this.speed;
		}
		if (rightKeyHeld) {
			this.x += this.speed;
		}
		if (upKeyHeld) {
			this.y -= this.speed;
		}
		if (downKeyHeld) {
			this.y += this.speed;
		}
	}

	this.draw = function() {
		canvasContext.drawImage(this.image,this.x,this.y);
	}
} // end of objectClass