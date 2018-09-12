const GUI_COLOR = "white";
const GUI_FONT = "8px Verdana, Arial";
const GUI_OPACITY = 1;
const GUI_Y = 10;

function drawGUI() {
    colorText(
        "SWINGS: " + player.swingCount + "   " +
        "CHOPS: " + player.chopCount + "   " +
        "TREES: " + player.treeCount + "   " +
        "ATTACKS: " + player.attackCount + "   " +
        "DISTANCE: " + player.stepCount + "m"
        ,4,GUI_Y,GUI_COLOR,GUI_FONT,"left",GUI_OPACITY);

    colorText("TIME REMAINING:",canvas.width-4,GUI_Y,GUI_COLOR,GUI_FONT,"right",GUI_OPACITY);
}