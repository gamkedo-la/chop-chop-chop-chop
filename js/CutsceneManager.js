var scroll = 0;
var scrollSpeed = 2;
var pixelsSkipPerLine = 45;
var scrollingText = false;
var scrollingTextPaused = false;
var scrollingTextSkipped = false;

var introText = ["chop-chop, intrepid  lumberjack, has  decided", "to  make  it  their  mission", "to  chop  down  every  tree",  "far  and  wide",
				"", "to  see  if  it  can  really  be  done","and  to  know  what  it  feels  like","when  you  do"];

var outroText = ["Wow!", "Look at all I've chopped.","", "But now all the beautiful trees are missing.", "And no one else can have fun chopping...","",
"Time to plant plant, plant-plant!","", "Coming soon... maybe..." ];

var creditsText = ["-Terrence McDonnell-",
"project lead",
"",
"code:", "",       
		"main functionality, tile collision,",
    	"tree interactions, health code,",
    	"collision code, animal navigation,",
    	"tile editor, sound and music tes,t",
    	"depth sort drawing,",
    	"bug fixing",
"", 
"art:","",
		"pumpkin,jack-o-lantern,",
		"twig,boulder sheet,tiny rock,",
		"grass,lollipop,",
		"campfire, bonfire,thorns,", 
		"water and waterfall sheet,",
    	"rabbit,bear,bug", 
    	"alligator, tornado,",
    	"axe projectile,",
		"moon and normal trees and stumps,",
		"crate,wheel, and small craters,",
		"level designs",
"",
"sound:", "",
    	"sound integration, missed swing,",
    	"bug buzz, axe whirl",
"",
"-Jeff Hanlon-", 
"art:", "",
		"mushrooms, leaves,leaves pile,",
		" rocks and variations, dirt path tile/corners,",
 		"moon craters, moon surveyor and buggy,",
 		 "chop animation timing improvements,",
	    " title concepts,font formatting,", 
	    "empty handed sprite",
"",
"sound:","",
		" player hits animal, fire,", 
		" chop variations,",
	    " tornado, early sfx,",
	    " audio format conversion",
"",
"music:", "",
		"game over music",
"",
"-Stebs-",
"code:", "",
		"game pause,bird and cat implementation,",
		"outro text code, refactoring",
"",
"art:", "",
		"bird and cat art,",
		"moon cheese tree and stump,",
		"animation fixes", 
"",
"sound:", "",
       "audio setup,format check,",
       "volume control, looping,",
       "bird and cat attack sounds", 
"",
"music:", "",
		"moon music and music fixes",  
"", 
"-Christer Kaitila-",
"code:", "",
		"player sprites integrations,",
		"tree shake,GUI stats, countdown timer,",
		"particle effects intergration,",
		"pixel font renderer,",
		"initial animal thought code",
"",
"art:","", 
		"idle,walking, chopping and", 
		"grinding player sprite animations,",
		"dust trail, chop, log debris",
		"and leaves particle effects",
		"and refinements,",
		"tall and short textured tree,",
		"tree texture improvements,",
		"moon coral tree,",
		"black outlines,",
		"title screen logo",
"",
"-Kise-",
"code:", "",
		"text scrolling code, animal speech bubbles,",
		"refactoring",
"",
"art:","",
   		"tree art and variation,",
   		"speech bubble wedge and dialogue",
"",
"-Buddie Chapman-",
"code:", "",
		"idle/meandering AI and refinements,",
		"level transition and collision check,",
		"tree respawn, timer pause support,",
		"editor mouse scrolling, chase music code,",
		"cliff collision improvements",
"",
"art:","",
		"bush tile",
"",
"-Brandon Trumpold-",
"code:", "",
	    "edge bounds checks,non-graphics utility script,", 
	    "particle system and initial intergration",
"",
"art:","",
		"initial depth transparency effect",
"",
"-Joe C.S.-",
"music:","", 
        "Forest and menu music",
"",
"-Michelly Oliveira-",
"code:", "", 
		"Logo hitbox adjustment,",
        "music and sfx options menu", 
"",
"-Jason Roberts-",
"art:","",
        "Willow tree and stump art",
        "and integration",
"",
"-Praneil Kamat-", 
"code:", "",
		"player state lock bug fix,",
		"scrolling text instruction display",
		"changes on context",
"",
"-Asix Jin-",
"music:","",
        "Animal Chase song",
"",
"-Renaud Marshall-",
"code:", "",
		"pause dither,"," Menu and Pause UI improvements",
"",
"-Chris Markle-",
"sound:", "",
        "3 bear roar sounds", 
"",
"-Marc Silva-",
"art:","", 
        "End screen art",
"",
"-Vaan Hope Khani-",
"code:","", 
    	"Credits integration",
"",
"-Evan Reese-",
"sound:","",
		"public domain grinding sound"];

