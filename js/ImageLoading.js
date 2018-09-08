var picsToLoad = 0;

var gamePics = [];
var worldPics = [];
var waterTilelist = [];

function loadImages() {
    var imageList = [
        //Game Pics (player, enemies, objects, effects, etc.)
        { varName: "playerWalkingSheet", theFile: "player_run.png" },
        { varName: "playerSideChopSheet", theFile: "player_chop.png" },
        { varName: "maxAxeProjectileSheet", theFile: "max_axe_upgrade_projectile.png" },
        { varName: "waterTilesSpritesheet", theFile: "water_spritesheet.png" },
        { varName: "waterfallBottomLeftSpritesheet", theFile: "waterfall_bottom_left_spritesheet.png" },
        { varName: "waterfallBottomCenterSpritesheet", theFile: "waterfall_bottom_center_spritesheet.png" },
        { varName: "waterfallBottomRightSpritesheet", theFile: "waterfall_bottom_right_spritesheet.png" },
        { varName: "placeholderDeathCatImage", theFile: "placeholderDeathCatImage.png"},
        { varName: "placeholderDeathCatMeanderSheet", theFile: "placeholderDeathCatMeanderSheet2a.png"},
        { varName: "stebsBird", theFile: "stebsbirdsheet.png"},
        { varName: "leaf", theFile: "leaf.png"},

        //World Tile Pics
        { worldType: TILE_EXTEND_COLLISION, theFile: "nothing.png" },
        { worldType: TILE_NOTHING, theFile: "nothing.png" },
        { worldType: TILE_SMALL_TREE, theFile: "tree1.png" },
        { worldType: TILE_SMALL_TREE_ALT, theFile: "tree2.png" }, 
        { worldType: TILE_STUMP, theFile: "stump1.png" },
        { worldType: TILE_STUMP_ALT, theFile: "stump2.png" },
        { worldType: TILE_REPLACE_OBJECT, theFile: "nothing.png" },
        { worldType: TILE_STEBS_BIRD, theFile: "stebsbird.png" },
        { worldType: TILE_PLACEHOLDER_DEATH_CAT, theFile: "placeholderDeathCatMeanderSheet1.png" },
        { worldType: TILE_REPLACE_ANIMAL, theFile: "nothing.png" },
        { worldType: TILE_FLOWER, theFile: "flowers.png" },
        { worldType: TILE_WEEDS, theFile: "weeds.png" },
        { worldType: TILE_SMALL_ROCK, theFile: "rock.png" },
        { worldType: TILE_WATER, theFile: "clear.png" }, // clear = animated and is draw differently
        { worldType: TILE_REPLACE_WATER, theFile: "nothing.png" },
        { worldType: TILE_CLIFF_TOP_LEFT, theFile: "cliff_top_left.png" },
        { worldType: TILE_CLIFF_TOP, theFile: "cliff_top.png" }, 
        { worldType: TILE_CLIFF_TOP_RIGHT, theFile: "cliff_top_right.png" }, 
        { worldType: TILE_CLIFF_LEFT, theFile: "cliff_left.png" }, 
        { worldType: TILE_CLIFF_RIGHT, theFile: "cliff_right.png" }, 
        { worldType: TILE_CLIFF_BOTTOM_LEFT, theFile: "cliff_bottom_left.png" }, 
        { worldType: TILE_CLIFF_BOTTOM, theFile: "cliff_bottom.png" }, 
        { worldType: TILE_CLIFF_BOTTOM_RIGHT, theFile: "cliff_bottom_right.png" },
        { worldType: TILE_CLIFF_TOP_LEFT_2, theFile: "cliff_top_left_2.png" },
        { worldType: TILE_CLIFF_TOP_LEFT_3, theFile: "cliff_top_left_3.png" },
        { worldType: TILE_CLIFF_TOP_RIGHT_2, theFile: "cliff_top_right_2.png" },
        { worldType: TILE_CLIFF_TOP_RIGHT_3, theFile: "cliff_top_right_3.png" },
        { worldType: TILE_CLIFF_BOTTOM_RIGHT_2, theFile: "cliff_bottom_right_2.png" },
        { worldType: TILE_CLIFF_BOTTOM_RIGHT_3, theFile: "cliff_bottom_right_3.png" },
        { worldType: TILE_CLIFF_BOTTOM_LEFT_2, theFile: "cliff_bottom_left_2.png" },
        { worldType: TILE_CLIFF_BOTTOM_LEFT_3, theFile: "cliff_bottom_left_3.png" },
        { worldType: TILE_PIT_TOP_LEFT, theFile: "pit_top_left.png" },
        { worldType: TILE_PIT_TOP, theFile: "pit_top.png" }, 
        { worldType: TILE_PIT_TOP_RIGHT, theFile: "pit_top_right.png" }, 
        { worldType: TILE_PIT_LEFT, theFile: "pit_left.png" }, 
        { worldType: TILE_PIT_RIGHT, theFile: "pit_right.png" }, 
        { worldType: TILE_PIT_BOTTOM_LEFT, theFile: "pit_bottom_left.png" }, 
        { worldType: TILE_PIT_BOTTOM, theFile: "pit_bottom.png" }, 
        { worldType: TILE_PIT_BOTTOM_RIGHT, theFile: "pit_bottom_right.png" },
        { worldType: TILE_WATERFALL_BOTTOM_LEFT, theFile: "clear.png" }, // clear = animated and is draw differently
        { worldType: TILE_WATERFALL_BOTTOM_RIGHT, theFile: "clear.png" }, // clear = animated and is draw differently
        { worldType: TILE_WATERFALL_BOTTOM_CENTER, theFile: "clear.png" }, // clear = animated and is draw differently 
        { worldType: TILE_MUSHROOM, theFile: "mushrooms.png" },
        { worldType: TILE_THORN, theFile: "thorn.png" },
        { worldType: TILE_LEAVES, theFile: "leaves.png" },
        { worldType: TILE_PILE_OF_LEAVES, theFile: "pile_of_leaves.png" },
        { worldType: TILE_PILE_OF_LEAVES_2, theFile: "pile_of_leaves_2.png" },
        { worldType: TILE_PILE_OF_LEAVES_3, theFile: "pile_of_leaves_3.png" },
        { worldType: TILE_PUMPKIN, theFile: "pumpkin.png" },
        { worldType: TILE_JACK_O, theFile: "jackolatern.png" },
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
