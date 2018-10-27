const LOW = 1;
const MID = 2;
const MAX = 3;
const MAX_FRUSTATION = 20;

const NORTH = "north";
const EAST = "east";
const WEST = "west";
const SOUTH = "south";

const NORMAL_SPEED = 6;
const TORNADO_SPEED = 9;

const TORNADO_POWER = 10;

var upgradeLevelTwo = false;
var upgradeLevelThree = false;

var contactFrame = 0;
var treesCutThisLevel = 0;

function playerClass() {
	var levelStartPosition = indexToCenteredXY(allLevels[currentLevelIndex].playerStartArrayIndex);
	this.x = levelStartPosition.x;
	this.y = levelStartPosition.y;
	this.oldX = this.x;
	this.oldY = this.y;
	this.depthY = 0;
	this.speed = NORMAL_SPEED;
	
	// stats
	this.swingCount = 0;
	this.chopCount = 0;
	this.stepCount = 0;
	this.treeCount = 0;
	this.attackCount = 0;

	var walkIntoTileType = TILE_SMALL_TREE;
	this.sprite = playerWalking;
	this.width = this.sprite.spriteSheet.width/this.sprite.animationColFrames;
	this.height = this.sprite.spriteSheet.height/this.sprite.animationRowFrames;
	this.direction = EAST; // direction helps prioritize chop
	this.state = {
		chopping: false,
		walking: false,
		waiting: false,
	};

	this.powerupActive = false;
	this.powerupTimer = 0;
	this.powerupAlmostOver = 240;
	this.powerupTimerFull = 300;

	var axeHitboxWidth = 9;
	var axeHitboxHeight = 5;
	var axeOffsetX = ((playerSideChop.spriteSheet.width/2) - 35)/playerSideChop.animationColFrames;
	var axeOffsetY = -(playerSideChop.spriteSheet.height/6) - 1;
	this.axeHitbox = new colliderClass(this.x, this.y, axeHitboxWidth, axeHitboxHeight,
										axeOffsetX, axeOffsetY);
	this.axeSharpness = 0;
	this.axeLevel = LOW; // higher levels unlock increased power and abilities;
	this.axePower = 1; // how much health the player takes from trees
	this.chopTimer = 0;
	this.hitbox = new colliderClass(this.x, this.y, this.width/2, this.height,
											0, 0);
	this.hitAnAnimal = false;
	this.currentFrustration = 0;
	this.invincible = false;
	this.blinking = false;
	this.invincibiltyTimer = 0;
	this.invincibiltyTimerFull = 45;

	this.leaveTrail = function() { // dust near the player's feet every so often
		
		const TRAIL_FRAME_INTERVAL = 6; // every nth frame, emit one particle
		const TRAIL_Y_OFFSET = 20; // foot position
		
		if (this.trailFrame == undefined) { // init
			//console.log('Trail starting!');
			this.trailFrame = 0;
		}
		
		this.trailFrame++;

		if (this.trailFrame % TRAIL_FRAME_INTERVAL == 0) { // time for another?
			//console.log('Trail at frame ' + this.trailFrame);
			spawnParticles('footstep', this.x, this.y+TRAIL_Y_OFFSET);
			this.stepCount++; // add to stats for GUI
		}

	}

	this.move = function() {
		if (havingAMoment) {
			return;
		}

		if (this.powerupActive) {
			this.invincible = true;
			tornadoSwoosh.play();
			var buffer = 1;
			if (tornadoSwoosh.currentTime > tornadoSwoosh.duration - buffer) {
				tornadoSwoosh.play();
			}
			this.speed = TORNADO_SPEED;
			//this.axePower = this.tornadoPower;
			for (var i = 0; i < objectList.length; i++) {
				var object = objectList[i];
				if (object.hasHitbox) {
					if (object.animal) {
						// do nothing
					} else if (this.hitbox.isCollidingWith(object.hitbox)) {
						var objectPosition = indexToCenteredXY(object.arrayIndex)
						spawnParticles('chop', objectPosition.x, objectPosition.y);
						object.gotHit(TORNADO_POWER);
					}
				}
			} // end of for objects in list loop
		}

		this.oldX = this.x;
		this.oldY = this.y;
		var movementX = 0;
        var movementY = 0;
		this.state.walking = false;

        if (!this.state.chopping && !this.state.waiting && !scrollingText) {
			if (leftKeyHeld) {
				movementX -= this.speed;
				this.direction = WEST;
				this.state.walking = true;
			}
			if (rightKeyHeld) {
				movementX += this.speed;
				this.direction = EAST;
				this.state.walking = true;
			}
			if (upKeyHeld) {
				movementY -= this.speed;
				this.state.walking = true;
			}
			if (downKeyHeld) {
				movementY += this.speed;
				this.state.walking = true;
			}
		} else {
			return;
		}

		if (this.state.walking) { // occasionally leave a trail of particles (dust/footprints)
			this.leaveTrail(); // maybe use only at certain states/times/surfaces? (wet feet?)
		}

		if (checkTileCollision(this.x,this.y,movementX,movementY)) {
			movementX = 0;
			movementY = 0;
		}

		this.x += movementX;
		this.y += movementY;
		this.depthY = this.y;
		this.hitbox.update(this.x, this.y);
		//console.log("player direction: " + this.direction);
	}

	this.checkNextLevelTrigger = function() {
		var detectedX = -64;
		var detectedY = -64;
		if(	getTileTypeAtPixelCoord(this.x - this.hitbox.width/2, this.y - this.hitbox.height/2) == TILE_REPLACE_ANIMATED_TILE) {
				detectedX = this.x - this.hitbox.width/2;
				detectedY = this.y - this.hitbox.height/2;
			} else if (getTileTypeAtPixelCoord(this.x + this.hitbox.width/2, this.y - this.hitbox.height/2) == TILE_REPLACE_ANIMATED_TILE) {
				detectedX = this.x + this.hitbox.width/2;
				detectedY = this.y - this.hitbox.height/2;
			} else if (getTileTypeAtPixelCoord(this.x - this.hitbox.width/2, this.y + this.hitbox.height/2) == TILE_REPLACE_ANIMATED_TILE) {
				detectedX = this.x - this.hitbox.width/2;
				detectedY = this.y + this.hitbox.height/2;
			} else if (getTileTypeAtPixelCoord(this.x + this.hitbox.width/2, this.y + this.hitbox.height/2) == TILE_REPLACE_ANIMATED_TILE) {
				detectedX = this.x + this.hitbox.width/2;
				detectedY = this.y + this.hitbox.height/2;
			}

		if (detectedX == -64) {
			return false
		}

		var detectedArrayIndex = getTileIndexAtPixelCoord(detectedX,detectedY);

		for (var a = 0; a < animatedTileList.length; a++) {
			if (animatedTileList[a].arrayIndex == detectedArrayIndex) {
				if (animatedTileList[a].tileType == TILE_NEXT_LEVEL) {
					return true;
				}
			}
		}
		return false;
	}	

	this.gotHit = function(addedFrustration) {
		if (this.invincible) {
			return;
		} else {
			this.chopTimer = 0;
			this.state.chopping = false;
			this.currentFrustration += addedFrustration;
			if (this.currentFrustration >= MAX_FRUSTATION) {
				for (var w = 0; w < objectList.length; w++) {
					var object = objectList[w];
					if (object.returned != undefined) {
						objectList.splice(w,1);
						playerSideChopMax.loops = true;
						playerSideChopMax.currentFrameIndex = 0;
					}
				}
				spacebarKeyHeld = false;
				countdownTimerPaused = true;
				axeWhirl.pause();
				axeWhirl.currentTime = 0;
				getNewFrustratedScene();
    			prepareCutscene(FrustratedScene);
    			return;
			};
			playerHurt.play();
			var radians = getRandomNumberBetweenMinMax(0, 360) * DEGREES_TO_RADIANS;
			var boopedX = Math.cos(radians) * this.speed * 10;
			var boopedY = Math.sin(radians) * this.speed * 10;
			if (checkTileCollision(this.x,this.y,boopedX,boopedY)) {
				if (checkTileCollision(this.x,this.y,-boopedX,-boopedY)) {
					// do nothing
				} else {
					this.x -= boopedX;
					this.y -= boopedY;
				}
			} else {
				this.x += boopedX;
				this.y += boopedY;
			}

			this.hitbox.update(this.x, this.y);

			if (this.axeLevel == MAX) {
				this.invincibiltyTimer = this.invincibiltyTimerFull - framesPerSecond/2;
			} else {
				this.invincibiltyTimer = this.invincibiltyTimerFull;
			}
			this.invincible = true;
		}
	}

	this.chopTrees = function() {
		var hit = false; // prevents the swing sfx from playing if true
		var chopTitle = titleScreenHitboxes[0];
		var newGame = titleScreenHitboxes[1];
		var options = titleScreenHitboxes[2];
		var credits = titleScreenHitboxes[3];
		var optionsTitle = optionScreenHitBoxes[0];
		var music = optionScreenHitBoxes[1];
		var sfx = optionScreenHitBoxes[2]
		var soundTest = optionScreenHitBoxes[3];
		var musicTest = optionScreenHitBoxes[4];
		var back = optionScreenHitBoxes[5];
		var musicB1 = musicHitboxes[0];
		var musicB2 = musicHitboxes[1];
		var sfxB1 = sfxHitboxes[0];
		var sfxB2 = sfxHitboxes[1];
		if (openingMenuIsRunning) {
			if (this.axeHitbox.isCollidingWith(chopTitle)) {
				hit = true;
				hitTitle = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit game title!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}
			if (this.axeHitbox.isCollidingWith(options)) {
				hit = true;
				//console.log("hit options!");
				hitOptions = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}  
			if (this.axeHitbox.isCollidingWith(newGame)) {
				hit = true;
				//console.log("hit new game!");
				hitNewGame = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			} 
			if (this.axeHitbox.isCollidingWith(credits)) {
				hit = true;
				//console.log("hit credits!");
				hitCredits = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}
		} else if (optionsMenu) {
			if (this.axeHitbox.isCollidingWith(optionsTitle)) {
				hit = true;
				hitOptionsTitle = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit option title!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}
			if (this.axeHitbox.isCollidingWith(music)) {
				hit = true;
				hitMusic = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit music!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}
			if (this.axeHitbox.isCollidingWith(sfx)) {
				hit = true;
				hitSFX = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit sfx!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}
			if (this.axeHitbox.isCollidingWith(soundTest)) {
				hit = true;
				hitSoundTest = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit sound test!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				return;
			}
			if (this.axeHitbox.isCollidingWith(musicTest)) {
				hit = true;
				hitMusicTest = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit music test!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				return;
			}
			if (this.axeHitbox.isCollidingWith(back)) {
				hit = true;
				hitBack = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit back!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}
			if (this.axeHitbox.isCollidingWith(musicB1)) {
				hit = true;
				hitMusicPlus = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit music button 1 screen!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}
			if (this.axeHitbox.isCollidingWith(musicB2)) {
				hit = true;
				hitMusicMinus = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit music button 2 screen!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}
			if (this.axeHitbox.isCollidingWith(sfxB1)) {
				hit = true;
				hitSfxPlus = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit sfx button 1 screen!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}
			if (this.axeHitbox.isCollidingWith(sfxB2)) {
				hit = true;
				hitSfxMinus = true;
				pendingShakes = HIT_SHAKE_COUNT * 2;
				//console.log("hit sfx button 2 screen!");
				spawnParticles('chop', this.axeHitbox.x, this.axeHitbox.y);
				var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
				arrayOfChopSFXs[random].play();
				return;
			}
		}

		for (var j = 0; j < objectList.length; j++) {
			var object = objectList[j];
			if (object.hasHitbox) {
				if (this.axeHitbox.isCollidingWith(object.hitbox)) {
					hit = true;
					//console.log("hit an object!");
					if (allLevels[currentLevelIndex].name == "Moon") {
						prefix = "moon_";
					} else {
						prefix = "";
					}
					if (object.animal) {
						this.hitAnAnimal = true;
						console.log("HIT AN ANIMAL! >:C");
						animalHit.play();
						this.gotHit(animal.attackPower);
					} else {
						spawnParticles(prefix + 'chop', this.axeHitbox.x, this.axeHitbox.y);
						var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
						arrayOfChopSFXs[random].play();
						object.gotHit(this.axePower);
						this.chopCount++; // add to score on GUI
						this.swingCount++; // a successful chop counts as a swing, too
						if (object.tileType == TILE_LOLLIPOP && object.health <=0) {
							this.powerupActive = true;
							this.state.chopping = false;
						}
					}
				}
			}
		}

		var arrayIndexUnderAxe = getTileIndexAtPixelCoord(this.axeHitbox.x,this.axeHitbox.y);
		if (worldGrid[arrayIndexUnderAxe] == TILE_PUMPKIN) {
			var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfChopSFXs.length - 1);
			arrayOfChopSFXs[random].play();
			worldGrid[arrayIndexUnderAxe] = TILE_JACK_O;
			spawnParticles('debris0', this.axeHitbox.x, this.axeHitbox.y);
			spawnParticles('debris2', this.axeHitbox.x, this.axeHitbox.y);
			spawnParticles('debris1', this.axeHitbox.x, this.axeHitbox.y);
			spawnParticles('debris2', this.axeHitbox.x, this.axeHitbox.y);
			spawnParticles('debris0', this.axeHitbox.x, this.axeHitbox.y);
			hit = true;
		}
		if (!hit) {
			//console.log("missed all trees!");
			missedSwing.play();
			this.swingCount++; // add to score on GUI
		}
		hit = false;
		if (debug) this.axeHitbox.draw("blue");
	};

	this.draw = function() {
		if (havingAMoment) {
			return;
		}

		const INVINCIBLE_BLINK_RATE = 8;
		if (this.invincibiltyTimer > 0 && this.invincible) {
			this.invincibiltyTimer--;
			if (this.invincibiltyTimer > 0) {
				if (this.invincibiltyTimer % INVINCIBLE_BLINK_RATE <= (INVINCIBLE_BLINK_RATE/2-1)) {
					this.blinking = true;
				} else {
					this.blinking = false;
				}
			}
			if (this.invincibiltyTimer <= 0 && this.invincible) {
				this.invincible = false;
				this.blinking = false;
			}
		}

		if (this.powerupActive) {
			this.powerupTimer++;
			if (this.powerupTimer > this.powerupAlmostOver) {
				if (this.powerupTimer % 10) {
					this.sprite = tornadoPowerup;
					tornadoPowerup.draw(this.x,this.y,1,(this.direction != EAST));	
				} else {
					this.sprite = playerWalking;
					playerWalking.draw(this.x, this.y, 1, (this.direction != EAST));
				}
			} else {
				this.sprite = tornadoPowerup;
				tornadoPowerup.draw(this.x,this.y,1,(this.direction != EAST));
			}
			if (this.powerupTimer > this.powerupTimerFull) {
				this.invincible = false;
				this.speed = NORMAL_SPEED;
				tornadoSwoosh.pause();
				this.powerupActive = false;
				this.powerupTimer = 0;
				return;
			}
			this.leaveTrail();
			if (debug) {
				drawRect(this.x - 3/2,this.y - 3/2, 3,3, "red");
				this.hitbox.draw("red");
			}
			return;
		}

		if (spacebarKeyHeld && this.chopTimer <= 0 && !this.state.waiting) {
			if (this.axeLevel == MAX) {
				this.state.chopping = true;
				this.chopTimer = playerSideChopMax.animationColFrames - 1;
				contactFrame = playerSideChopMax.animationColFrames - 1;
				playerSideChopMax.currentFrameIndex = 0;
			} else {
				this.state.chopping = true;
				this.chopTimer = playerSideChop.animationColFrames - 1;
				contactFrame = playerSideChop.animationColFrames - 1;
				playerSideChop.currentFrameIndex = 2;
			}
		}

		if (this.chopTimer > 0) {
			if (this.axeLevel < MAX) {
				this.sprite = playerSideChop;
				if (this.blinking) {
					// draw nothing
				} else {
					playerSideChop.draw(this.x,this.y, 1, (this.direction != EAST));
				}
			} else {
				this.sprite = playerSideChopMax;
				if (this.blinking) {
					// draw nothing
				} else {
					playerSideChopMax.draw(this.x,this.y, 1, (this.direction != EAST));
				}
			}
			if (playerSideChopMax.currentFrameIndex == contactFrame) {
				axeWhirl.currentTime = 0;
				this.chopTimer = 0;
				var axeProjectile = new projectileClass(this.x,this.y, this.direction);
				objectList.push(axeProjectile);
				this.state.chopping = false;
				this.state.waiting = true;
				playerSideChopMax.currentFrameIndex = playerSideChopMax.animationColFrames;
			}
			if (playerSideChop.currentFrameIndex == contactFrame) {
				var currentChoppingDirection = this.direction;
				if (currentChoppingDirection == EAST) {
					this.axeHitbox.update(this.x,this.y);
				} else if (currentChoppingDirection == WEST) {
					this.axeHitbox.update(this.x - axeOffsetX * 2,this.y);
				}
				this.chopTrees();
			}
			this.chopTimer--;
		} else {

			if (this.state.waiting) {
				this.sprite = playerSideChopMax;
				playerSideChopMax.loops = false;
				playerSideChopMax.currentFrameIndex = contactFrame;
				if (this.blinking) {
					// draw nothing
				} else {
					playerSideChopMax.draw(this.x,this.y, 1, (this.direction != EAST));
				}
			} else if (this.state.walking) {
				this.sprite = playerWalking;
				if (this.blinking) {
					// draw nothing
				} else {
					playerWalking.draw(this.x, this.y, 1, (this.direction != EAST));
				}
			} else { // idle
				this.sprite = playerIdle;
				if (this.blinking) {
					// draw nothing
				} else {
					playerIdle.draw(this.x, this.y, 1, (this.direction != EAST));
				}
				
			}
		}

		if (this.chopTimer <= 0) {
			if (this.axeLevel == MAX) {
				for (var j = 0; j < objectList.length; j++) {
					if (objectList[j].returned) {
						objectList[j].remove = true;
						this.state.waiting = false;
						playerSideChopMax.loops = true;
						playerSideChopMax.currentFrameIndex = 0;
					}
				}
			} else {
				this.state.chopping = false;
			}
		}

		if (debug) {
			drawRect(this.x - 3/2,this.y - 3/2, 3,3, "red");
			this.hitbox.draw("red");
		}
	}
} // end of playerClass

