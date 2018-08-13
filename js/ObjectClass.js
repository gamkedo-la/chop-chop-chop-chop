var objectList = [];

function objectClass (img,width,height,worldTileType) {
	this.x = 0;
	this.y = 0;
	this.img = img;
	this.width = width;
	this.height = height;
	this.worldTileType = worldTileType;

	this.addEntityToWorldTile = function() {
		for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
			for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if (worldGrid[arrayIndex] == this.worldTileType &&
	          		worldGrid[arrayIndex] != null) {
					worldGrid[arrayIndex] = TILE_NOTHING;
					this.x = eachCol * WORLD_W + WORLD_W / 2;
					this.y = eachRow * WORLD_H + WORLD_H / 2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO START FOUND!");
	}

	/*this.setCollisionBox = function() {
		this.collisionBox.topLeft = this.x + 
	}*/

	this.draw = function() {
		canvasContext.drawImage(this.img,this.x,this.y);
	}
} // end of objectClass