function toggleScrollTextPause() {
    scrollingTextPaused = !scrollingTextPaused;
   if (scrollingTextPaused) {
        scrollSpeed = 0;
    } else {
        scrollSpeed = 2;
    }
}

function drawScrollingText(textList) {
	return drawScrollingText(textList, false);
}

function drawScrollingCreditsText(textList) {
	return drawScrollingText(textList, true);
}

function drawScrollingText(textList, isCredits) {
	var skipText = "-X-  skip";
	if (isCredits) {
		skipText = "-X-  main menu";
	}
	var scrollTextX = -55;
	var bufferSpace = 64;
	scroll -= scrollSpeed;
	drawRect(0, 0, canvas.width, canvas.height, "black");
	canvasContext.save();
	canvasContext.translate(canvas.width / 2, scroll);
	for(var i = 0; i < textList.length; i++) {
        drawPixelfontCentered(textList[i], scrollTextX, canvas.height + i * pixelsSkipPerLine, 16, 16);
        if (i == textList.length-1) {
    		if (scroll < (canvas.height + i * pixelsSkipPerLine) * - 1 - bufferSpace) {
    			canvasContext.restore();
    			drawRect(0, canvas.height - canvas.height/16, canvas.width, canvas.height/16, "black");
    			drawPixelfont("-W-  fast forward      -S-  rewind      -Space-  pause      " + skipText, 32, canvas.height - canvas.height/20, 12,12);
    			scroll = 0;
    			return true;
    		} else if (scrollingTextSkipped) {
    			canvasContext.restore();
    			drawRect(0, canvas.height - canvas.height/16, canvas.width, canvas.height/16, "black");
    			drawPixelfont("-W-  fast forward      -S-  rewind      -Space-  pause      " + skipText, 32, canvas.height - canvas.height/20, 12,12);
    			scroll = 0;
    			scrollingTextSkipped = false;
    			scrollingTextPaused = false;
    			return true;
    		}
    	}
    }
    canvasContext.restore();
 	drawRect(0, canvas.height - canvas.height/16, canvas.width, canvas.height/16, "black");
    drawPixelfont("-W-  fast forward      -S-  rewind      -Space-  pause      " + skipText, 32, canvas.height - canvas.height/20, 12,12);
}

function rewindScrollText() {
    if (!scrollingTextPaused) {
        scrollSpeed = -5;
    }
    if (scroll >= 0) {
    	scroll = 0;
    }
}

function fastForwardScrollText() {
    if (!scrollingTextPaused) {
        scrollSpeed = 7;
    }
}

function resetScrollSpeed() {
    if (!scrollingTextPaused) {
        scrollSpeed = 2;
    }
}

var stringIndex = 0;
var wordsToShow = "";

var cutsceneDialogueIndex = 0;
var needNewString = false;

var displayTimer = 0; // counter 
var displayTimerLength = 60; // time in frames before new string is typed (game is at 30 frames per second)

var currentScene = null;
var skipCutscene = false;
var gameOverEnded = false;

var upgradeLevelTwoScene = {
	displayLength: displayTimerLength,
	stringToDisplay: ["Through a burst of insight and creativity...", "Chop-Chop has improved their technique...",
					"...", '"What if I chopped harder?"'],
	isGameOver: false
};

var upgradeLevelThreeScene = {
	displayLength: displayTimerLength,
	stringToDisplay: ["Through a burst of insight and creativity...", "Chop-Chop has improved their technique...",
					"...", '"What if I threw my axe?"'],
	isGameOver: false
};

var relaxingIdeas = [' take a nice bath..."', ' have a cup of cocoa..."', ' dance like no one is watching..."',
						' eat a whole cake..."', ' play some video games..."', ' take a long nap..."',
						' watch my favorite movie..."', ' make a tasty soup..."', ' read a book..."',
						' eat a whole pizza..."', ' veg out..."',' sharpen my axe..."'];

var frustratedSayings = ['"I am so frustrated..."', '"I feel stumped..."', 
							'"Everything is working against me..."'];

var firstRandomRelaxingIdeasIndex = 0;
var secondRandomRelaxingIdeasIndex = 0;
var firstRelaxingIdeasString = "";
var secondRelaxingIdeasString = "";

var firstRandomFrustratedSayingsIndex = 0;
var secondRandomFrustratedSayingsIndex = 0;
var firstFrustratedSayingsString = "";
var secondFrustratedSayingsString = "";

