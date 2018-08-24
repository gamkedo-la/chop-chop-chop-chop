let openingMenuIsRunning = true;
let openingMenu = canvas;
let gameIsRunning = false;
let gameIsPaused = false;

//add background image for opening menu
function drawOpeningMenu() {
  colorRect(0,0 , canvas.width,canvas.height, "black");
  colorText("Chop-Cho, Ch-C", canvas.width/2 - 10, canvas.height/2, "green", "papyrus", textAlign = 'center', opacity = 1);
  colorText("Get it?..... Click to play", canvas.width/2 -10, canvas.height/2 + 10, "green", "papyrus", textAlign = 'center', opacity = 1);
}

function handleOpeningMenuInput() {
  openingMenu.onClick = function() {
    openingMenuIsRunning = false;
    gameIsRunning = true;
  }
}

let pauseGame = () => {

}
