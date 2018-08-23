function playerClass() {
	this.x = SCREEN_W/2;
	this.y = SCREEN_H/2 + 100;
	this.speed = 6;
	var walkIntoTileType = TILE_TREE;
	this.image = gamePics.playerImage;
	this.width = this.image.width;
	this.height = this.image.height;
	const NORTH = "north";
	const EAST = "east";
	const WEST = "west";
	const SOUTH = "south";
	this.direction = WEST; // direction helps prioritize chop
	this.state = {
		still: false
	};
	this.AABB = {
		topLeft: { x: this.x - this.width/4, y: this.y - this.height/2 },
		topRight: { x: this.x + this.width/4, y: this.y - this.height/2 },
		bottomRight: { x: this.x + this.width/4, y: this.y + this.height/2 },
		bottomLeft: { x: this.x - this.width/4, y: this.y + this.height/2 },
	}

	this.move = function() {
		var movementX = 0;
        var movementY = 0;

        if (!this.state.still) {
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
		} else {
			return;
		}

		var nextX = Math.round(this.x + movementX);
        var nextY = Math.round(this.y + movementY);

        if (nextX < 0 || nextX > worldCols * TILE_W) {
        	nextX = this.x;
        }

        if (nextY < 0 || nextY > worldRows * TILE_H) {
        	nextY = this.y;
        }

        var walkIntoTileType = getTileTypeAtPixelCoord(nextX, nextY);

        if (walkIntoTileType === undefined) {
			walkIntoTileType = TILE_EXTEND_COLLISION;
		}

		if (isTileTypeCollidable(walkIntoTileType)) {
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

		switch (this.direction) {
			case NORTH: 
				if (tileUp == TILE_TREE) { // remove tree above and extended tree tile above tree
					worldGrid[arrayIndex - worldCols] = TILE_STUMP;
					worldGrid[arrayIndex - (worldCols * 2)] = TILE_NOTHING;
					var treeXY = indexToCenteredXY(arrayIndex - worldCols);
					spawnParticles('chop', treeXY.x, treeXY.y);
				} 
				break;

			case EAST:
				if (tileRight == TILE_TREE) { // remove tree to the right and extended tile above tree
					worldGrid[arrayIndex + 1] = TILE_STUMP;
					worldGrid[arrayIndex + 1 - worldCols] = TILE_NOTHING;
					var treeXY = indexToCenteredXY(arrayIndex + 1);
					spawnParticles('chop', treeXY.x, treeXY.y);
				} 
				if (tileRight == TILE_EXTEND_COLLISION) { // remove extend tree tile to the right 
													 // and tree below extend tree tile
					worldGrid[arrayIndex + 1] = TILE_NOTHING;
					worldGrid[arrayIndex + 1 + worldCols] = TILE_STUMP;
					var treeXY = indexToCenteredXY(arrayIndex + 1);
					spawnParticles('chop', treeXY.x, treeXY.y);
				} 
				break;

			case WEST:
				if (tileLeft == TILE_TREE) { // remove tree to the left and extend tree tile above tree
					worldGrid[arrayIndex - 1] = TILE_STUMP;
					worldGrid[arrayIndex - 1 - worldCols] = TILE_NOTHING;
					var treeXY = indexToCenteredXY(arrayIndex - 1);
					spawnParticles('chop', treeXY.x, treeXY.y);
				}
				if (tileLeft == TILE_EXTEND_COLLISION) {	// remove extend tree tile to the left 
													// and tree below extend tree tile
					worldGrid[arrayIndex - 1] = TILE_NOTHING;
					worldGrid[arrayIndex - 1 + worldCols] = TILE_STUMP;
					var treeXY = indexToCenteredXY(arrayIndex - 1);
					spawnParticles('chop', treeXY.x, treeXY.y);
				}
				break;

			case SOUTH:
				if (tileDown == TILE_EXTEND_COLLISION) { // remove extend tree tile above 
													// and tree below extend tree tile
					worldGrid[arrayIndex + worldCols] = TILE_NOTHING;
					worldGrid[arrayIndex + (worldCols * 2)] = TILE_STUMP;
					var treeXY = indexToCenteredXY(arrayIndex + worldCols);
					spawnParticles('chop', treeXY.x, treeXY.y);
				}
				break;
		} // end of switch cases
	} // end of chopTreesAroundPlayer

	this.draw = function() {
		if (this.direction == EAST && spacebarKeyHeld) {
			this.state.still = true;
			playerSideChop.draw(this.x,this.y, 1);
		} else if (this.direction == WEST && spacebarKeyHeld) {
			this.state.still = true;
			playerSideChop.draw(this.x, this.y, 1,true)  
		} else {
			canvasContext.drawImage(this.image,this.x - this.image.width/2,this.y - this.image.height/2);
		}
		drawRect(this.x - 3/2,this.y - 3/2, 3,3, "red");

	}
} // end of objectClass
