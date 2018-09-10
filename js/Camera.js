var cameraPanX = 0;
var cameraPanY = 0;

var cameraMovementSpeed = 16; // for World Editor

function cameraPan() {
	var cameraRightBoundary = worldCols * TILE_W - canvas.width;
	var cameraBottomBoundary = worldRows * TILE_H - canvas.height;
	if (worldEditor) {
		var canvasRightBoundary = canvas.width + cameraPanX;
		var canvasBottomBoundary = canvas.height + cameraPanY;
		if (mouseCanvasX > (canvasRightBoundary + cameraPanX) - TILE_W) {
			cameraPanX += cameraMovementSpeed;
		}
		if (mouseCanvasX < cameraPanX + TILE_W) {
			cameraPanX -= cameraMovementSpeed;
		}
		if (mouseCanvasY > (canvas.height + cameraPanY) - TILE_W) {
			cameraPanY += cameraMovementSpeed;
		}
		if (mouseCanvasY < cameraPanY + TILE_W) {
			cameraPanY -= cameraMovementSpeed;
			console.log(cameraPanY);
		}
	} else {
		cameraPanX = player.x - canvas.width/2;
		cameraPanY = player.y - canvas.height/2;
	}
	if (cameraPanX < 0) {
		cameraPanX = 0;
	}
	if (cameraPanX > cameraRightBoundary) {
		cameraPanX = cameraRightBoundary;
	}
	if (cameraPanY < 0) {
		cameraPanY = 0;
	}
	if (cameraPanY > cameraBottomBoundary) {
		cameraPanY = cameraBottomBoundary;
	}
	canvasContext.save();
    canvasContext.translate(Math.floor(-cameraPanX), Math.floor(-cameraPanY));
}

function endCameraPan() {
    canvasContext.restore();
}