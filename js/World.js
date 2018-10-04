const TILE_W = TILE_H = 32;

const TILE_REPLACE_ANIMATED_TILE = -08;
const TILE_REPLACE_WATERFALL = -07;
const TILE_REPLACE_WATER = -05;
const TILE_REPLACE_ANIMAL = -04;
const TILE_REPLACE_TREE = -03;
const TILE_REPLACE_STUMP = -02;
const TILE_EXTEND_COLLISION = -01;

const TILE_NOTHING = 000;
const TILE_MOON_NOTHING = 001;
const TILE_NEXT_LEVEL = 002;

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
const TILE_BOULDER_TOP_LEFT = 115;
const TILE_BOULDER_TOP = 116;
const TILE_BOULDER_TOP_RIGHT = 117;
const TILE_BOULDER_MIDDLE_LEFT = 118;
const TILE_BOULDER_MIDDLE = 119;
const TILE_BOULDER_MIDDLE_RIGHT = 120;
const TILE_BOULDER_BOTTOM_LEFT = 121;
const TILE_BOULDER_BOTTOM = 122;
const TILE_BOULDER_BOTTOM_RIGHT = 123;
const TILE_CRACKED_EGGS = 124;
const TILE_TWIG = 125;
const TILE_CAMERA = 126;
const TILE_CAMPFIRE = 127;
const TILE_DS_BONFIRE = 128;
const TILE_BUSH = 129;
const TILE_DIRT = 130;
const TILE_DIRT_ALT = 131;
const TILE_TALL_GRASS = 132;

// Trees
const TILE_SMALL_TREE = 200;
const TILE_SMALL_TREE_ALT = 201;
const TILE_LOLLIPOP = 202;
const TILE_TALL_TREE = 203;
const TILE_STALAGMITE = 204;
const TILE_NORMAL_TREE = 205;
const TILE_NORMAL_TREE_ALT = 206;
const TILE_PUFFY_TREE = 207;
const TILE_WILLOW_TREE = 208

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
const TILE_CLIFF_VIEW_LEFT = 324;
const TILE_CLIFF_VIEW_MIDDLE = 325;
const TILE_CLIFF_VIEW_RIGHT = 326;

// Water
const TILE_WATER = 400;
const TILE_WATERFALL_BOTTOM_LEFT = 401;
const TILE_WATERFALL_BOTTOM_CENTER = 402;
const TILE_WATERFALL_BOTTOM_RIGHT = 403;

// Path
const TILE_PATH_SIDE_LEFT = 500;
const TILE_PATH_SIDE_RIGHT = 501;
const TILE_PATH_SIDE_TOP = 502;
const TILE_PATH_SIDE_BOTTOM = 503;
const TILE_PATH_CORNER_OUT_TOP_LEFT = 504;
const TILE_PATH_CORNER_OUT_TOP_RIGHT = 505;
const TILE_PATH_CORNER_OUT_BOTTOM_RIGHT = 506;
const TILE_PATH_CORNER_OUT_BOTTOM_LEFT = 507;
const TILE_PATH_CORNER_IN_TOP_LEFT = 508;
const TILE_PATH_CORNER_IN_TOP_RIGHT = 509;
const TILE_PATH_CORNER_IN_BOTTOM_RIGHT = 510;
const TILE_PATH_CORNER_IN_BOTTOM_LEFT = 511;

// Stumps
const TILE_STUMP = 600;
const TILE_STUMP_ALT = 601;
const TILE_LOLLIPOP_STUMP = 602;
const TILE_STALAGMITE_STUMP = 603;
const TILE_NORMAL_STUMP = 604;
const TILE_NORMAL_STUMP_ALT = 605;
const TILE_PUFFY_STUMP = 606;
const TILE_WILLOW_STUMP = 607;

// Moon Tils
const TILE_MOON_CRATERS_1 = 700;
const TILE_MOON_CRATERS_2 = 701;
const TILE_MOON_CRATERS_3 = 702;

// Animals
const TILE_DEATH_CAT = 800;
const TILE_STEBS_BIRD = 801;
const TILE_RABBIT = 802;
const TILE_JUMPING_FISH = 803;
const TILE_ALLIGATOR = 804;
const TILE_PINCHER_BUG = 805;
const TILE_BEAR = 806;

var allLevels = [mainMenu,mountainBase,testLevel];
var currentLevelIndex = 0; // FIXME TODO: put back to zero when not testing level 2

var worldCols = allLevels[currentLevelIndex].columns; //
var worldRows = allLevels[currentLevelIndex].rows; // both of these depend on level, these numbers are for level 1

var worldGrid = [];

console.log("Current level: " + currentLevelIndex + " size: " + worldCols + 'x' + worldRows); 

worldGrid = Array.from(allLevels[currentLevelIndex].layout);

