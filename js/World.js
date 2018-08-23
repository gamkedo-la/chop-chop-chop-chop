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
					var fromWhichRowToAnimate = 0;
					if (animatedTile.animationRowFrames > 1) {
						if (animatedTile == waterTiles) {
						// fromWhichRowToAnimate = determineTileSurroundings(arrayIndex);
						// var fromWhichRowToAnimate = 
						// function toDeterminePosition(arrayIndex to use in 
						// WorldGrid to check all 8 surrounding areas) 
						// and return what kind of water to draw
						// check PlayerClass.js ~line 76 for an example.
						}
					}
					animatedTile.draw(drawTileX + TILE_W/2,drawTileY+TILE_H/2, fromWhichRowToAnimate, // TODO: 0 needs to be replaced by tileBasedNumber
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

/*function determineTileSurroundings(arrayIndex) {
	var tileLeft = worldGrid[arrayIndex - 1]; // 
	var tileRight = worldGrid[arrayIndex + 1]; //
	var tileUp = worldGrid[arrayIndex - worldCols]; //
	var tileDown = worldGrid[arrayIndex + worldCols]; // checks in a + around tile's location
	
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
	} 
}*/

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
