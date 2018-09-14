function projectileClass (x,y, direction) {
	this.y = y;
	this.speed = 10;
	this.x = (direction == "west") ? x - this.speed : x + this.speed;
	this.startingPointX = this.x;
	this.img = maxAxeProjectile;
	this.width = this.img.spriteSheet.width / this.img.animationColFrames;
	this.height = this.img.spriteSheet.height;
	this.direction = direction;
	this.remove = false;
	this.changedDirection = false;

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
				this.remove = true;
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
				this.remove = true;
			}
		}
		this.axeHitbox.update(this.x, this.y);
	} // end of this.move function
} // end of projectileClass
