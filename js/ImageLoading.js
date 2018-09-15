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
        { varName: "cameraSpritesheet", theFile: "camera_spritesheet.png" },
        { varName: "campfireSpritesheet", theFile: "campfire_spritesheet.png" },
        { varName: "dsBonfireSpritesheet", theFile: "ds_bonfire_spritesheet.png" },
        { varName: "placeholderDeathCatImage", theFile: "placeholderDeathCatImage.png"},
        { varName: "placeholderDeathCatMeanderSheet", theFile: "placeholderDeathCatMeanderSheet2a.png"},
        { varName: "stebsBird", theFile: "stebsbirdsheet.png"},
        { varName: "leaf", theFile: "leaf.png"},
        { varName: "debris0", theFile: "debris0.png"},
        { varName: "debris1", theFile: "debris1.png"},
        { varName: "debris2", theFile: "debris2.png"},

        //World Tile Pics
        { worldType: TILE_EXTEND_COLLISION, theFile: "clear.png" },
        { worldType: TILE_NOTHING, theFile: "nothing.png" },
		{ worldType: TILE_NEXT_LEVEL, theFile: "nothing.png"},

        { worldType: TILE_FLOWER, theFile: "flowers.png" },
        { worldType: TILE_WEEDS, theFile: "weeds.png" },
        { worldType: TILE_SMALL_ROCK, theFile: "rock.png" },
        { worldType: TILE_MUSHROOM, theFile: "mushrooms.png" },
        { worldType: TILE_THORN, theFile: "thorn.png" },
        { worldType: TILE_TWIG, theFile: "twig.png" },
        { worldType: TILE_LEAVES, theFile: "leaves.png" },
        { worldType: TILE_PILE_OF_LEAVES, theFile: "pile_of_leaves.png" },
        { worldType: TILE_PILE_OF_LEAVES_2, theFile: "pile_of_leaves_2.png" },
        { worldType: TILE_PILE_OF_LEAVES_3, theFile: "pile_of_leaves_3.png" },
        { worldType: TILE_PUMPKIN, theFile: "pumpkin.png" },
        { worldType: TILE_JACK_O, theFile: "jackolatern.png" },
        { worldType: TILE_CRACKED_EGGS, theFile: "cracked_eggs.png" },
        { worldType: TILE_CAMERA, theFile: "camera.png" },
        { worldType: TILE_CAMPFIRE, theFile: "campfire.png" },
        { worldType: TILE_DS_BONFIRE, theFile: "ds_bonfire.png" },
        { worldType: TILE_REPLACE_ANIMATED_TILE, theFile: "clear.png" },
        { worldType: TILE_ROCK_PILE_ROUGH, theFile: "path_cobble_rough_01.png" },
        { worldType: TILE_ROCK_PILE_ROUGH_ALT, theFile: "path_cobble_rough_02.png" },
        { worldType: TILE_ROCK_PILE_SMOOTH, theFile: "path_cobble_smooth_01.png" },
        { worldType: TILE_ROCK_PILE_SMOOTH_ALT, theFile: "path_cobble_smooth_02.png" },
        { worldType: TILE_BOULDER_TOP_LEFT, theFile: "boulder_top_left.png" },
        { worldType: TILE_BOULDER_TOP, theFile: "boulder_top.png" },
        { worldType: TILE_BOULDER_TOP_RIGHT, theFile: "boulder_top_right.png" },
        { worldType: TILE_BOULDER_MIDDLE_LEFT, theFile: "boulder_middle_left.png" },
        { worldType: TILE_BOULDER_MIDDLE, theFile: "boulder_middle.png" },
        { worldType: TILE_BOULDER_MIDDLE_RIGHT, theFile: "boulder_middle_right.png" },
        { worldType: TILE_BOULDER_BOTTOM_LEFT, theFile: "boulder_bottom_left.png" },
        { worldType: TILE_BOULDER_BOTTOM, theFile: "boulder_bottom.png" },
        { worldType: TILE_BOULDER_BOTTOM_RIGHT, theFile: "boulder_bottom_right.png" },
		{ worldType: TILE_BUSH, theFile: "bush.png"},

        { worldType: TILE_PATH_SIDE_LEFT, theFile: "path_dirt_side_left.png" },
        { worldType: TILE_PATH_SIDE_RIGHT, theFile: "path_dirt_side_right.png" },
        { worldType: TILE_PATH_SIDE_TOP, theFile: "path_dirt_side_top.png" },
        { worldType: TILE_PATH_SIDE_BOTTOM, theFile: "path_dirt_side_bottom.png" },
        { worldType: TILE_PATH_CORNER_OUT_TOP_LEFT, theFile: "path_dirt_cornerOUT_top_left.png" },
        { worldType: TILE_PATH_CORNER_OUT_TOP_RIGHT, theFile: "path_dirt_cornerOUT_top_right.png" },
        { worldType: TILE_PATH_CORNER_OUT_BOTTOM_RIGHT, theFile: "path_dirt_cornerOUT_bottom_right.png" },
        { worldType: TILE_PATH_CORNER_OUT_BOTTOM_LEFT, theFile: "path_dirt_cornerOUT_bottom_left.png" },
        { worldType: TILE_PATH_CORNER_IN_TOP_LEFT, theFile: "path_dirt_cornerIN_top_left.png" },
        { worldType: TILE_PATH_CORNER_IN_TOP_RIGHT, theFile: "path_dirt_cornerIN_top_right.png" },
        { worldType: TILE_PATH_CORNER_IN_BOTTOM_RIGHT, theFile: "path_dirt_cornerIN_bottom_right.png" },
        { worldType: TILE_PATH_CORNER_IN_BOTTOM_LEFT, theFile: "path_dirt_cornerIN_bottom_left.png" },


        { worldType: TILE_SMALL_TREE, theFile: "tree1.png" },
        { worldType: TILE_SMALL_TREE_ALT, theFile: "tree2.png" },
        { worldType: TILE_LOLLIPOP, theFile: "lollipop.png" },
        { worldType: TILE_REPLACE_TREE, theFile: "nothing.png" }, 
        { worldType: TILE_TALL_TREE, theFile: "tall_tree.png" },

        { worldType: TILE_STUMP, theFile: "stump1.png" },
        { worldType: TILE_STUMP_ALT, theFile: "stump2.png" },
        { worldType: TILE_REPLACE_STUMP, theFile: "nothing.png" },

        { worldType: TILE_WATER, theFile: "water.png" },
        { worldType: TILE_REPLACE_WATER, theFile: "nothing.png" },
        { worldType: TILE_WATERFALL_BOTTOM_LEFT, theFile: "waterfall_bottom_left.png" },
        { worldType: TILE_WATERFALL_BOTTOM_RIGHT, theFile: "waterfall_bottom_right.png" },
        { worldType: TILE_WATERFALL_BOTTOM_CENTER, theFile: "waterfall_bottom_center.png" },
        { worldType: TILE_REPLACE_WATERFALL, theFile: "clear.png" },

        { worldType: TILE_STEBS_BIRD, theFile: "stebsbird.png" },
        { worldType: TILE_PLACEHOLDER_DEATH_CAT, theFile: "placeholderDeathCatMeanderSheet1.png" },
        { worldType: TILE_REPLACE_ANIMAL, theFile: "nothing.png" },

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
        { worldType: TILE_CLIFF_VIEW_LEFT, theFile: "cliff_view_left.png" },
        { worldType: TILE_CLIFF_VIEW_MIDDLE, theFile: "cliff_view_mid.png" },
        { worldType: TILE_CLIFF_VIEW_RIGHT, theFile: "cliff_view_right.png" },
        { worldType: TILE_PIT_TOP_LEFT, theFile: "pit_top_left.png" },
        { worldType: TILE_PIT_TOP, theFile: "pit_top.png" }, 
        { worldType: TILE_PIT_TOP_RIGHT, theFile: "pit_top_right.png" }, 
        { worldType: TILE_PIT_LEFT, theFile: "pit_left.png" }, 
        { worldType: TILE_PIT_RIGHT, theFile: "pit_right.png" }, 
        { worldType: TILE_PIT_BOTTOM_LEFT, theFile: "pit_bottom_left.png" }, 
        { worldType: TILE_PIT_BOTTOM, theFile: "pit_bottom.png" }, 
        { worldType: TILE_PIT_BOTTOM_RIGHT, theFile: "pit_bottom_right.png" },
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
