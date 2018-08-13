const WORLD_W = WORLD_H = 32;
const WORLD_COLS = 25;
const WORLD_ROWS = 19;

const TILE_NOTHING = 00;
const TILE_TREE = 01;
const TILE_FLOWER = 02;

var worldGrid = [];

var allLevels = [levelOne];

var currentLevelIndex = 0;

worldGrid = allLevels[currentLevelIndex];

function isTileTypeAnObject(tileType) {
  	switch (tileType) {
		case TILE_TREE: 
	  	return true;
	  	break;
  	}
}

function drawWorld() {
  	var arrayIndex = 0;
  	var drawTileX = 0;
	  var drawTileY = 0;
	  for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			/*if( tileTypeHasTransparency(tileKindHere) ) {
			canvasContext.drawImage(worldPics[TILE_NOTHING],drawTileX,drawTileY);
			}*/
			
			if (tileKindHere == 0) {
			// draw nothing
			} else if (isTileTypeAnObject(tileKindHere)) {
			newObject = new objectClass(useImg,
										useImg.width, useImg.height,
										tileKindHere);
			newObject.addEntityToWorldTile();
			objectList.push(newObject);
			} else {
			canvasContext.drawImage(useImg,drawTileX,drawTileY);
			}

			// add world tile effects
			/*if (tileKindHere === TILE_WHATEVER) {
			do the thing;
			}*/

				drawTileX += WORLD_W;
				arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row
} // end of drawWorld func

function rowColToArrayIndex(col, row) {
	return col + WORLD_COLS * row;
}

