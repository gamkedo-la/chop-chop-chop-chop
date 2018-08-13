var canvas;
var canvasContext;

const SCREEN_W = 800;
const SCREEN_H = 600;

var framesPerSecond = 30;
var framesFromGameStart = 0;

var player;

window.onload = function () {
	canvas = document.createElement("canvas");
	canvasContext = canvas.getContext("2d");

	document.body.appendChild(canvas);
	canvas.width = SCREEN_W;
	canvas.height = SCREEN_H;

	drawRect(0, 0, canvas.width, canvas.height, "blue");
	colorText("Loading. . .", canvas.width / 2, canvas.height / 2, "white", "30px Courier New", "center");
	setupInput();
	loadImages();
};

function loadingDoneSoStartGame() {
	gameUpdate = setInterval(update, 1000 / framesPerSecond);
	player = new playerClass();
};

/*function startGame() {
	
}*/

function update() {
    drawAll();
    moveAll();
}

function drawAll() {
	drawRect(0, 0, canvas.width, canvas.height, "black");
	drawWorld();
	player.draw();
	for (var i = 0; i < objectList.length; i++) {
		objectList[i].draw();
   }
}

function moveAll() {
	player.move();
}