var water = 0;
var waterfallBottomLeft = 1;
var waterfallBottomRight = 2;
var waterfallBottomCenter = 3;
var camera = 4;
var campfire = 5;
var dsBonfire = 6;
var animatedTileList = [];

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
				setupAnimatedTiles(tileKindHere,drawTileX,drawTileY,arrayIndex);
			} else if (isTileTypeAnObject(tileKindHere)) {
				canvasContext.drawImage(worldPics[TILE_NOTHING], drawTileX, drawTileY);
				spawnObjectBasedOnTile(tileKindHere, arrayIndex, worldGrid[arrayIndex - worldCols])
				addTilesForCollisionBasedOnTileType(tileKindHere, drawTileX, drawTileY);
			} else if (isTileTypeAnAnimal(tileKindHere)) {
				spawnAnimalBasedOnTile(tileKindHere,arrayIndex);
			} else if (tileKindHere == TILE_EXTEND_COLLISION) {
				for (var i = 0; i < objectList.length; i++) {
					if (objectList[i].arrayIndex == (arrayIndex + worldCols)) {
						useImg = worldPics[objectList[i].hiddenTile];
					}
				}
				canvasContext.drawImage(useImg, drawTileX, drawTileY);
			} else {
				canvasContext.drawImage(useImg, drawTileX, drawTileY);
				if(debug && tileKindHere == TILE_NEXT_LEVEL){
					drawRect(drawTileX, drawTileY, TILE_W, TILE_H, 'yellow');
				}
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
		case TILE_TALL_TREE:
		case TILE_LOLLIPOP:
		case TILE_STALAGMITE:
		case TILE_NORMAL_TREE:
		case TILE_NORMAL_TREE_ALT:
		case TILE_WILLOW_TREE:
		case TILE_PUFFY_TREE:
		case TILE_STUMP:
		case TILE_STUMP_ALT:
		case TILE_LOLLIPOP_STUMP:
		case TILE_STALAGMITE_STUMP:
		case TILE_NORMAL_STUMP:
		case TILE_NORMAL_STUMP_ALT:
		case TILE_WILLOW_STUMP:
		case TILE_PUFFY_STUMP:
			return true;
			break;
	}
}

function isTileTypeAnimated(tileType) {
	switch (tileType) {
		case TILE_WATER:
		case TILE_WATERFALL_BOTTOM_LEFT:
		case TILE_WATERFALL_BOTTOM_CENTER:
		case TILE_WATERFALL_BOTTOM_RIGHT:
		case TILE_CAMERA:
		case TILE_CAMPFIRE:
		case TILE_DS_BONFIRE:
			return true;
			break;
	}
}

function returnAnimatedTileSprites(tileKindHere) {
	switch (tileKindHere) {
		case TILE_WATER:
			return water;
		break;
		case TILE_WATERFALL_BOTTOM_LEFT:
			return waterfallBottomLeft;
		break;
		case TILE_WATERFALL_BOTTOM_CENTER:
			return waterfallBottomCenter;
		break;
		case TILE_WATERFALL_BOTTOM_RIGHT:
			return waterfallBottomRight;
		break;
		case TILE_CAMERA:
			return camera;
		break;
		case TILE_CAMPFIRE:
			return campfire;
		break;
		case TILE_DS_BONFIRE:
			return dsBonfire;
		break;
	}
}

