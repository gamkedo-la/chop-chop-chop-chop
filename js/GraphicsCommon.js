//Graphics Common
function drawRect(x, y, w, h, color,opacity) {
	canvasContext.fillStyle = color;
	canvasContext.globalAlpha = opacity;
	canvasContext.fillRect(x, y, w, h);
	canvasContext.globalAlpha = 1.0; // Needs to be reset back to 1, or the whole canvas will use the same opacity
}

function colorText(showWords, textX, textY, fillColor, fontface, textAlign = 'left', opacity = 1) {
	canvasContext.save();
	canvasContext.textAlign = textAlign;
	canvasContext.font = fontface;
	canvasContext.globalAlpha = opacity;
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
	canvasContext.restore();
}

function outlineCircle(centerX, centerY, radius, strokeColor, lineWidth = 1) {
    canvasContext.strokeStyle = strokeColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    //canvasContext.setLineDash([]);
    canvasContext.lineWidth = lineWidth;
    canvasContext.stroke();
}
