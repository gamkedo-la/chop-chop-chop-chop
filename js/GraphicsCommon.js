//Graphics Common
function drawRect(x, y, w, h, color, opacity = 1) {
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
    canvasContext.lineWidth = lineWidth;
    canvasContext.stroke();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function roundRect(x, y, width, height, radius, fill, stroke) {
    //round rectangle code from Juan Mendes 
    //http://js-bits.blogspot.com/2010/07/canvas-rounded-corner-rectangles.html
    var strokeThickness = 2;
    var rectFill = "black";
    var rectStroke = "white";
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    canvasContext.beginPath();
    canvasContext.lineWidth = strokeThickness;
    canvasContext.moveTo(x + radius, y);
    canvasContext.lineTo(x + width - radius, y);
    canvasContext.quadraticCurveTo(x + width, y, x + width, y + radius);
    canvasContext.lineTo(x + width, y + height - radius);
    canvasContext.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    canvasContext.lineTo(x + radius, y + height);
    canvasContext.quadraticCurveTo(x, y + height, x, y + height - radius);
    canvasContext.lineTo(x, y + radius);
    canvasContext.quadraticCurveTo(x, y, x + radius, y);
    canvasContext.closePath();
    if (fill) {
        canvasContext.globalAlpha = 0.5;
        canvasContext.fillStyle = rectFill;
        canvasContext.fill();
    }
    if (stroke) {
        canvasContext.globalAlpha = 1;
        canvasContext.strokeStyle = rectStroke;
        canvasContext.stroke();
    }
}
