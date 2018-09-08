var worldEditor = false;
var tileUnderMouse = null;

var nothingSet = [000];
var groundSet = range(100, startAt = 100); // 100 to 199
var treeSet = range(100, startAt = 200); // 200 to 299
var cliffSet = range(100, startAt = 300); // 300 to 399
var waterSet = range(100, startAt = 400); // 400 to 499
var animalSet = range(100, startAt = 800);  // 800 to 899

var currentlySelectedSet = nothingSet;
var currentSetIndex = 0;

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function pickASet(set) {
	currentlySelectedSet = set;
	currentSetIndex = 0;
};

function roomTileCoordinate() {
    levelCol = Math.floor(mouseCanvasX / TILE_W);
    levelRow = Math.floor(mouseCanvasY / TILE_H);

   	var tileX = (levelCol * TILE_W) - cameraPanX;
   	var tileY = (levelRow * TILE_H) - cameraPanY;

    tileUnderMouse = rowColToArrayIndex(levelCol, levelRow);
    //console.log("Col: " + levelCol,"Row: " + levelRow,"Type: " +  worldGrid[tileUnderMouse]);

    canvasContext.strokeRect(tileX, tileY, TILE_W, TILE_H);
    canvasContext.strokeStyle = 'orange';
    canvasContext.lineWidth = 1;
    if (worldPics[currentlySelectedSet[currentSetIndex]] == undefined) {
    	return;
    } else {
    	canvasContext.drawImage(worldPics[currentlySelectedSet[currentSetIndex]],tileX, tileY, TILE_W, TILE_H);
	}
}

function editTileOnMouseClick() {
    if (worldEditor) {
    	canvasContext.strokeStyle = 'magenta';
   		canvasContext.lineWidth = 4;

   		var tileKindHere = worldGrid[tileUnderMouse];
   		//console.log(tileKindHere);
   		if (currentlySelectedSet[currentSetIndex] == undefined) {
   			console.log("undefined");
   			/*console.log("undefined: Please select a set of tiles using:" + "\n"
   				+ "0 for nothing" + "\n"
   				+ "1 for ground tiles" + "\n"
   				+ "2 for tree tiles" + "\n"
   				+ "3 for cliff tiles" + "\n"
   				+ "4 for water tiles" + "\n"
   				+ "8 for animal tiles" + "\n");*/
   			return;
   		}
   		/*if (worldPics[currentlySelectedSet[currentSetIndex]] == undefined) {
   			currentSetIndex = 0;
   			console.log("index not found in set, returning to index 0");
   			return;
   		}*/
   		worldGrid[tileUnderMouse] = currentlySelectedSet[currentSetIndex];
    }
}

function copyToClipboard() {
	var layoutString = "";
	for(var i=0; i<allLevels[currentLevelIndex].layout.length; i++) {
		if (i%allLevels[currentLevelIndex].columns==0 && i>0) {
			layoutString += "\n" + "	";
		}
		if (i==0) {
			layoutString += "	";
		}
		if (allLevels[currentLevelIndex].layout[i] == 0) {
			//if ()
			layoutString += "00" + allLevels[currentLevelIndex].layout[i].toString() + ",";
		} else if (allLevels[currentLevelIndex].layout[i] == -1) {
			layoutString += "000,";
		} else if (allLevels[currentLevelIndex].layout[i] == -2) {
			layoutString += "200,";
		} else if (allLevels[currentLevelIndex].layout[i] == -3) {
			layoutString += "201,";
		} else if (allLevels[currentLevelIndex].layout[i] == -4) {
			layoutString += "400,";
		} else if (allLevels[currentLevelIndex].layout[i] == -5) {
			for (var j = 0; j < objectList.length; j++) {
				if (objectList[j].arrayIndex == i) {
					var numberPrintOut = objectList[j].tileType;
				}
			}
			layoutString += "" + numberPrintOut + ",";
		} else if (allLevels[currentLevelIndex].layout[i] == -6) {
			for (var k = 0; k < animalList.length; k++) {
				if (animalList[k].arrayIndex == i) {
					var numberPrintOut = animalList[k].tileType;
				}
			}
			layoutString += "" + numberPrintOut + ",";

		} else {
			layoutString += allLevels[currentLevelIndex].layout[i] + ",";
		}
	}

	layoutString = layoutString.slice(0,-1);
	layoutString = "var " + allLevels[currentLevelIndex].name + "= [ \n" + layoutString  + "];"
	if (worldEditor) {
		console.log("Level layout data:" + "\n" + "\n");
		console.log(layoutString);
	}
}
