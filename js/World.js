const TILE_W = TILE_H = 32;

const TILE_EXTEND_TREE = -01;
const TILE_NOTHING = 00;
const TILE_TREE = 01;
const TILE_FLOWER = 02;
const TILE_WEEDS = 03;

var worldCols = 25; //
var worldRows = 40; // both of these depend on level, these numbers are for level 1

var worldGrid = [];

var allLevels = [levelOne];

var currentLevelIndex = 0;

worldGrid = allLevels[currentLevelIndex];

function isTileTypeAnObstacle(tileType) {
  	switch (tileType) {
  		case TILE_EXTEND_TREE: 
		case TILE_TREE:
	  		return true;
	  		break;
  	}
}

function drawWorld() {
  	var arrayIndex = 0;
  	var drawTileX = 0;
	var drawTileY = 0;
	objectList = [];
	for(var eachRow=0;eachRow<worldRows;eachRow++) {
		for(var eachCol=0;eachCol<worldCols;eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			/*if( tileTypeHasTransparency(tileKindHere) ) {
			canvasContext.drawImage(worldPics[TILE_NOTHING],drawTileX,drawTileY);
			}*/

			if (isTileTypeAnObstacle(tileKindHere)) {
				canvasContext.drawImage(worldPics[TILE_NOTHING],drawTileX,drawTileY);
				newObject = new objectClass(useImg,drawTileX,drawTileY,
											useImg.width, useImg.height,
											tileKindHere);
				addTilesForCollisionBasedOnTileType(tileKindHere, drawTileX,drawTileY);
				objectList.push(newObject);
			} else {
				canvasContext.drawImage(useImg,drawTileX,drawTileY);
			}

			// drawGridAndTypesOfTiles(arrayIndex, drawTileX, drawTileY);
			// WARNING: Slows down game considerably
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

function rowColToArrayIndex(col, row) {
	return col + worldCols * row;
}

function getTileTypeAtPixelCoord(x,y) {
	var arrayIndex = getTileIndexAtPixelCoord(x, y);
	var tileKindHere = worldGrid[arrayIndex];
	return tileKindHere;
}

function getTileIndexAtPixelCoord(x,y) {
	var colFromX = Math.floor(x / TILE_W);
	var rowFromY = Math.floor(y / TILE_H);
	var arrayIndex = rowColToArrayIndex(colFromX, rowFromY);
	return arrayIndex;
}

function addTilesForCollisionBasedOnTileType(tileType,x,y) {
	switch (tileType) {
		case TILE_TREE:
			var arrayIndex = getTileIndexAtPixelCoord(x,y)
			worldGrid[arrayIndex - worldCols] = TILE_EXTEND_TREE;
	  		break;
  	}
}

function removeTilesForCollisionBasedOnTileType(tileType,x,y) {
	switch (tileType) {
		case TILE_TREE:
			var arrayIndex = getTileIndexAtPixelCoord(x,y)
			worldGrid[arrayIndex - worldCols] = TILE_NOTHING;
	  		break;
  	}
}

function drawGridAndTypesOfTiles(tileType,x,y) {
	var textWidth = canvasContext.measureText(tileType).width;
	var offsetYForTextHeight = 5;
	colorText(tileType,
			x + TILE_W/2 - textWidth/2,
			y + TILE_H/2 + offsetYForTextHeight/2, 
			"pink");
	canvasContext.lineWidth = 0.4;
	canvasContext.strokeStyle = 'pink';
	canvasContext.strokeRect(x, y, TILE_W, TILE_H);
}
