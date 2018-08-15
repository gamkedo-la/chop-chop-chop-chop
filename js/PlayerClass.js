function playerClass() {
	this.x = SCREEN_W/2;
	this.y = SCREEN_H/2;
	this.speed = 6;
	var walkIntoTileType = TILE_TREE;
	this.image = gamePics.playerImage;
	this.width = this.image.width;
	this.height = this.image.height;
	const NORTH = "north";
	const EAST = "east";
	const WEST = "west";
	const SOUTH = "south";
	this.direction = WEST; // direction helps prioritze attack

	/*this.setCollisionBox = function() {
		this.collisionBox.topLeft = this.x + 
	}*/

	this.move = function() {
		var movementX = 0;
        var movementY = 0;

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
			this.direction = NORTH;
		}
		if (downKeyHeld) {
			movementY += this.speed;
			this.direction = SOUTH;
		}

		var nextX = Math.round(this.x + movementX);
        var nextY = Math.round(this.y + movementY);

        var walkIntoTileType = getTileTypeAtPixelCoord(nextX, nextY);

        if (walkIntoTileType === undefined) {
			walkIntoTileType = TILE_EXTEND_COLLISION;
		}

		if (isTileTypeAnObstacle(walkIntoTileType)) {
			this.x = this.x;
			this.y = this.y;
		} else {
			this.x = nextX;
			this.y = nextY;
		}

		//console.log("player direction: " + this.direction);
	}

	this.chopTreesAroundPlayer = function() {
		var arrayIndex = getTileIndexAtPixelCoord(this.x,this.y);
		var tileLeft = worldGrid[arrayIndex - 1]; // 
		var tileRight = worldGrid[arrayIndex + 1]; //
		var tileUp = worldGrid[arrayIndex - worldCols]; //
		var tileDown = worldGrid[arrayIndex + worldCols]; // checks in a + around player's location
		//if (tileUp || tileRight || tileLeft || tileDown == ) 
		
	}

	this.draw = function() {
		canvasContext.drawImage(this.image,this.x - this.image.width/2,this.y - this.image.height/2);
		drawRect(this.x,this.y, 3,3, "red");
	}
} // end of objectClass