function checkTileCollision (x,y,movementX,movementY) {
	var nextX = Math.round(x + movementX);
    var nextY = Math.round(y + movementY);

    if (nextX < 0 || nextX > worldCols * TILE_W) {
    	return true;
    }

    if (nextY < 0 || nextY > worldRows * TILE_H) {
    	return true;
    }

	var walkIntoTileType = getTileTypeAtPixelCoord(nextX, nextY);

    if (walkIntoTileType === undefined) {
		return true;
	}

	if (isTileTypeCollidable(walkIntoTileType)) {
		//console.log("walkIntoTileType: " + walkIntoTileType);
		return true;
	}
}

var standardCollisionTiles = [TILE_EXTEND_COLLISION,TILE_REPLACE_TREE,TILE_REPLACE_WATER,TILE_REPLACE_ANIMATED_TILE,
	TILE_THORN,TILE_PUMPKIN,TILE_JACK_O,TILE_REPLACE_MOON_OBJECT,
	TILE_CLIFF_TOP_LEFT,TILE_CLIFF_TOP,TILE_CLIFF_TOP_RIGHT,
	TILE_CLIFF_LEFT,TILE_CLIFF_RIGHT,
	TILE_CLIFF_BOTTOM_LEFT,TILE_CLIFF_BOTTOM,TILE_CLIFF_BOTTOM_RIGHT,
	TILE_PIT_TOP_LEFT, TILE_PIT_TOP, TILE_PIT_TOP_RIGHT,
	TILE_PIT_LEFT, TILE_PIT_RIGHT, TILE_PIT_BOTTOM_LEFT,
	TILE_PIT_BOTTOM, TILE_PIT_BOTTOM_RIGHT,
	TILE_CLIFF_TOP_LEFT_2, TILE_CLIFF_TOP_LEFT_3,
	TILE_CLIFF_TOP_RIGHT_2, TILE_CLIFF_TOP_RIGHT_3,
	TILE_CLIFF_BOTTOM_RIGHT_2, TILE_CLIFF_BOTTOM_RIGHT_3,
	TILE_CLIFF_BOTTOM_LEFT_2, TILE_CLIFF_BOTTOM_LEFT_3,
	TILE_BOULDER_TOP_LEFT, TILE_BOULDER_TOP, TILE_BOULDER_TOP_RIGHT,
	TILE_BOULDER_MIDDLE_LEFT, TILE_BOULDER_MIDDLE, TILE_BOULDER_MIDDLE_RIGHT,
	TILE_BOULDER_BOTTOM_LEFT, TILE_BOULDER_BOTTOM, TILE_BOULDER_BOTTOM_RIGHT,
	TILE_CLIFF_VIEW_TOP_1, TILE_CLIFF_VIEW_TOP_2, TILE_CLIFF_VIEW_TOP_3, 
	TILE_CLIFF_VIEW_RIGHT_1, TILE_CLIFF_VIEW_RIGHT_2, TILE_CLIFF_VIEW_RIGHT_3,
	TILE_CLIFF_VIEW_LEFT_1, TILE_CLIFF_VIEW_LEFT_2, TILE_CLIFF_VIEW_LEFT_3,
	TILE_CLIFF_VIEW_CENTER_1,TILE_CLIFF_VIEW_CENTER_2, TILE_CLIFF_VIEW_CENTER_3, TILE_CLIFF_VIEW_CENTER_4,
	TILE_PIT_TOP_LEFT,TILE_PIT_TOP,TILE_PIT_TOP_RIGHT,
	TILE_PIT_RIGHT,TILE_PIT_LEFT,
	TILE_PIT_BOTTOM_RIGHT,TILE_PIT_BOTTOM,TILE_PIT_BOTTOM_LEFT,
	TILE_WATERFALL_BOTTOM_LEFT, TILE_WATERFALL_BOTTOM_CENTER,TILE_WATERFALL_BOTTOM_RIGHT,
	TILE_ROCK_PILE_ROUGH,TILE_ROCK_PILE_ROUGH_ALT,TILE_ROCK_PILE_SMOOTH,TILE_ROCK_PILE_SMOOTH_ALT];

