const TILE_W = TILE_H = 32;

const TILE_STUMP = -02
const TILE_EXTEND_COLLISION = -01;
const TILE_NOTHING = 00;
const TILE_TREE = 01;
const TILE_FLOWER = 02;
const TILE_WEEDS = 03;
const TILE_SMALL_ROCK = 04;
const TILE_WATER = 05;

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

			if (isTileTypeAnimated(tileKindHere)) {
					var animatedTile = returnAnimatedTileSprites(tileKindHere);
					if (animatedTile == waterTiles) {
						// var forWhichRowToAnimate = 
						// function toDeterminePosition(arrayIndex to use in 
						// WorldGrid to check all 8 surrounding areas) 
						// and return what kind of water to draw
						// check PlayerClass.js ~line 76 for an example.
					}
					animatedTile.draw(drawTileX + TILE_W/2,drawTileY+TILE_H/2, 0, // TODO: 0 needs to be replaced by tileBasedNumber
										false,false,
										0,0,0,
										1,false,1,1,
										true); 
			} else if (isTileTypeAnObject(tileKindHere)) {
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
				particles, emit objects, etc.;
			}*/

			drawTileX += TILE_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += TILE_H;
		drawTileX = 0;
	} // end of for each row
} // end of drawWorld func

function isTileTypeAnObject(tileType) {
	switch (tileType) {
		case TILE_EXTEND_COLLISION:
		case TILE_TREE:
		case TILE_STUMP:
			return true;
			break;
	}
}

function isTileTypeCollidable(tileType) {
	switch (tileType) {
		case TILE_EXTEND_COLLISION:
		case TILE_TREE:
		case TILE_WATER:
			return true;
			break;
	}
}

function returnAnimatedTileSprites(tileKindHere) {
	switch (tileKindHere) {
		case TILE_WATER:
			return waterTiles; 
	}
}

function isTileTypeAnimated(tileType) {
	switch (tileType) {
		case TILE_WATER:
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
	var arrayIndex = getTileIndexAtPixelCoord(x, y)
	switch (tileType) {
		case TILE_TREE:
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
