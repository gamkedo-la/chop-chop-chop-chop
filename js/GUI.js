const GUI_COLOR = "white";
const GUI_Y = 4;

const FRUSTRATION_BAR_X = 112;
const FRUSTRATION_BAR_TEXT_Y = 18;
const FRUSTRATION_BAR_Y_OFFSET = 20;
const FRUSTRATION_BAR_LENGTH = MAX_FRUSTATION * 2.5; 
const FRUSTRATION_BAR_HEIGHT = 14;

function drawGUI() {
    var statustxt = 
        "SWINGS:" + player.swingCount + "   " +
        "CHOPS:" + player.chopCount + "   " +
        "TREES:" + player.treeCount + "   " +
        "ATTACKS:" + player.attackCount + "   " +
        "DISTANCE:" + player.stepCount + "m";

    // blurry canvas font version
    //colorText(statustxt,4,GUI_Y,GUI_COLOR,GUI_FONT,"left",GUI_OPACITY);
    // crisp pixel font version
    drawPixelfont(statustxt,4,GUI_Y);

    // blurry canvas font version
    //colorText("TIME REMAINING: " + countdownTimeRemaining,canvas.width-4,GUI_Y,GUI_COLOR,GUI_FONT,"right",GUI_OPACITY);
    // crisp pixel font version
    drawPixelfont("TIME REMAINING: " + countdownTimeRemaining,canvas.width-180,GUI_Y);

    //colorText("FRUSTRATION ",2,canvas.height - FRUSTRATION_BAR_TEXT_Y,"black","bolder 13px Verdana, Arial","left");
    var frustrationText = "FRUSTRATION";
    var frustrationTextWidth = canvasContext.measureText(frustrationText).width;
    var frustrationFillWidth = player.currentFrustration * 2.5;
    
    drawRect(2,canvas.height - FRUSTRATION_BAR_TEXT_Y - 2, 
    	FRUSTRATION_BAR_LENGTH * 2 + 6, FRUSTRATION_BAR_HEIGHT + 2, "black");
    drawPixelfont(frustrationText,4,canvas.height - FRUSTRATION_BAR_TEXT_Y);
    drawRect(FRUSTRATION_BAR_X - 2,canvas.height - FRUSTRATION_BAR_Y_OFFSET - 2, 
    	FRUSTRATION_BAR_LENGTH + 4, FRUSTRATION_BAR_HEIGHT + 4, GUI_COLOR);
    drawRect(FRUSTRATION_BAR_X,canvas.height - FRUSTRATION_BAR_Y_OFFSET, 
    	FRUSTRATION_BAR_LENGTH, FRUSTRATION_BAR_HEIGHT, "black");
    drawRect(FRUSTRATION_BAR_X,canvas.height - FRUSTRATION_BAR_Y_OFFSET, 
    	frustrationFillWidth, FRUSTRATION_BAR_HEIGHT, "red");
}