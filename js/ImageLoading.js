var picsToLoad = 0;

var gamePics = [];
var worldPics = [];

function loadImages() {
    var imageList = [
        //Game Pics (player, enemies, objects, effects, etc.)
        { varName: "playerImage", theFile: "CCFrontImage.png" },

        //World Tile Pics
        { worldType: TILE_EXTEND_COLLISION, theFile: "clear.png" },
        { worldType: TILE_NOTHING, theFile: "nothing.png" },
        { worldType: TILE_TREE, theFile: "tree.png" },
        { worldType: TILE_STUMP, theFile: "stump.png" },
        { worldType: TILE_FLOWER, theFile: "flowers.png" },
        { worldType: TILE_WEEDS, theFile: "weeds.png" },
        { worldType: TILE_ANIMAL, theFile: "clear.png" },
    ];

    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile, true);
        } else {
            beginLoadingImage(imageList[i].worldType, imageList[i].theFile, false);
        }
    } // end of for imageList
}; // end of function loadImages

function beginLoadingImage(arrayIndex, fileName, isGamePic) {
    if (isGamePic) {
        gamePics[arrayIndex] = document.createElement("img");
        gamePics[arrayIndex].onload = countLoadedImageAndLaunchIfReady;
        gamePics[arrayIndex].src = "images/" + fileName;
    } else {
        worldPics[arrayIndex] = document.createElement("img");
        worldPics[arrayIndex].onload = countLoadedImageAndLaunchIfReady;
        worldPics[arrayIndex].src = "images/" + fileName;
    }
};

function countLoadedImageAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad == 0) { // last image loaded?
        loadingDoneSoStartGame();
    }
};