function setupAnimatedTiles(tileType, drawTileX, drawTileY, arrayIndex) {
	var animatedTile = returnAnimatedTileSprites(tileType);
	switch (animatedTile) {
		case water:
			newAnimatedTile = new AnimatedSpriteClass({
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
			animatedTileList.push(newAnimatedTile);
			break;
		case waterfallBottomLeft:
			newAnimatedTile = new AnimatedSpriteClass({
				name: "waterfallBL",
				spriteSheet: gamePics.waterfallBottomLeftSpritesheet,
				animationColFrames: 3,
				framesUntilNext: 12,
				x: drawTileX + TILE_W/2,
				y: drawTileY + TILE_H/2,
				arrayIndex: arrayIndex,
				tileType: TILE_WATERFALL_BOTTOM_LEFT
			});
			worldGrid[arrayIndex] = TILE_REPLACE_ANIMATED_TILE;
			animatedTileList.push(newAnimatedTile);
			break;
		case waterfallBottomCenter:
				newAnimatedTile = new AnimatedSpriteClass({
				name: "waterfallBC",
				spriteSheet: gamePics.waterfallBottomCenterSpritesheet,
				animationColFrames: 3,
				framesUntilNext: 12,
				x: drawTileX + TILE_W/2,
				y: drawTileY + TILE_H/2,
				arrayIndex: arrayIndex,
				tileType: TILE_WATERFALL_BOTTOM_CENTER
			});
			worldGrid[arrayIndex] = TILE_REPLACE_ANIMATED_TILE;
			animatedTileList.push(newAnimatedTile);
			break;
		case waterfallBottomRight:
			newAnimatedTile = new AnimatedSpriteClass({
				name: "waterfallBR",
				spriteSheet: gamePics.waterfallBottomRightSpritesheet,
				animationColFrames: 3,
				framesUntilNext: 12,
				x: drawTileX + TILE_W/2,
				y: drawTileY + TILE_H/2,
				arrayIndex: arrayIndex,
				tileType: TILE_WATERFALL_BOTTOM_RIGHT
			});
			worldGrid[arrayIndex] = TILE_REPLACE_ANIMATED_TILE;
			animatedTileList.push(newAnimatedTile);
			break;
		case camera:
			newAnimatedTile = new AnimatedSpriteClass({
				name: "camera",
				spriteSheet: gamePics.cameraSpritesheet,
				animationColFrames: 2,
				framesUntilNext: 4,
				framesBetweenLoops: 150,
				x: drawTileX + TILE_W/2,
				y: drawTileY + TILE_H/2,
				arrayIndex: arrayIndex,
				tileType: TILE_CAMERA
			});
			worldGrid[arrayIndex] = TILE_REPLACE_ANIMATED_TILE;
			animatedTileList.push(newAnimatedTile);
			break;
		case campfire:
			newAnimatedTile = new AnimatedSpriteClass({
				name: "campfire",
				spriteSheet: gamePics.campfireSpritesheet,
				animationColFrames: 4,
				framesUntilNext: 10,
				x: drawTileX + TILE_W/2,
				y: drawTileY + TILE_H/2,
				arrayIndex: arrayIndex,
				tileType: TILE_CAMPFIRE,
				makesNoise: true,
				noise: campfireSFX
			});
			worldGrid[arrayIndex] = TILE_REPLACE_ANIMATED_TILE;
			animatedTileList.push(newAnimatedTile);
			break;
		case dsBonfire:
			newAnimatedTile = new AnimatedSpriteClass({
				name: "dsBonfire",
				spriteSheet: gamePics.dsBonfireSpritesheet,
				animationColFrames: 4,
				framesUntilNext: 15,
				x: drawTileX + TILE_W/2,
				y: drawTileY + TILE_H/2,
				arrayIndex: arrayIndex,
				tileType: TILE_DS_BONFIRE
			});
			worldGrid[arrayIndex] = TILE_REPLACE_ANIMATED_TILE;
			animatedTileList.push(newAnimatedTile);
			break;
	}
}

function getArrayIndexFromList(tileTypeToCheck, ListToCheck) {
	for (var i = 0; i < ListToCheck.length; i++) {
		if (ListToCheck[i].tileType === tileTypeToCheck) {
			return ListToCheck[i].arrayIndex;
		}
	}
}

function isTileTypeAnAnimal(tileType) {
	switch (tileType) {
		case TILE_DEATH_CAT:
		case TILE_STEBS_BIRD:
		case TILE_RABBIT:
		case TILE_JUMPING_FISH:
		case TILE_ALLIGATOR:
		case TILE_PINCHER_BUG:
		case TILE_BEAR:
			return true;
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
		if (worldGrid[animatedTileList[i].arrayIndex] == TILE_REPLACE_ANIMATED_TILE ||
			worldGrid[animatedTileList[i].arrayIndex] == TILE_REPLACE_WATER) {
			if (animatedTileList[i].tileType == TILE_WATER) {
				fromWhichRowToAnimate = determineWaterTileSurroundings(animatedTileList[i].arrayIndex);
				opacity = canvasContext.globalAlpha;
				animatedTileList[i].draw(animatedTileList[i].x,animatedTileList[i].y, fromWhichRowToAnimate,
				false,false,
				0,0,0,
				opacity,false,1,1,
				true);
			} else {
				animatedTileList[i].draw(animatedTileList[i].x,animatedTileList[i].y);
			}
			if (animatedTileList[i].makesNoise) {
				var radius = 128;
				if (debug) {
					outlineCircle(animatedTileList[i].x,animatedTileList[i].y, radius, "green",1);
				}
				var center = indexToCenteredXY(animatedTileList[i].arrayIndex)
				var distX = Math.abs(center.x - player.x);
				var distY = Math.abs(center.y - player.y);
				var diffX = distX - player.width/4;
				var diffY = distY - player.height/2;
				if ((diffX*diffX+diffY*diffY)<=(radius*radius)) {
					var distToVolume = 1/distX * 10 - .05;
					var volumeMax = 0.4;
					if (distToVolume > volumeMax) {
						distToVolume = volumeMax;
					}
					//console.log(distToVolume);
					animatedTileList[i].noise.volume = distToVolume; 
					animatedTileList[i].noise.play(); 
				} else {
					animatedTileList[i].noise.pause();
				}
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
	canvasContext.strokeStyle = "pink";
	canvasContext.strokeRect(x, y, TILE_W, TILE_H);
}

function advanceLevel() {
	animalList = [];
	objectList = [];
	animatedTileList = [];
	particleList = [];
	currentLevelIndex = (currentLevelIndex + 1) % allLevels.length;
	worldGrid = Array.from(allLevels[currentLevelIndex].layout);
	worldCols = allLevels[currentLevelIndex].columns; 
	worldRows = allLevels[currentLevelIndex].rows;
	treesCutThisLevel = 0;
	//console.log(objectList);
	var levelStartPosition = indexToCenteredXY(allLevels[currentLevelIndex].playerStartArrayIndex);
	player.x = levelStartPosition.x;
	player.y = levelStartPosition.y;
	resetCountdownTimer();
}