let randomFrustratedSayingsIndex = () => {
	firstRandomFrustratedSayingsIndex = getRoundedRandomNumberBetweenMinMax(0,frustratedSayings.length -1);
	firstFrustratedSayingsString = frustratedSayings[firstRandomFrustratedSayingsIndex];
	secondRandomFrustratedSayingsIndex = getRoundedRandomNumberBetweenMinMax(0,frustratedSayings.length -1);
	secondFrustratedSayingsString = frustratedSayings[secondRandomFrustratedSayingsIndex];
	if (secondRandomFrustratedSayingsIndex == firstRandomFrustratedSayingsIndex) {
		console.log("duplicate furstationSayings... Remedying");
		var savingArrayForLater = frustratedSayings.slice();
		frustratedSayings.splice(firstRandomFrustratedSayingsIndex,1);
		secondRandomFrustratedSayingsIndex = getRoundedRandomNumberBetweenMinMax(0,frustratedSayings.length -1)
		secondFrustratedSayingsString = frustratedSayings[secondRandomFrustratedSayingsIndex];
		frustratedSayings = savingArrayForLater;
	}
	firstRandomRelaxingIdeasIndex = getRoundedRandomNumberBetweenMinMax(0,relaxingIdeas.length -1);
	firstRelaxingIdeasString = relaxingIdeas[firstRandomRelaxingIdeasIndex];
	secondRandomRelaxingIdeasIndex = getRoundedRandomNumberBetweenMinMax(0,relaxingIdeas.length -1);
	secondRelaxingIdeasString = relaxingIdeas[secondRandomRelaxingIdeasIndex];
	if (secondRandomRelaxingIdeasIndex == firstRandomRelaxingIdeasIndex) {
		console.log("duplicate relaxingIdeas... Remedying");
		var savingArrayForLater = relaxingIdeas.slice();
		frustratedSayings.splice(firstRandomRelaxingIdeasIndex,1);
		secondRandomRelaxingIdeasIndex = getRoundedRandomNumberBetweenMinMax(0,relaxingIdeas.length -1)
		secondRelaxingIdeasString = relaxingIdeas[secondRandomRelaxingIdeasIndex];
		frustratedSayings = savingArrayForLater;
	}
}	

var FrustratedScene = {}; 
var hitAnAnimalStringFirst = "no animal hit";
var hitAnAnimalStringSecond = "no animal hit";

function getNewFrustratedScene() { // called in PlayerClass.js this.gotHit();
	FrustratedScene = {};
	randomFrustratedSayingsIndex();
	if (player.hitAnAnimal) {
		hitAnAnimalStringFirst = '"I don' + "'" + 't want to hurt any animal friends either..."';
		hitAnAnimalStringSecond = '"Why did I do that?..."';
	}
	// edits to this scene will display in the game
	FrustratedScene = {
		displayLength: 70,
		stringToDisplay: [
						firstFrustratedSayingsString, 
						secondFrustratedSayingsString, 
						hitAnAnimalStringFirst,
						hitAnAnimalStringSecond,
						'"I should just go home..."',
						'"Maybe' + firstRelaxingIdeasString,
						'"Then' + secondRelaxingIdeasString,
						'"Yeah, that sounds good..."', '"But..."', '"Maybe I should try again?"'
						],
		isGameOver: true
	}; 
}

var OutOfTimeScene = {
	displayLength: 90,
	stringToDisplay: ["The flow of time is always cruel..."],
	isGameOver: true
};

var leftPosition = true;

function playCutscene(data) {
	if (havingAMoment) {
		if (data.isGameOver) {
			gameOverOptions();
		}
		if (gameOverEnded) {
			gameOverEnded = false;
			return;
		}
		cutsceneDialogue(data);
		if (needNewString) {
			if (data.isGameOver && cutsceneDialogueIndex == data.stringToDisplay.length) {
				drawPixelfontCentered(wordsToShow, canvas.width/2, canvas.height/6);
				return;
				// stay on last string
			} else {
				cutsceneDialogueIndex++;
				needNewString = false;
				if (cutsceneDialogueIndex <= data.stringToDisplay.length - 1) {
					wordsToShow = "";
				}
			}
		}
		if (cutsceneDialogueIndex >= data.stringToDisplay.length ||
			skipCutscene == true) {
			if (data.isGameOver) {
				// do nothing - wait for input from player
			} else {
				cutsceneSound.pause();
				cutsceneSound.currentTime = 0;
				spacebarKeyHeld = false;
				havingAMoment = false;
				skipCutscene = false;
				wordsToShow = "";
				stringIndex = 0;
				cutsceneDialogueIndex = 0;
				currentScene = null;
				particleList = [];
				player.x = player.oldX;
				player.y = player.oldY;
				needNewString = false;
				countdownTimerPaused = false;
				backgroundMusic.play();
			}
		}
		if (data.isGameOver) {
		drawRect(0, canvas.height - canvas.height/16, canvas.width, canvas.height/16, "black");
		drawPixelfont("-SPACE-  select", 32, canvas.height - canvas.height/20, 12,12);
		} else {
		drawRect(0, canvas.height - canvas.height/16, canvas.width, canvas.height/16, "black");
		drawPixelfont("-SPACE-  skip", 32, canvas.height - canvas.height/20, 12,12);
		}
	}
}

