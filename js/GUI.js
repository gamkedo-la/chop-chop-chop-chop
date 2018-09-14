const GUI_COLOR = "white";
const GUI_FONT = "8px Verdana, Arial";
const GUI_OPACITY = 1;
const GUI_Y = 10;

const FRUSTRATION_BAR_FONT = "14px Verdana, Arial";
const FRUSTRATION_BAR_X = 110;
const FRUSTRATION_BAR_TEXT_Y = 8;
const FRUSTRATION_BAR_Y_OFFSET = 20;
const FRUSTRATION_BAR_LENGTH = MAX_FRUSTATION * 2.5; // MAX_FRUSTATION
const FRUSTRATION_BAR_HEIGHT = 14;

function drawGUI() {
    colorText(
        "SWINGS: " + player.swingCount + "   " +
        "CHOPS: " + player.chopCount + "   " +
        "TREES: " + player.treeCount + "   " +
        "ATTACKS: " + player.attackCount + "   " +
        "DISTANCE: " + player.stepCount + "m"
        ,4,GUI_Y,GUI_COLOR,GUI_FONT,"left",GUI_OPACITY);

    colorText("TIME REMAINING: " + countdownTimeRemaining,canvas.width-4,GUI_Y,GUI_COLOR,GUI_FONT,"right",GUI_OPACITY);

    //colorText("FRUSTRATION ",2,canvas.height - FRUSTRATION_BAR_TEXT_Y,"black","bolder 13px Verdana, Arial","left");
    var frustrationText = "FRUSTRATION";
    canvasContext.font = FRUSTRATION_BAR_FONT;
    var frustrationTextWidth = canvasContext.measureText(frustrationText).width;
    var frustrationFillWidth = player.currentFrustration * 2.5;
    
    drawRect(0,canvas.height - FRUSTRATION_BAR_TEXT_Y - 13, 
    	frustrationTextWidth + 6, FRUSTRATION_BAR_HEIGHT + 2, "black");
    colorText(frustrationText,2,canvas.height - FRUSTRATION_BAR_TEXT_Y,GUI_COLOR,FRUSTRATION_BAR_FONT,"left");
    drawRect(FRUSTRATION_BAR_X - 2,canvas.height - FRUSTRATION_BAR_Y_OFFSET - 2, 
    	FRUSTRATION_BAR_LENGTH + 4, FRUSTRATION_BAR_HEIGHT + 4, GUI_COLOR);
    drawRect(FRUSTRATION_BAR_X,canvas.height - FRUSTRATION_BAR_Y_OFFSET, 
    	FRUSTRATION_BAR_LENGTH, FRUSTRATION_BAR_HEIGHT, "black");
    drawRect(FRUSTRATION_BAR_X,canvas.height - FRUSTRATION_BAR_Y_OFFSET, 
    	frustrationFillWidth, FRUSTRATION_BAR_HEIGHT, "red");
}