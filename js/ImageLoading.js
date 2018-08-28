var picsToLoad = 0;

var gamePics = [];
var worldPics = [];

function loadImages() {
    var imageList = [
        //Game Pics (player, enemies, objects, effects, etc.)
        { varName: "playerWalkingSheet", theFile: "player_chopping_horizontal.png" },
        { varName: "playerSideChopSheet", theFile: "player_chopping_horizontal.png" },
        { varName: "waterTilesSpritesheet", theFile: "water_spritesheet.png" },
        { varName: "placeholderDeathCatImage", theFile: "placeholderDeathCatImage.png"},
        { varName: "placeholderDeathCatMeanderSheet", theFile: "placeholderDeathCatMeanderSheet2a.png"},

        //World Tile Pics
        { worldType: TILE_EXTEND_COLLISION, theFile: "nothing.png" },
        { worldType: TILE_NOTHING, theFile: "nothing.png" },
        { worldType: TILE_TREE, theFile: "tree.png" },
        { worldType: TILE_STUMP, theFile: "stump.png" },
        { worldType: TILE_FLOWER, theFile: "flowers.png" },
        { worldType: TILE_WEEDS, theFile: "weeds.png" },
        { worldType: TILE_SMALL_ROCK, theFile: "rock.png" },
        { worldType: TILE_ANIMAL, theFile: "clear.png" }, // clear because it is an object
        //{ worldType: TILE_PLACEHOLDER_DEATH_CAT, theFile: "placeholderDeathCatMeanderSheet2a.png"},
        { worldType: TILE_WATER, theFile: "clear.png" }, // clear because it is animated
        { worldType: TILE_MUSHROOM, theFile: "mushrooms.png" },
        { worldType: TILE_THORN, theFile: "thorn.png" },
        { worldType: TILE_LEAVES, theFile: "leaves.png" },
        { worldType: TILE_PILE_OF_LEAVES, theFile: "pile_of_leaves.png" },
        { worldType: TILE_PILE_OF_LEAVES_2, theFile: "pile_of_leaves_2.png" },
        { worldType: TILE_PILE_OF_LEAVES_3, theFile: "pile_of_leaves_3.png" },
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
