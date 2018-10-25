var picsToLoad = 0;

var gamePics = [];
var worldPics = [];
var waterTilelist = [];

function loadImages() {
    var imageList = [
        // Game Pics
        // Player Pic
        { varName: "playerWalkingSheet", theFile: "player_run.png" },
        { varName: "playerSideChopSheet", theFile: "player_chop.png" },
        { varName: "playerSideChopMaxSheet", theFile: "player_chop_max.png" },
        { varName: "maxAxeProjectileSheet", theFile: "max_axe_upgrade_projectile.png" },
        { varName: "tornadoSpritesheet", theFile: "tornado_spritesheet.png" },
        { varName: "cutscene", theFile: "cutscene.png" },

        // Animated Tile Sheets
        { varName: "waterTilesSpritesheet", theFile: "water_spritesheet.png" },
        { varName: "waterfallBottomLeftSpritesheet", theFile: "waterfall_bottom_left_spritesheet.png" },
        { varName: "waterfallBottomCenterSpritesheet", theFile: "waterfall_bottom_center_spritesheet.png" },
        { varName: "waterfallBottomRightSpritesheet", theFile: "waterfall_bottom_right_spritesheet.png" },
        { varName: "cameraSpritesheet", theFile: "camera_spritesheet.png" },
        { varName: "campfireSpritesheet", theFile: "campfire_spritesheet.png" },
        { varName: "dsBonfireSpritesheet", theFile: "ds_bonfire_spritesheet.png" },
        { varName: "nextLevelSpritesheet", theFile: "next_level_tile_sheet.png" },

        // Animated Animal Sheets
        { varName: "placeholderDeathCatMeanderSheet", theFile: "death_cat_sheet.png"},
        { varName: "stebsBird", theFile: "stebsbirdsheet.png"},
        { varName: "rabbitSheet", theFile: "rabbitsheet.png"},
        { varName: "jumpingFish", theFile: "jumping_fish_sheet.png"},
        { varName: "alligatorSheet", theFile: "alligator_sheet.png"},
        { varName: "pincherBugSheet", theFile: "pincher_bug_sheet.png"},
        { varName: "bearSheet", theFile: "bear_sheet.png"},

        // Particle Effects
        { varName: "leaf", theFile: "leaf.png"},
        { varName: "debris0", theFile: "debris0.png"},
        { varName: "debris1", theFile: "debris1.png"},
        { varName: "debris2", theFile: "debris2.png"},
        { varName: "spore", theFile: "spore.png"},

        //Font
        { varName: "logo", theFile: "logo_chopchopchopchop.png"},
        { varName: "fontSheet", theFile: "ChopChopFontFontv3.png"}, // v3 has a 1px black stroke
        { varName: "textTriangle", theFile: "textTriangle.png"},

        //World Tile Pics
        { worldType: TILE_EXTEND_COLLISION, theFile: "clear.png" },

        { worldType: TILE_TERRAIN, theFile: "terrain.png" },
        { worldType: TILE_MOON_TERRAIN, theFile: "moon_terrain.png" },
        { worldType: TILE_MOON_TERRAIN_2, theFile: "moon_terrain_2.png" },
		{ worldType: TILE_NEXT_LEVEL, theFile: "next_level_tile.png"},

        { worldType: TILE_FLOWER, theFile: "flowers.png" },
        { worldType: TILE_WEEDS, theFile: "weeds.png" },
        { worldType: TILE_SMALL_ROCK, theFile: "rock.png" },
        { worldType: TILE_MUSHROOM, theFile: "mushrooms.png" },
        { worldType: TILE_THORN, theFile: "thorn.png" },
        { worldType: TILE_TWIG, theFile: "twig.png" },
        { worldType: TILE_LEAVES, theFile: "leaves.png" },
        { worldType: TILE_DIRT, theFile: "dirt.png" },
        { worldType: TILE_DIRT_ALT, theFile: "dirt_alt.png" },
        { worldType: TILE_TALL_GRASS, theFile: "tall_grass.png" },
        { worldType: TILE_PILE_OF_LEAVES, theFile: "pile_of_leaves.png" },
        { worldType: TILE_PILE_OF_LEAVES_2, theFile: "pile_of_leaves_2.png" },
        { worldType: TILE_PILE_OF_LEAVES_3, theFile: "pile_of_leaves_3.png" },
        { worldType: TILE_PUMPKIN, theFile: "pumpkin.png" },
        { worldType: TILE_JACK_O, theFile: "jackolatern.png" },
        { worldType: TILE_CRACKED_EGGS, theFile: "cracked_eggs.png" },
        { worldType: TILE_CAMERA, theFile: "camera.png" },
        { worldType: TILE_CAMPFIRE, theFile: "campfire.png" },
        { worldType: TILE_DS_BONFIRE, theFile: "ds_bonfire.png" },
        { worldType: TILE_REPLACE_ANIMATED_TILE, theFile: "terrain.png" },
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

        { worldType: TILE_MOON_CRATERS_1, theFile: "moon_small_craters_1.png" },
        { worldType: TILE_MOON_CRATERS_2, theFile: "moon_small_craters_2.png" },
        { worldType: TILE_MOON_CRATERS_3, theFile: "moon_small_craters_3.png" },
        { worldType: TILE_MOON_REFLECTOR, theFile: "moon_reflector.png" }, 
        { worldType: TILE_MOON_LARGE_CRATER_1, theFile: "Moon_Crater_Short_Large_1.png"},
        { worldType: TILE_MOON_LARGE_CRATER_2, theFile: "Moon_Crater_Short_Small_1.png"},
        { worldType: TILE_MOON_BOXES, theFile: "moon_crates.png"},
        { worldType: TILE_MOON_FLAG, theFile: "moon_flag.png"},
        { worldType: TILE_MOON_HOME, theFile: "moon_home.png"},
        { worldType: TILE_MOON_WHEEL, theFile: "moon_wheel.png"},
        { worldType: TILE_REPLACE_MOON_OBJECT, theFile: "moon_terrain.png" },
        
        { worldType: TILE_SMALL_TREE, theFile: "tree1.png" },
        { worldType: TILE_SMALL_TREE_ALT, theFile: "tree2.png" },
        { worldType: TILE_WILLOW_TREE, theFile: "tree3.png"},
        { worldType: TILE_NORMAL_TREE, theFile: "normal_tree.png" },
        { worldType: TILE_NORMAL_TREE_ALT, theFile: "another_tree.png" },
        { worldType: TILE_PUFFY_TREE, theFile: "p_tree.png" },
        { worldType: TILE_LOLLIPOP, theFile: "lollipop.png" },
        { worldType: TILE_TALL_TREE, theFile: "tall_tree.png" },
        { worldType: TILE_STALAGMITE, theFile: "stalagmite.png" },
        { worldType: TILE_MOON_TREE_1, theFile: "moon_tree_1.png" },
        { worldType: TILE_MOON_TREE_2, theFile: "moon_tree_2.png" },
        { worldType: TILE_MOON_TREE_3, theFile: "moon_tree_3.png" },
        { worldType: TILE_MOON_CHEESE_TREE, theFile: "stebs_moon_tree.png" },
        { worldType: TILE_MOON_CRASHED_SHIP, theFile: "crashed_wooden_ship.png" },

        { worldType: TILE_REPLACE_MOON_TREE, theFile: "moon_terrain.png" }, 
        { worldType: TILE_REPLACE_TREE, theFile: "terrain.png" }, 

        { worldType: TILE_STUMP, theFile: "stump1.png" },
        { worldType: TILE_STUMP_ALT, theFile: "stump2.png" },
        { worldType: TILE_WILLOW_STUMP, theFile: "stump3.png" },
        { worldType: TILE_NORMAL_STUMP, theFile: "normal_treestump.png" },
        { worldType: TILE_NORMAL_STUMP_ALT, theFile: "another_treestump.png" },
        { worldType: TILE_PUFFY_STUMP, theFile: "p_stump.png" },
        { worldType: TILE_LOLLIPOP_STUMP, theFile: "lollipop_stump.png" },
        { worldType: TILE_STALAGMITE_STUMP, theFile: "stalagmite_stump.png" },
        { worldType: TILE_MOON_TREE_1_STUMP, theFile: "moon_tree_1_stump.png" },
        { worldType: TILE_MOON_TREE_2_STUMP, theFile: "moon_tree_2_stump.png" },
        { worldType: TILE_MOON_TREE_3_STUMP, theFile: "moon_tree_3_stump.png" },
        { worldType: TILE_MOON_CHEESE_STUMP, theFile: "stebs_moon_tree stump.png" },

        { worldType: TILE_REPLACE_STUMP, theFile: "terrain.png" },

        { worldType: TILE_WATER, theFile: "water.png" },
        { worldType: TILE_REPLACE_WATER, theFile: "terrain.png" },
        { worldType: TILE_WATERFALL_BOTTOM_LEFT, theFile: "waterfall_bottom_left.png" },
        { worldType: TILE_WATERFALL_BOTTOM_RIGHT, theFile: "waterfall_bottom_right.png" },
        { worldType: TILE_WATERFALL_BOTTOM_CENTER, theFile: "waterfall_bottom_center.png" },
        { worldType: TILE_REPLACE_WATERFALL, theFile: "clear.png" },

        { worldType: TILE_STEBS_BIRD, theFile: "stebsbird.png" },
        { worldType: TILE_DEATH_CAT, theFile: "death_cat.png" },
        { worldType: TILE_RABBIT, theFile: "rabbit.png" },
        { worldType: TILE_JUMPING_FISH, theFile: "jumping_fish.png" },
        { worldType: TILE_ALLIGATOR, theFile: "alligator.png" },
        { worldType: TILE_PINCHER_BUG, theFile: "pincher_bug.png" },
        { worldType: TILE_BEAR, theFile: "bear.png" },
        { worldType: TILE_REPLACE_ANIMAL, theFile: "terrain.png" },

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
        { worldType: TILE_CLIFF_VIEW_TOP_1, theFile: "cliff_view_top_1.png" },
        { worldType: TILE_CLIFF_VIEW_TOP_2, theFile: "cliff_view_top_2.png" },
        { worldType: TILE_CLIFF_VIEW_TOP_3, theFile: "cliff_view_top_3.png" },
        { worldType: TILE_CLIFF_VIEW_RIGHT_1, theFile: "cliff_view_right_1.png" },
        { worldType: TILE_CLIFF_VIEW_RIGHT_2, theFile: "cliff_view_right_2.png" },
        { worldType: TILE_CLIFF_VIEW_RIGHT_3, theFile: "cliff_view_right_3.png" },
        { worldType: TILE_CLIFF_VIEW_LEFT_1, theFile: "cliff_view_left_1.png" },
        { worldType: TILE_CLIFF_VIEW_LEFT_2, theFile: "cliff_view_left_2.png" },
        { worldType: TILE_CLIFF_VIEW_LEFT_3, theFile: "cliff_view_left_3.png" },
        { worldType: TILE_CLIFF_VIEW_CENTER_1, theFile: "cliff_view_center_1.png" },
        { worldType: TILE_CLIFF_VIEW_CENTER_2, theFile: "cliff_view_center_2.png" },
        { worldType: TILE_CLIFF_VIEW_CENTER_3, theFile: "cliff_view_center_3.png" },
        { worldType: TILE_CLIFF_VIEW_CENTER_4, theFile: "cliff_view_center_4.png" },
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
