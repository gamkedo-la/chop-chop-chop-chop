var tileEditor = false;
var tileUnderMouse = null;

function roomTileCoordinate() {
    levelCol = Math.floor(mouseCanvasX / TILE_W);
    levelRow = Math.floor(mouseCanvasY / TILE_H);

   	var tileX = (levelCol * TILE_W) - cameraPanX;
   	var tileY = (levelRow * TILE_H) - cameraPanY;

    tileUnderMouse = rowColToArrayIndex(levelCol, levelRow);
    console.log("Col: " + levelCol,"Row: " + levelRow,"Type: " +  worldGrid[tileUnderMouse]);

    canvasContext.strokeRect(tileX, tileY, TILE_W, TILE_H);
    canvasContext.strokeStyle = 'orange';
    canvasContext.lineWidth = 1;
}

function editTileOnMouseClick() {
    if(tileEditor) {
    	canvasContext.strokeStyle = 'magenta';
   		canvasContext.lineWidth = 4;
        worldGrid[tileUnderMouse]++;
        if (worldGrid[tileUnderMouse] > 1000000) {
            worldGrid[tileUnderMouse] = 0;
        }
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
			layoutString += "00" + allLevels[currentLevelIndex].layout[i].toString() + ",";
		} else {
			layoutString += allLevels[currentLevelIndex].layout[i] + ",";
		}
	}

	layoutString = layoutString.slice(0,-1);
	layoutString = "var " + allLevels[currentLevelIndex].name + "= [ \n" + layoutString  + "];"
	if (tileEditor) {
		console.log("Level layout data:" + "\n" + "\n");
		console.log(layoutString);
	}
}
