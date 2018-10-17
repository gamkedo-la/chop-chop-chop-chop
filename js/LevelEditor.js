var worldEditor = false;
var tileUnderMouse = null;

var nothingSet = [TILE_TERRAIN,TILE_MOON_TERRAIN,TILE_MOON_TERRAIN_2,TILE_NEXT_LEVEL];
var groundSet = arrayWithRange(100, startAt = 100); // 100 to 199
var treeSet = arrayWithRange(100, startAt = 200); // 200 to 299
var cliffSet = arrayWithRange(100, startAt = 300); // 300 to 399
var waterSet = arrayWithRange(100, startAt = 400); // 400 to 499
var pathSet = arrayWithRange(100, startAt = 500); // 500 to 599
var moonSet = arrayWithRange(100, startAt = 700); // 700 to 799
var animalSet = arrayWithRange(100, startAt = 800);  // 800 to 899

var currentlySelectedSet = nothingSet;
var currentSetIndex = 0;

function arrayWithRange(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function pickASet(set) {
	currentlySelectedSet = set;
	currentSetIndex = 0;
};

function roomTileCoordinate() {
    tileUnderMouse = getTileIndexAtPixelCoord(mouseX + cameraPanX, mouseY + cameraPanY);
	var levelCol = arrayIndexToCol(tileUnderMouse);
	var levelRow = arrayIndexToRow(tileUnderMouse);
	var tileX = (levelCol * TILE_W) - cameraPanX;
    var tileY = (levelRow * TILE_H) - cameraPanY;
	//console.log("Col: " + levelCol,"Row: " + levelRow,"Type: " +  worldGrid[tileUnderMouse]);

    canvasContext.strokeRect(tileX, tileY, TILE_W, TILE_H);
    canvasContext.strokeStyle = "orange";
    canvasContext.lineWidth = 1;
    if (worldPics[currentlySelectedSet[currentSetIndex]] == undefined) {
    	return;
    } else {
    	canvasContext.drawImage(worldPics[currentlySelectedSet[currentSetIndex]],tileX, tileY, TILE_W, TILE_H);
	}
}

function editTileOnMouseClick() {
    if (worldEditor) {
    	canvasContext.strokeStyle = "magenta";
   		canvasContext.lineWidth = 4;

   		var tileKindHere = worldGrid[tileUnderMouse];
   		if (currentlySelectedSet[currentSetIndex] == undefined) {
   			console.log("undefined");
   			return;
   		}
   		worldGrid[tileUnderMouse] = currentlySelectedSet[currentSetIndex];
   		allLevels[currentLevelIndex].layout[tileUnderMouse] = currentlySelectedSet[currentSetIndex];
    }
}

function copyToClipboard() {
	var layoutString = "";
	var numberPrintOut;
	for(var i=0; i<allLevels[currentLevelIndex].layout.length; i++) {
		if (i%allLevels[currentLevelIndex].columns==0 && i>0) {
			layoutString += "\n" + "	";
		}
		if (i==0) {
			layoutString += "	";
		}
		if (allLevels[currentLevelIndex].layout[i] >= TILE_TERRAIN && 
			allLevels[currentLevelIndex].layout[i] <= TILE_NEXT_LEVEL) {
			layoutString += "00" + allLevels[currentLevelIndex].layout[i].toString() + ",";
		} else if (allLevels[currentLevelIndex].layout[i] == TILE_REPLACE_WATER) {
			numberPrintOut = "400";
			for (var n = 0; n < animalList.length; n++) {
				if (animalList[n].arrayIndex == i) {
					numberPrintOut = animalList[n].tileType;
				} 
			}
			layoutString += "" + numberPrintOut + ",";
		} else if (allLevels[currentLevelIndex].layout[i] == TILE_REPLACE_TREE) {
			for (var m = 0; m < objectList.length; m++) {
				if (objectList[m].arrayIndex == i) {
					numberPrintOut = objectList[m].tileType;
				}
			}
			layoutString += "" + numberPrintOut + ",";
		} else if (allLevels[currentLevelIndex].layout[i] == TILE_REPLACE_ANIMAL) {
			for (var n = 0; n < animalList.length; n++) {
				if (animalList[n].arrayIndex == i) {
					numberPrintOut = animalList[n].tileType;
				}
			}
			layoutString += "" + numberPrintOut + ",";
		} else if (allLevels[currentLevelIndex].layout[i] == TILE_REPLACE_ANIMATED_TILE) {
			for (var o = 0; o < animatedTileList.length; o++) {
				if (animatedTileList[o].arrayIndex == i) {
					numberPrintOut = animatedTileList[o].tileType;
					layoutString += "" + numberPrintOut + ",";
				}
			}
		} else {
			layoutString += allLevels[currentLevelIndex].layout[i] + ",";
		}
	}

	layoutString = layoutString.slice(0,-1);
	if (worldEditor) {
		console.log("Level layout data:" + "\n" + "\n");
		console.log(layoutString);
	}
}
