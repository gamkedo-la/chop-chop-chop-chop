const DEGREES_TO_RADIANS = Math.PI / 180;

function getRandomNumberBetweenMinMax(min, max) {
  return Math.random() * (max - min) + min;
}

function getRoundedRandomNumberBetweenMinMax(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function checkIfNumberIsInRange(lowerNumber, numberToCheckIfInRange, higherNumber) {
	return lowerNumber <= numberToCheckIfInRange && numberToCheckIfInRange <= higherNumber;
}

const clamp = function(n, min, max) {
    return Math.min(Math.max(n, min), max);
};

function getTextWidth(txt, font) {
	canvasContext.save();
	canvasContext.font = font;

	var width = canvasContext.measureText(txt).width;

	canvasContext.restore();

	return width;
}

function rowColToArrayIndex(col, row) {
	return col + worldCols * row;
}

function getTileTypeAtPixelCoord(x, y) {
	var arrayIndex = getTileIndexAtPixelCoord(x, y);
	var tileKindHere = worldGrid[arrayIndex];
	return tileKindHere;
}

function getTileIndexAtPixelCoord(x, y) {
	var colFromX = Math.floor(x / TILE_W);
	var rowFromY = Math.floor(y / TILE_H);
	var arrayIndex = rowColToArrayIndex(colFromX, rowFromY);
	return arrayIndex;
}

function arrayIndexToCol(index) {
	return index % worldCols + 1;
}

function arrayIndexToRow(index) {
	return Math.floor(index / worldCols) + 1;
}

function colToCenteredX(col) {
	return (col * TILE_W) - TILE_W/2;
}

function rowToCenteredY(row) {
	return (row * TILE_H) - TILE_H/2;
}

function indexToCenteredXY(index) {
	var colIndex = arrayIndexToCol(index);
	var rowIndex = arrayIndexToRow(index);
	return {
			x: colToCenteredX(colIndex),
			y: rowToCenteredY(rowIndex)
		};
}