function cutsceneDialogue (data) {
	if (data.stringToDisplay[cutsceneDialogueIndex] == "no animal hit") {
		cutsceneDialogueIndex++
		return;
	}
	if (data.stringToDisplay[cutsceneDialogueIndex] == undefined || 
		cutsceneDialogueIndex == data.stringToDisplay.length) {
		drawPixelfontCentered(wordsToShow, canvas.width/2, canvas.height/6);
		skipCutscene = false;
		return;
	} else {
		var choppedUpString = data.stringToDisplay[cutsceneDialogueIndex].split("");
	}

	if (stringIndex < choppedUpString.length) {
		if (data.isGameOver && cutsceneDialogueIndex == data.stringToDisplay.length) {
			// do nothing
		} else {
			wordsToShow += choppedUpString[stringIndex];
			drawPixelfontCentered(wordsToShow, canvas.width/2, canvas.height/6);
			stringIndex++; 
		}
	} else {
		drawPixelfontCentered(wordsToShow, canvas.width/2, canvas.height/6);
		displayTimer++
		if (displayTimer >= data.displayLength) {
			if (data.isGameOver && cutsceneDialogueIndex == data.stringToDisplay.length) {
				// do nothing
			} else {
				needNewString = true;
				stringIndex = 0;
				displayTimer = 0;
			}
		}
	}
}

function upgradeCheck() {
	const LEVEL_TWO_CHOPS = 50;
	const LEVEL_THREE_CHOPS = 125;

	if (player.chopCount >= LEVEL_TWO_CHOPS && !upgradeLevelTwo && 
		player.chopTimer === 0) {
		prepareCutscene(upgradeLevelTwoScene);
		upgradeLevelTwo = true;
		player.axeLevel = MID;
		player.axeSharpness += 1;
		player.axePower += player.axeSharpness;
		player.state = {
		chopping: false,
		walking: false,
		waiting: false,
		};
	}
	if (player.chopCount >= LEVEL_THREE_CHOPS && !upgradeLevelThree && 
		player.chopTimer === 0) {
		prepareCutscene(upgradeLevelThreeScene);
		upgradeLevelThree = true;
		player.axeLevel = MAX;
		player.state = {
		chopping: false,
		walking: false,
		waiting: false,
		};
	}
}

function prepareCutscene(scene) {
	framesFromGameStart = 0;
	havingAMoment = true;
	particleList = [];
	currentScene = scene;
	cutsceneSound.play();
	backgroundMusic.pause();
	if (scene.isGameOver) {
		backgroundMusic.src = "music/ChopChop-GameOverLoop_v1" + sourceExtension;
		backgroundMusic.play();
	}
}

let gameOverOptions = () => {
	var continueX = canvas.width/3 - 100;
	var quitX = canvas.width/2 + 100;
	var optionsY = canvas.height - 100;
	var selectorXContinue = continueX - 10;
	var selectorXQuit = continueX - 10 + (canvas.width/2 - 67);
	var selectorY = optionsY + 6;
	var	selectorX = selectorXContinue;

	if (leftKeyHeld) {
		leftPosition = true;
	} else if (rightKeyHeld) {
		leftPosition = false;
	}

	if (leftPosition) {
		// do nothing
	} else {
		selectorX = selectorXQuit
	}
	
	if (spacebarKeyHeld) {
		if (selectorX == selectorXContinue) {
			resetGame(currentLevelIndex);
			gameOverEnded = true;
			return;
		} else if (selectorX == selectorXQuit) {
			resetGame(0); // allLevels[0] = main menu;
			gameOverEnded = true;
			return;
		}
	}

	const BLINK_RATE = 16;
	if (selectorX == selectorXContinue) {
		if (framesFromGameStart % BLINK_RATE <= (BLINK_RATE/2-1)) {
			// blinking
		} else {
			drawPixelfont("Continue!", continueX, optionsY, 20,20);
		}
	} else {
		drawPixelfont("Continue!", continueX, optionsY, 20,20);
	}

	if (selectorX == selectorXQuit) {
		if (framesFromGameStart % BLINK_RATE <= (BLINK_RATE/2-1)) {
			// blinking
		} else {
			drawPixelfont("Quit...", quitX, optionsY, 20,20);
		}
	} else {		
		drawPixelfont("Quit...", quitX, optionsY, 20,20);
	}

	drawRect(selectorX, selectorY, 6,6, "white");
}
