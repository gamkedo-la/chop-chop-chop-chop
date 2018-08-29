const TILE_W = TILE_H = 32;

const TILE_STUMP = -02
const TILE_EXTEND_COLLISION = -01;
const TILE_NOTHING = 00;
const TILE_TREE = 01;
const TILE_FLOWER = 02;
const TILE_WEEDS = 03;
const TILE_SMALL_ROCK = 04;
const TILE_WATER = 05;
const TILE_MUSHROOM = 06;
const TILE_THORN = 07;
const TILE_LEAVES = 08;
const TILE_PILE_OF_LEAVES = 09;
const TILE_PILE_OF_LEAVES_2 = 10;
const TILE_PILE_OF_LEAVES_3 = 11;

const TILE_ANIMAL = 80; // This will need to be expanded out so that individual animals can be placed
const TILE_PLACEHOLDER_DEATH_CAT = 81;
const TILE_STEBS_BIRD = 82;


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
	for (var eachRow = 0; eachRow < worldRows; eachRow++) {
		for (var eachCol = 0; eachCol < worldCols; eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			if (isTileTypeAnimated(tileKindHere)) {
					var animatedTile = returnAnimatedTileSprites(tileKindHere);
					var fromWhichRowToAnimate = 1;
					if (animatedTile.animationRowFrames > 1) {
						if (animatedTile == waterTiles) {
							fromWhichRowToAnimate = determineWaterTileSurroundings(arrayIndex);
						}
					}
					animatedTile.draw(drawTileX + TILE_W/2,drawTileY+TILE_H/2, fromWhichRowToAnimate,
										false,false,
										0,0,0,
										1,false,1,1,
										true);
			} else if (isTileTypeAnObject(tileKindHere)) {
				canvasContext.drawImage(worldPics[TILE_NOTHING], drawTileX, drawTileY);
				newObject = new objectClass(useImg, drawTileX, drawTileY,
					useImg.width, useImg.height,
					tileKindHere, arrayIndex);
				worldGrid[arrayIndex] = TILE_NOTHING;
				addTilesForCollisionBasedOnTileType(tileKindHere, drawTileX, drawTileY);
				objectList.push(newObject);
			} else if (isTileTypeAnAnimal(tileKindHere)) {
				canvasContext.drawImage(worldPics[TILE_NOTHING], drawTileX, drawTileY);
				useImg = whatAnimal(tileKindHere);
				var newAnimal = new animalClass(useImg, 
					useImg.spriteSheet.width/useImg.animationColFrames,
					useImg.spriteSheet.height/useImg.animationRowFrames, 
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

function whatAnimal(tileType) {
	switch (tileType) {
		case TILE_ANIMAL:
			break;
		case TILE_PLACEHOLDER_DEATH_CAT:
			return placeholderDeathCatMeander;
			break;
		case TILE_STEBS_BIRD:
			return stebsBird;
			break;
	}
}

function isTileTypeAnAnimal(tileType) {
	switch (tileType) {
		case TILE_ANIMAL:
		case TILE_PLACEHOLDER_DEATH_CAT:
		case TILE_STEBS_BIRD:
			return true;
			break;
	}
}

function addTilesForCollisionBasedOnTileType(tileType, x, y) {
	var arrayIndex = getTileIndexAtPixelCoord(x, y)
	switch (tileType) {
		case TILE_TREE:
			worldGrid[arrayIndex] = TILE_EXTEND_COLLISION;
			worldGrid[arrayIndex - worldCols] = TILE_EXTEND_COLLISION;
			break;
	}
}

function determineWaterTileSurroundings(arrayIndex) {
	var tileLeft = worldGrid[arrayIndex - 1]; //
	var tileRight = worldGrid[arrayIndex + 1]; //
	var tileUp = worldGrid[arrayIndex - worldCols]; //
	var tileDown = worldGrid[arrayIndex + worldCols]; // checks in a + around tile's location
	var crossOfTiles = [tileLeft,tileRight,tileUp,tileDown];
	var waterLeft = false;
	var waterRight = false;
	var waterUp = false;
	var waterDown = false;
	for (var i = 0; i < crossOfTiles.length; i++) {
		if (crossOfTiles[i] == TILE_WATER) {
			if (i == 0) {
				waterLeft = true;
			}
			if (i == 1) {
				waterRight = true;
			}
			if (i == 2) {
				waterUp = true;
			}
			if (i == 3) {
				waterDown = true;
			}
		} // end of if tile at array index is water
	} // end of crossTiles for loop

	// [left,right,up,down];
	if (waterLeft == false && waterRight == false &&
		waterUp == false && waterDown == false
		||
		waterLeft == true && waterRight == true &&
		waterUp == true && waterDown == true
		) {
		return 1; // first Row
	}
/*	if (crossOfTiles == [0,0,0,0]) { // TODO: distinguish between
									 // vertical and horizontal water tiles
									 // (one art style for both?)
		return 2; // second Row
	}*/
	if (waterLeft == true && waterRight == true &&
		waterUp == false && waterDown == true) {
		return 3; // and so on...
	}
	if (waterLeft == false && waterRight == true &&
		waterUp == false && waterDown == true) {
		return 4;
	}
	if (waterLeft == true && waterRight == false &&
		waterUp == false && waterDown == true ) {
		return 5;
	}
	if (waterLeft == true && waterRight == true &&
		waterUp == true && waterDown == false) {
		return 6;
	}
	if (waterLeft == false && waterRight == true &&
		waterUp == true && waterDown == false) {
		return 7;
	}
	if (waterLeft == true && waterRight == false &&
		waterUp == true && waterDown == false) {
		return 8;
	}
	if (waterLeft == false && waterRight == true &&
		waterUp == true && waterDown == true) {
		return 9;
	}
	if (waterLeft == true && waterRight == false &&
		waterUp == true && waterDown == true) {
		return 10;
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
