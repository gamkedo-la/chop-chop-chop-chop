let openingMenuIsRunning = true;
let gameIsRunning = false;
let gameIsPaused = false;

//add background image for opening menu
function drawOpeningMenu() {
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorRect(canvas.width / 2 - 300, canvas.height / 2 - 50, 600, 160, "white");
	colorRect(canvas.width / 2 - 298, canvas.height / 2 - 48, 596, 156, "black");

	colorText("Chop-Cho, Ch-C", canvas.width / 2 - 10, canvas.height / 2, "green", "40px papyrus", textAlign = 'center', opacity = 1);
	colorText("Get it?..... Click to play", canvas.width / 2 - 10, canvas.height / 2 + 80, "green", "40px papyrus", textAlign = 'center', opacity = 1);
}

function drawPauseScreen() {
	//canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	//canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	drawAll();

	for (let x = 0; x < canvas.width; x += 16) {
		for (let y = 0; y < canvas.height; y += 16) {
			colorRect(x + 8, y, 8, 8, "black");
			colorRect(x, y + 8, 8, 8, "black");
		}
	}

	colorRect(canvas.width / 2 - 300, canvas.height / 2 - 50, 600, 160, "white");
	colorRect(canvas.width / 2 - 298, canvas.height / 2 - 48, 596, 156, "black");

	colorText("Game Paused", canvas.width / 2 - 10, canvas.height / 2, "green", "40px papyrus", textAlign = 'center', opacity = 1);
	colorText("Press P to Resume Play", canvas.width / 2 - 10, canvas.height / 2 + 80, "green", "40px papyrus", textAlign = 'center', opacity = 1);
}

let togglePauseGame = () => {
	if (!gameIsPaused) {
		gameIsPaused = true;
		windowOnBlur();
		drawPauseScreen();
	} else {
		gameIsPaused = false;
		windowOnFocus();
	}
}

let toggleDebug = () => {
	debug = !debug;
}
