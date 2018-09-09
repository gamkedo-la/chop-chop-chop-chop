const TILE_W = TILE_H = 32;

const TILE_REPLACE_WATERFALL = -08;
const TILE_REPLACE_WATER = -07;
const TILE_REPLACE_ANIMAL = -06;
const TILE_REPLACE_TREE = -05;
const TILE_REPLACE_STUMP = -04;
const TILE_STUMP_ALT = -03;
const TILE_STUMP = -02;
const TILE_EXTEND_COLLISION = -01;

const TILE_NOTHING = 000;

// Ground Objects
const TILE_FLOWER = 100;
const TILE_WEEDS = 101;
const TILE_SMALL_ROCK = 102;
const TILE_MUSHROOM = 103;
const TILE_THORN = 104;
const TILE_LEAVES = 105;
const TILE_PILE_OF_LEAVES = 106;
const TILE_PILE_OF_LEAVES_2 = 107;
const TILE_PILE_OF_LEAVES_3 = 108;
const TILE_PUMPKIN = 109;
const TILE_JACK_O = 110;
const TILE_ROCK_PILE_ROUGH = 111;
const TILE_ROCK_PILE_ROUGH_ALT = 112;
const TILE_ROCK_PILE_SMOOTH = 113;
const TILE_ROCK_PILE_SMOOTH_ALT = 114;
const TILE_PATH = 115;
const TILE_PATH_CORNER_OUT = 116;
const TILE_PATH_CORNER_IN = 117;

//Trees
const TILE_SMALL_TREE = 200;
const TILE_SMALL_TREE_ALT = 201;

// Cliffs,Pits and Waterfalls
const TILE_CLIFF_TOP_LEFT = 300;
const TILE_CLIFF_TOP = 301;
const TILE_CLIFF_TOP_RIGHT = 302;
const TILE_CLIFF_RIGHT = 303;
const TILE_CLIFF_BOTTOM_RIGHT = 304;
const TILE_CLIFF_BOTTOM = 305;
const TILE_CLIFF_BOTTOM_LEFT = 306;
const TILE_CLIFF_LEFT = 307;
const TILE_CLIFF_TOP_LEFT_2 = 308;
const TILE_CLIFF_TOP_LEFT_3 = 309;
const TILE_CLIFF_TOP_RIGHT_2 = 310;
const TILE_CLIFF_TOP_RIGHT_3 = 311;
const TILE_CLIFF_BOTTOM_RIGHT_2 = 312;
const TILE_CLIFF_BOTTOM_RIGHT_3 = 313;
const TILE_CLIFF_BOTTOM_LEFT_2 = 314;
const TILE_CLIFF_BOTTOM_LEFT_3 = 315;
const TILE_PIT_TOP_LEFT = 316;
const TILE_PIT_TOP = 317;
const TILE_PIT_TOP_RIGHT = 318;
const TILE_PIT_RIGHT = 319;
const TILE_PIT_BOTTOM_RIGHT = 320;
const TILE_PIT_BOTTOM = 321;
const TILE_PIT_BOTTOM_LEFT = 322;
const TILE_PIT_LEFT = 323;

// Water
const TILE_WATER = 400;
const TILE_WATERFALL_BOTTOM_LEFT = 401;
const TILE_WATERFALL_BOTTOM_CENTER = 402;
const TILE_WATERFALL_BOTTOM_RIGHT = 403;

// Animals
const TILE_PLACEHOLDER_DEATH_CAT = 800;
const TILE_STEBS_BIRD = 801;


var allLevels = [mountainBase,randomForest];
var currentLevelIndex = 0; // FIXME TODO: put back to zero when not testing level 2

var worldCols = allLevels[currentLevelIndex].columns; //
var worldRows = allLevels[currentLevelIndex].rows; // both of these depend on level, these numbers are for level 1

var worldGrid = [];

console.log("Current level: " + currentLevelIndex + " size: " + worldCols + 'x' + worldRows); 

worldGrid = allLevels[currentLevelIndex].layout;

var water = 0;
var waterfallBottomLeft = 1;
var waterfallBottomRight = 2;
var waterfallBottomCenter = 3;
var animatedTileList = [];

function drawWorld() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	var nextEnemy = null;
	for (var eachRow = 0; eachRow < worldRows; eachRow++) {
		for (var eachCol = 0; eachCol < worldCols; eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];
			if (isTileTypeAnimated(tileKindHere)) {
				setupAnimatedTiles(tileKindHere,drawTileX,drawTileY,arrayIndex);
			} else if (isTileTypeAnObject(tileKindHere)) {
				canvasContext.drawImage(worldPics[TILE_NOTHING], drawTileX, drawTileY);
				newObject = new objectClass(useImg, drawTileX, drawTileY,
					useImg.width, useImg.height,
					tileKindHere, arrayIndex, worldGrid[arrayIndex - worldCols]);
				addTilesForCollisionBasedOnTileType(tileKindHere, drawTileX, drawTileY);
				newObject.replaceTiles();
				objectList.push(newObject);
			} else if (isTileTypeAnAnimal(tileKindHere)) {
				spawnAnimalBasedOnTile(tileKindHere,arrayIndex);
				worldGrid[arrayIndex] = TILE_REPLACE_ANIMAL;
			} else if (tileKindHere == TILE_EXTEND_COLLISION) {
				for (var i = 0; i < objectList.length; i++) {
					if (objectList[i].arrayIndex == (arrayIndex + worldCols)) {
						useImg = worldPics[objectList[i].hiddenTile];
					}
				}
				canvasContext.drawImage(useImg, drawTileX, drawTileY);
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
		case TILE_SMALL_TREE:
		case TILE_SMALL_TREE_ALT:
		case TILE_STUMP:
		case TILE_STUMP_ALT:
			return true;
			break;
	}
}