function isTileTypeCollidable(tileType) {
	switch (tileType) {
		case TILE_EXTEND_COLLISION:
		case TILE_REPLACE_TREE:
			if (player.powerupActive) {
				return false;
			} else {
				return true;
			}
		break;
		case TILE_REPLACE_WATER:
		case TILE_REPLACE_WATERFALL:
		case TILE_REPLACE_ANIMATED_TILE:
		case TILE_REPLACE_MOON_TREE:
		case TILE_THORN:
		case TILE_PUMPKIN:
		case TILE_JACK_O:
		case TILE_CLIFF_TOP_LEFT:
		case TILE_CLIFF_TOP_LEFT_2:
		case TILE_CLIFF_TOP_LEFT_3:
		case TILE_CLIFF_TOP:
		case TILE_CLIFF_TOP_RIGHT:
		case TILE_CLIFF_TOP_RIGHT_2:
		case TILE_CLIFF_TOP_RIGHT_3:
		case TILE_CLIFF_LEFT:
		case TILE_CLIFF_RIGHT:
		case TILE_CLIFF_BOTTOM_LEFT:
		case TILE_CLIFF_BOTTOM_LEFT_2:
		case TILE_CLIFF_BOTTOM_LEFT_3:
		case TILE_CLIFF_BOTTOM:
		case TILE_CLIFF_BOTTOM_RIGHT:
		case TILE_CLIFF_BOTTOM_RIGHT_2:
		case TILE_CLIFF_BOTTOM_RIGHT_3:
		case TILE_CLIFF_VIEW_TOP_1:
		case TILE_CLIFF_VIEW_TOP_2:
		case TILE_CLIFF_VIEW_TOP_3:
		case TILE_CLIFF_VIEW_RIGHT_1:
		case TILE_CLIFF_VIEW_RIGHT_2:
		case TILE_CLIFF_VIEW_RIGHT_3:
		case TILE_CLIFF_VIEW_LEFT_1:
		case TILE_CLIFF_VIEW_LEFT_2:
		case TILE_CLIFF_VIEW_LEFT_3:
		case TILE_CLIFF_VIEW_CENTER_1:
		case TILE_CLIFF_VIEW_CENTER_2:
		case TILE_CLIFF_VIEW_CENTER_3:
		case TILE_CLIFF_VIEW_CENTER_4:
		case TILE_PIT_TOP_LEFT:
		case TILE_PIT_TOP:
		case TILE_PIT_TOP_RIGHT:
		case TILE_PIT_LEFT:
		case TILE_PIT_RIGHT:
		case TILE_PIT_BOTTOM_LEFT:
		case TILE_PIT_BOTTOM:
		case TILE_PIT_BOTTOM_RIGHT:
		case TILE_ROCK_PILE_ROUGH:
		case TILE_ROCK_PILE_ROUGH_ALT:
		case TILE_ROCK_PILE_SMOOTH:
		case TILE_ROCK_PILE_SMOOTH_ALT:
		case TILE_BOULDER_TOP_LEFT:
		case TILE_BOULDER_TOP:
		case TILE_BOULDER_TOP_RIGHT:
		case TILE_BOULDER_MIDDLE_LEFT:
		case TILE_BOULDER_MIDDLE:
		case TILE_BOULDER_MIDDLE_RIGHT:
		case TILE_BOULDER_BOTTOM_LEFT:
		case TILE_BOULDER_BOTTOM:
		case TILE_BOULDER_BOTTOM_RIGHT:
			return true;
			break;
		return false;
	}
}

/*if ( standardCollisionTiles.indexOf(worldGrid[getTileIndexAtPixelCoord(player.hitbox.x, player.hitbox.y)]) > -1 ||
		 standardCollisionTiles.indexOf(worldGrid[getTileIndexAtPixelCoord(player.hitbox.x+player.hitbox.width, player.hitbox.y)]) > -1 || 
		 standardCollisionTiles.indexOf(worldGrid[getTileIndexAtPixelCoord(player.hitbox.x, player.hitbox.y+player.hitbox.height)]) > -1 ||
		 standardCollisionTiles.indexOf(worldGrid[getTileIndexAtPixelCoord(player.hitbox.x+player.hitbox.width, player.hitbox.y+player.hitbox.height)]) > -1 )
	{
		return true;
	}
	return false;
}*/
