const TILE_W = TILE_H = 32;

const TILE_STUMP = -02
const TILE_EXTEND_COLLISION = -01;
const TILE_NOTHING = 00;
const TILE_TREE = 01;
const TILE_FLOWER = 02;
const TILE_WEEDS = 03;
const TILE_ROCK = 04;

const TILE_ANIMAL = 80; // This will need to be expanded out so that individual animals can be placed

var allLevels = [levelOne];
var currentLevelIndex = 0;

var worldCols = allLevels[currentLevelIndex].columns; //
var worldRows = allLevels[currentLevelIndex].rows; // both of these depend on level, these numbers are for level 1

var worldGrid = [];

worldGrid = allLevels[currentLevelIndex].layout;

function drawWorld() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	objectList = [];
	for (var eachRow = 0; eachRow < worldRows; eachRow++) {
		for (var eachCol = 0; eachCol < worldCols; eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			/*if( tileTypeHasTransparency(tileKindHere) ) {
			canvasContext.drawImage(worldPics[TILE_NOTHING],drawTileX,drawTileY);
			}*/

			if (tileKindHere === TILE_STUMP) {
				canvasContext.drawImage(worldPics[TILE_NOTHING], drawTileX, drawTileY);
				newObject = new objectClass(useImg, drawTileX, drawTileY,
					useImg.width, useImg.height,
					tileKindHere);
				objectList.push(newObject);
			} else if (isTileTypeAnObstacle(tileKindHere)) {
				canvasContext.drawImage(worldPics[TILE_NOTHING], drawTileX, drawTileY);
				newObject = new objectClass(useImg, drawTileX, drawTileY,
					useImg.width, useImg.height,
					tileKindHere);
				addTilesForCollisionBasedOnTileType(tileKindHere, drawTileX, drawTileY);
				objectList.push(newObject);
			} else if (isTileTypeAnAnimal(tileKindHere)) {
				canvasContext.drawImage(worldPics[TILE_NOTHING], drawTileX, drawTileY);
				newAnimal = new animalClass(useImg, drawTileX, drawTileY,
					useImg.width, useImg.height,
					arrayIndex);
				worldGrid[arrayIndex] = TILE_NOTHING;
				animalList.push(newAnimal);
			} else {
				canvasContext.drawImage(useImg, drawTileX, drawTileY);
			}

			// drawTypesOfTiles(arrayIndex, drawTileX, drawTileY);
			// drawGridOfTiles(drawTileX,drawTileY);
			// WARNING: Slows down game considerably when both used
			// uncomment to use 	
			// helps visualize the tile grid 
			// and gives info about what tile is where (use either arrayIndex or tileKindHere)	

			// add world tile effects
			/*if (tileKindHere === TILE_WHATEVER) {
			do the thing;
			}*/

			drawTileX += TILE_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += TILE_H;
		drawTileX = 0;
	} // end of for each row
} // end of drawWorld func

function isTileTypeAnObstacle(tileType) {
	switch (tileType) {
		case TILE_EXTEND_COLLISION:
		case TILE_TREE:
			return true;
			break;
	}
}

function isTileTypeAnAnimal(tileType) {
	switch (tileType) {
		case TILE_ANIMAL:
			return true;
			break;
	}
}

function addTilesForCollisionBasedOnTileType(tileType, x, y) {
	switch (tileType) {
		case TILE_TREE:
			var arrayIndex = getTileIndexAtPixelCoord(x, y)
			worldGrid[arrayIndex - worldCols] = TILE_EXTEND_COLLISION;
			break;
	}
}

function drawTypesOfTiles(tileType, x, y) {
	var textWidth = canvasContext.measureText(tileType).width;
	var offsetYForTextHeight = 5;
	colorText(tileType,
		x + TILE_W / 2 - textWidth / 2,
		y + TILE_H / 2 + offsetYForTextHeight / 2,
		"pink");
}

function drawGridOfTiles(x, y) {
	canvasContext.lineWidth = 0.4;
	canvasContext.strokeStyle = 'pink';
	canvasContext.strokeRect(x, y, TILE_W, TILE_H);
}
