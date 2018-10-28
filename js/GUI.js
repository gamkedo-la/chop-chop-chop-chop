const GUI_COLOR = "white";
const GUI_Y = 4;
const FRUSTRATION_BAR_X = 560; //canvas.width/2 + 160;
const FRUSTRATION_BAR_Y_OFFSET = 20;
const FRUSTRATION_BAR_LENGTH = MAX_FRUSTATION * 2.5; 
const FRUSTRATION_BAR_HEIGHT = 12;

function drawGUI() {
	drawRect(0,0, canvas.width, 20, "black");
    var statustxt = 
    	"TREES TO CUT:" + treesCutThisLevel + "/" + allLevels[currentLevelIndex].treesToCut + "    " +
        "CHOPS:" + player.chopCount + "    " +
        "DISTANCE:" + player.stepCount + " M"

    drawPixelfont(statustxt,4,GUI_Y);
    var frustrationText = "FRUSTRATION";
    drawPixelfont(frustrationText,canvas.width - 350,GUI_Y);

    drawPixelfont("TIME REMAINING: " + countdownTimeRemaining,canvas.width-180,GUI_Y);

    var frustrationTextWidth = canvasContext.measureText(frustrationText).width;
    var frustrationFillWidth = player.currentFrustration * 2.5;
     
    drawRect(FRUSTRATION_BAR_X - 2,GUI_Y - 2, 
    	FRUSTRATION_BAR_LENGTH + 4, FRUSTRATION_BAR_HEIGHT + 4, GUI_COLOR);
    drawRect(FRUSTRATION_BAR_X,GUI_Y, 
    	FRUSTRATION_BAR_LENGTH, FRUSTRATION_BAR_HEIGHT, "black");
    drawRect(FRUSTRATION_BAR_X,GUI_Y, 
    	frustrationFillWidth, FRUSTRATION_BAR_HEIGHT, "red");
}