function returnAnimatedTileSprites(tileKindHere) {
	switch (tileKindHere) {
		case TILE_WATER:
			return water;
		case TILE_WATERFALL_BOTTOM_LEFT:
			return waterfallBottomLeft;
			break;
		case TILE_WATERFALL_BOTTOM_CENTER:
			return waterfallBottomCenter;
			break;
		case TILE_WATERFALL_BOTTOM_RIGHT:
			return waterfallBottomRight;
			break;
	}
}

function isTileTypeAnimated(tileType) {
	switch (tileType) {
		case TILE_WATER:
		case TILE_WATERFALL_BOTTOM_LEFT:
		case TILE_WATERFALL_BOTTOM_CENTER:
		case TILE_WATERFALL_BOTTOM_RIGHT:
			return true;
			break;
	}
}

function setupAnimatedTiles(tileType, drawTileX, drawTileY, arrayIndex) {
	var animatedTile = returnAnimatedTileSprites(tileType);
	var fromWhichRowToAnimate = 1;
	switch (animatedTile) {
		case water:
			animatedTile = new AnimatedSpriteClass({
				name: "waterTiles",
				spriteSheet: gamePics.waterTilesSpritesheet,
				animationRowFrames: 10,
				animationColFrames: 3,
				framesUntilNext: 22,
				x: drawTileX + TILE_W/2,
				y: drawTileY + TILE_H/2,
				arrayIndex: arrayIndex,
				tileType: TILE_WATER
			});
			worldGrid[arrayIndex] = TILE_REPLACE_WATER;
			animatedTileList.push(animatedTile);
			break;
		case waterfallBottomLeft:
			animatedTile = new AnimatedSpriteClass({
				name: "waterfallBL",
				spriteSheet: gamePics.waterfallBottomLeftSpritesheet,
				animationColFrames: 3,
				framesUntilNext: 12,
				x: drawTileX + TILE_W/2,
				y: drawTileY + TILE_H/2,
				arrayIndex: arrayIndex,
				tileType: TILE_WATERFALL_BOTTOM_LEFT
			});
			worldGrid[arrayIndex] = TILE_REPLACE_WATERFALL;
			animatedTileList.push(animatedTile);
			break;
		case waterfallBottomCenter:
				animatedTile = new AnimatedSpriteClass({
				name: "waterfallBC",
				spriteSheet: gamePics.waterfallBottomCenterSpritesheet,
				animationColFrames: 3,
				framesUntilNext: 12,
				x: drawTileX + TILE_W/2,
				y: drawTileY + TILE_H/2,
				arrayIndex: arrayIndex,
				tileType: TILE_WATERFALL_BOTTOM_CENTER
			});
			worldGrid[arrayIndex] = TILE_REPLACE_WATERFALL;
			animatedTileList.push(animatedTile);
			break;
		case waterfallBottomRight:
			animatedTile = new AnimatedSpriteClass({
				name: "waterfallBR",
				spriteSheet: gamePics.waterfallBottomRightSpritesheet,
				animationColFrames: 3,
				framesUntilNext: 12,
				x: drawTileX + TILE_W/2,
				y: drawTileY + TILE_H/2,
				arrayIndex: arrayIndex,
				tileType: TILE_WATERFALL_BOTTOM_RIGHT
			});
			worldGrid[arrayIndex] = TILE_REPLACE_WATERFALL;
			animatedTileList.push(animatedTile);
			break;
	}
}

function isTileTypeAnAnimal(tileType) {
	switch (tileType) {
		case TILE_PLACEHOLDER_DEATH_CAT:
		case TILE_STEBS_BIRD:
			return true;
			break;
	}
}

function spawnAnimalBasedOnTile(tileType, arrayIndex) {
	switch (tileType) {
		case TILE_PLACEHOLDER_DEATH_CAT:
			animal = new deathCat(arrayIndex,tileType);
			animalList.push(animal);
			break;
		case TILE_STEBS_BIRD:
			animal = new bigBird(arrayIndex,tileType);
			animalList.push(animal);
			break;
	}
}

function addTilesForCollisionBasedOnTileType(tileType, x, y) {
	var arrayIndex = getTileIndexAtPixelCoord(x, y)
	switch (tileType) {
		case TILE_SMALL_TREE:
		case TILE_SMALL_TREE_ALT:
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
		if (crossOfTiles[i] == TILE_WATER || crossOfTiles[i] == TILE_REPLACE_WATER) {
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
/*	if (crossOfTiles == [0,0,0,0]) { 
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

function drawAnimatedTiles() {
	for (var i = 0; i < animatedTileList.length; i++) {
		var fromWhichRowToAnimate = 1;
		if (worldGrid[animatedTileList[i].arrayIndex] == TILE_REPLACE_WATER || 
			worldGrid[animatedTileList[i].arrayIndex] == TILE_REPLACE_WATERFALL) {
			if (animatedTileList[i].tileType == TILE_WATER) {
				fromWhichRowToAnimate = determineWaterTileSurroundings(animatedTileList[i].arrayIndex);
				animatedTileList[i].draw(animatedTileList[i].x,animatedTileList[i].y, fromWhichRowToAnimate,
				false,false,
				0,0,0,
				1,false,1,1,
				true);
			} else {
				animatedTileList[i].draw(animatedTileList[i].x,animatedTileList[i].y, fromWhichRowToAnimate,
				false,false,
				0,0,0,
				1,false,1,1,
				false);
			}
		} else {
			// draw nothing
		}
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
