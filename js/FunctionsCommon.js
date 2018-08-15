//Functions Common

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