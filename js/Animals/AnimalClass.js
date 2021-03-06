var playingChaseMusic = false;

function animalClass(newAnimal) {
    this.animal = newAnimal;

    this.thoughtBubbleText = "";
    this.thoughtBubbleFramesLeft = 5555;
    const THOUGHTBUBBLEX = 0; // centered by default
    const THOUGHTBUBBLEY = -24; // above their head
    const THOUGHTBUBBLEFRAMES = 100;
    const RANDOM_CHAT_CHANCE = 0.1;

    this.arrayIndex = newAnimal.arrayIndex;
    this.tileType = newAnimal.tileType;
    this.home = newAnimal.home;

    this.img = newAnimal.img;
    this.width = newAnimal.width;
    this.height = newAnimal.height;

    this.speed = newAnimal.speed;

    this.rangeOssiclator = 0;
    this.rangeOssiclatorHitLimit = false;

    this.detectionRadius = newAnimal.detectionRadius;
    this.homeRadius = newAnimal.homeRadius;

    this.goalRadius = newAnimal.goalRadius === undefined ? 0 : newAnimal.goalRadius;
    this.hasGoal = this.goalRadius > 0 ? true : false;
    this.atGoal = false;
    this.goal = undefined;

    this.idleRadius = newAnimal.idleRadius;
    this.idleTimer = newAnimal.idleTimer; // frames
    var idleTimerFull = this.idleTimer;
    this.idlePosition = {
        x: this.home.x,
        y: this.home.y
    };

    const EAST = "east";
    const WEST = "west";
    this.direction = WEST;
    this.x = this.home.x;
    this.y = this.home.y;
    this.depthY = this.y;
    if (this.img.data.name === "stebsBird") {
    	this.depthY = canvas.height * 2;
    }
    this.centerX = this.x - this.width / 2; // 
    this.centerY = this.y - this.height / 2; // stationary, set here and never double checked

    this.collidableTiles = newAnimal.collidableTiles;
    this.stuckOnBothAxisCounter = 0;
    this.stuckOnBothAxisCounterFull = 15;
    this.gettingUnstuckTimer = 0;
    this.gettingUnstuckTimerFull = 1;

    this.waiting = false;
    this.waitingTimer = newAnimal.waitingTimer; // frames
    var waitingTimerFull = this.waitingTimer;

    this.returning = true;
    this.chasingPlayer = false;

    this.neutral = newAnimal.neutral;

    this.playerDetected = false;
    this.playerDetectedSoundPlayed = false;

    this.colliderWidth = newAnimal.colliderWidth;
    this.colliderHeight = newAnimal.colliderHeight;
    this.colliderOffsetX = newAnimal.colliderOffsetX;
    this.colliderOffsetY = newAnimal.colliderOffsetY;
    this.hasHitbox = true;
    this.hitbox = new colliderClass(this.x, this.y,
        this.colliderWidth, this.colliderHeight, this.colliderOffsetX, this.colliderOffsetY);
    this.attackPower = newAnimal.attackPower;

    this.chat = new NpcText();

    this.detectedPlayerText = ["  I'm gonna getcha!", "    come back my love", "  babe pls", " just one hug", " You're not getting away!"];
    this.returningHomeText = [" Next time...", "  sobs", "  hello darkness my old friend..."];

    this.draw = function () {

        if (this.thoughtBubbleText != "" && this.thoughtBubbleFramesLeft > 0) {
            this.thoughtBubbleFramesLeft--;
            var distFromAnimal = 42;
            this.chat.printWords(this.thoughtBubbleText, this.x + THOUGHTBUBBLEX, this.y + THOUGHTBUBBLEY - distFromAnimal);
        }


        if (worldGrid[this.arrayIndex] != TILE_REPLACE_ANIMAL &&
            worldGrid[this.arrayIndex] != TILE_REPLACE_WATER) {
            return;
        }

        this.img.draw(this.x, this.y, 1, (this.direction != WEST));

        if (worldEditor) {
            canvasContext.strokeStyle = "teal";
            canvasContext.lineWidth = 1;
            canvasContext.strokeRect(this.home.x - TILE_W / 2, this.home.y - TILE_H / 2, TILE_W, TILE_H);
            colorText("Home" + "\n" + this.img.name, this.home.x, this.home.y, "teal", "Verdana", "center");
        }

        if (debug) {
            drawRect(this.x - 2, this.y - 2, 4, 4, "Aqua");
            if (this.hasGoal && this.goal != undefined) {
                drawRect(this.goal.x - 2, this.goal.y - 2, 4, 4, "BlueViolet");
            }
            this.hitbox.draw("Green");
            outlineCircle(this.x, this.y, this.detectionRadius, "green", 1);
            outlineCircle(this.x, this.y, this.goalRadius, "Yellow", 1);
            outlineCircle(this.home.x, this.home.y, this.homeRadius, "Blue", 1);
            outlineCircle(this.home.x, this.home.y, this.idleRadius, "Pink", 1);
        }
    } // end of draw function

    this.thinkAboutSomething = function (thought) {
        this.thoughtBubbleText = thought; // alert the player
        this.thoughtBubbleFramesLeft = THOUGHTBUBBLEFRAMES;
    }

    this.move = function () {
        if (worldGrid[this.arrayIndex] != TILE_REPLACE_ANIMAL &&
            worldGrid[this.arrayIndex] != TILE_REPLACE_WATER) {
            return;
        }
        this.detectionRadiusTrigger();
        this.homeRadiusTrigger();
        this.goalRadiusTrigger();
        var closeToHome = this.speed;
        if (this.playerDetected) { // chasing player
            if (this.playerDetectedSoundPlayed === false) { // just triggered?
                var chooseRandom = Math.floor(Math.random() * this.detectedPlayerText.length);
                this.chat.resetLetters();
                this.thinkAboutSomething(this.detectedPlayerText[chooseRandom]);
            }

            if (!playingChaseMusic) {
                backgroundMusic.pause();
                backgroundMusic.src = "music/animal_chase_v3" + sourceExtension;
                backgroundMusic.play();
                playingChaseMusic = true;
            }
            var buffer = .04;
            if (backgroundMusic.currentTime > backgroundMusic.duration - buffer) {
                backgroundMusic.play();
            }
            if (this.img.data.name === "deathCat" && this.playerDetectedSoundPlayed === false) {
                deathMeow.play();
                this.playerDetectedSoundPlayed = true;
                player.attackCount++; // stats for GUI
            }
            if (this.img.data.name === "stebsBird" && this.playerDetectedSoundPlayed === false) {
                birdSound.play();
                this.playerDetectedSoundPlayed = true;
                player.attackCount++;
            }
            if (this.img.data.name === "pincherBug" && this.playerDetectedSoundPlayed === false) {
                bugSound.play();
                this.playerDetectedSoundPlayed = true;
                player.attackCount++;
            }
            if (this.img.data.name === "bear" && this.playerDetectedSoundPlayed === false) {
                var random = getRoundedRandomNumberBetweenMinMax(0, arrayOfRoarSFXs.length - 1);
                arrayOfRoarSFXs[random].play();
                this.playerDetectedSoundPlayed = true;
                player.attackCount++;
            }
            this.returning = false;
            this.img.framesUntilNext = 8;
            var moveXTowardPlayer = this.x < player.x ? this.speed : -this.speed;
            var moveYTowardPlayer = this.y < player.y ? this.speed : -this.speed;

            if (this.rangeOssiclatorIncreasing) {
                this.rangeOssiclator += 0.1;
            } else {
                this.rangeOssiclator -= 0.1;
            }
            if (this.rangeOssiclator >= (Math.PI / 2)) {
                this.rangeOssiclatorIncreasing = false;
            } else if (this.rangeOssiclator <= 0) {
                this.rangeOssiclatorIncreasing = true;
            }

            var randomMovement = (Math.sin(this.rangeOssiclator) * Math.random());
            var randomMovementXOffset = moveXTowardPlayer < 0 ? -randomMovement : randomMovement;
            var randomMovementYOffset = moveYTowardPlayer < 0 ? -randomMovement : randomMovement;

            moveXTowardPlayer += randomMovementXOffset;
            moveXTowardPlayer += randomMovementYOffset;

            if (this.checkTileCollision(this.x, this.y, moveXTowardPlayer, moveYTowardPlayer)) {
                moveXTowardPlayer = 0;
                moveYTowardPlayer = 0;
            }
            if (this.x <= player.x + closeToHome &&
                this.x >= player.x - closeToHome) {
                moveXTowardPlayer = 0;
            }
            if (this.y <= player.y + closeToHome &&
                this.y >= player.y - closeToHome) {
                moveYTowardPlayer = 0;
            }

            if (moveXTowardPlayer < 0) {
                this.direction = WEST;
            } else if (moveXTowardPlayer > 0) {
                this.direction = EAST;
            } else if (moveXTowardPlayer == 0) {
                this.direction = this.direction;
            }

            if (this.img.name === "alligator") {
                this.x += moveXTowardPlayer;
                this.y += moveYTowardPlayer;
                this.hitbox.update(this.x, this.y);
                if (this.hitbox.isCollidingWith(player.hitbox)) {
                    if (this.neutral) {
                        // don't hit the player
                    } else {
                        player.gotHit(this.attackPower);
                    }
                }
            } else {
                if (moveYTowardPlayer == 0 && moveXTowardPlayer == 0) {
                    if (this.x <= player.x + closeToHome &&
                        this.x >= player.x - closeToHome ||
                        this.y <= player.y + closeToHome &&
                        this.y >= player.y - closeToHome) {
                        // lets not and say we didn't
                    } else {
                        this.getUnstuck();
                    }
                } else {
                    this.stuckOnBothAxisCounter = 0;
                    this.x += moveXTowardPlayer;
                    this.y += moveYTowardPlayer;
                    if (this.collidableTiles.indexOf(getTileTypeAtPixelCoord(this.x, this.y)) > -1) {
                        this.x -= moveXTowardPlayer;
                        this.y -= moveYTowardPlayer;
                    }
                }
                this.depthY = this.y;
                if (this.img.data.name === "stebsBird") {
    				this.depthY = canvas.height * 2;
    			}
                this.hitbox.update(this.x, this.y);
                if (this.hitbox.isCollidingWith(player.hitbox)) {
                    if (this.neutral) {
                        // don't hit the player
                    } else {
                        player.gotHit(this.attackPower);
                    }
                }
            }

        } else if (this.waiting) { // else wait
            if (this.waitingTimer == 0) {
				this.playerDetected = false;
                this.playerDetectedSoundPlayed = false;
                this.waiting = false;
                this.returning = true;
                this.chasingPlayer = false;
                this.img.framesUntilNext = 25;
                this.waitingTimer = waitingTimerFull;
                this.idlePosition.x = this.home.x;
                this.idlePosition.y = this.home.y;
            }
            if (this.waitingTimer > 0) {
                this.waitingTimer--;
                return;
            }
        } else if (this.returning) { // else return home
            var randomChoice = Math.floor(Math.random() * this.returningHomeText.length);
            if (playingChaseMusic && !isAnAnimalChasingPlayer()) {
                this.chat.resetLetters();
                this.thinkAboutSomething(this.returningHomeText[randomChoice]);

                playingChaseMusic = false;
                if (!havingAMoment) {
                    backgroundMusic.pause();
                    if (allLevels[currentLevelIndex].name == "Moon") {
                        backgroundMusic.src = "music/dark_side_of_the_chop" + sourceExtension;
                    } else { // all other levels
                        backgroundMusic.src = "music/ChopChopForestV1" + sourceExtension;
                    }
                    backgroundMusic.play();
                }
            }

            var moveXTowardHome = this.x < this.idlePosition.x ? this.speed : -this.speed;
            var moveYTowardHome = this.y < this.idlePosition.y ? this.speed : -this.speed;

            if (moveXTowardHome < 0) {
                this.direction = WEST;
            } else if (moveXTowardHome > 0) {
                this.direction = EAST;
            } else if (moveXTowardHome == 0) {
                this.direction = this.direction;
            }

            if (this.checkTileCollision(this.x, this.y, moveXTowardHome, moveYTowardHome)) {
                moveXTowardHome = 0;
                moveYTowardHome = 0;
                this.stuckOnBothAxisCounter++
                /*if (this.stuckOnBothAxisCounter >= this.stuckOnBothAxisCounterFull || this.stuck) {
                	this.stuckOnBothAxisCounter = 0;*/
                this.getUnstuck();
                //}
            } else {
                if (this.x <= this.idlePosition.x + closeToHome &&
                    this.x >= this.idlePosition.x - closeToHome) {
                    moveXTowardHome = 0;
                }
                if (this.y <= this.idlePosition.y + closeToHome &&
                    this.y >= this.idlePosition.y - closeToHome) {
                    moveYTowardHome = 0;
                }
                if (moveXTowardHome == 0 && moveYTowardHome == 0) {
                    this.returning = false;
                }
            }

            this.x += moveXTowardHome;
            this.y += moveYTowardHome;
            this.depthY = this.y;
            if (this.img.data.name === "stebsBird") {
		    	this.depthY = canvas.height * 2;
		    }
            this.hitbox.update(this.x, this.y);

        } else { //animal is home, begin idling
            this.idleTimer--;
            if (this.idleTimer == 0) {
                let radians = getRandomNumberBetweenMinMax(0, 360) * DEGREES_TO_RADIANS;
                let radius = getRandomNumberBetweenMinMax(0, this.idleRadius);
                this.idlePosition.x = Math.cos(radians) * radius + this.home.x;
                this.idlePosition.y = Math.sin(radians) * radius + this.home.y;
                this.idleTimer = idleTimerFull;
            }

            moveXTowardHome = this.x < this.idlePosition.x ? this.speed : -this.speed;
            moveYTowardHome = this.y < this.idlePosition.y ? this.speed : -this.speed;

            if (this.checkTileCollision(this.x, this.y, moveXTowardHome, moveYTowardHome) || this.stuck) {
                moveXTowardHome = 0;
                moveYTowardHome = 0;
                /*this.stuckOnBothAxisCounter++ 
                if (this.stuckOnBothAxisCounter >= this.stuckOnBothAxisCounterFull) {
                	this.stuckOnBothAxisCounter = 0;*/
                this.getUnstuck();
                //}
            }

            if (this.x <= this.idlePosition.x + closeToHome &&
                this.x >= this.idlePosition.x - closeToHome || this.atGoal) {
                moveXTowardHome = 0;
            }
            if (this.y <= this.idlePosition.y + closeToHome &&
                this.y >= this.idlePosition.y - closeToHome || this.atGoal) {
                moveYTowardHome = 0;
            }

            if (moveXTowardHome < 0) {
                this.direction = WEST;
            } else if (moveXTowardHome > 0) {
                this.direction = EAST;
            } else if (moveXTowardHome == 0) {
                this.direction = this.direction;
            }
            this.x += moveXTowardHome;
            this.y += moveYTowardHome;
            this.depthY = this.y;
            if (this.img.data.name === "stebsBird") {
		    	this.depthY = canvas.height * 2;
		    }
            this.hitbox.update(this.x, this.y);
        } // end of else begin idling
    } // end of move funtion


    this.getUnstuck = function () {
        var moveXTowardGoal = 0;
        var moveYTowardGoal = 0;
        if (!this.stuck) {
            var goalX = this.playerDetected ? player.x : this.idlePosition.x;
            var goalY = this.playerDetected ? player.y : this.idlePosition.y;
            moveXGetUnstuck = this.x < goalX ? this.speed : -this.speed;
            moveYGetUnstuck = this.y < goalY ? this.speed : -this.speed;
        }
        this.stuck = true;
        if (this.stuck) {
            this.gettingUnstuckTimer++;
            if (this.gettingUnstuckTimer >= this.gettingUnstuckTimerFull) {
                this.gettingUnstuckTimer = 0;
                if (this.checkTileCollision(this.x, this.y, moveXGetUnstuck, moveYTowardGoal)) {
                    //console.log("Stuck On X axis");
                } else {
                    this.x += moveXGetUnstuck;
                }
                if (this.checkTileCollision(this.x, this.y, moveXTowardGoal, moveYGetUnstuck)) {
                    //console.log("Stuck On Y axis");
                } else {
                    this.y += moveYGetUnstuck;
                    this.depthY = this.y;
                    if (this.img.data.name === "stebsBird") {
    					this.depthY = canvas.height * 2;
    				}
                }
            }
            if (this.checkTileCollision(this.x, this.y, moveXGetUnstuck, moveYGetUnstuck)) {
                return;
            } else {
                if (this.checkTileCollision(this.x, this.y, moveXGetUnstuck, moveYTowardGoal)) {
                    //console.log("Stuck On X axis");
                } else {
                    this.x += moveXGetUnstuck;
                }
                if (this.checkTileCollision(this.x, this.y, moveXTowardGoal, moveYGetUnstuck)) {
                    //console.log("Stuck On Y axis");
                } else {
                    this.y += moveYGetUnstuck;
                    this.depthY = this.y;
                    if (this.img.data.name === "stebsBird") {
				    	this.depthY = canvas.height * 2;
				    }
                }
                this.stuck = false;
                console.log("Unstuck!");
            }
        }
    } // end of this.getUnstuck

    this.detectionRadiusTrigger = function () {
        var radius = this.detectionRadius;
        var distX = Math.abs((this.x) - player.x);
        var distY = Math.abs((this.y) - player.y);
        var diffX = distX - player.width / 4;
        var diffY = distY - player.height / 2;

        if ((diffX * diffX + diffY * diffY) <= (radius * radius)) {
            if (this.neutral) {
                if (this.atGoal) {
                    if (this.img.data.name === "bear") {
                        this.thinkAboutSomething("  look at this fish jump!");
                    }
                    if (this.img.data.name === "stebsBird") {
                        this.thinkAboutSomething("  make sure you get my good side!");
                    }
                }
            } else {
                this.playerDetected = true;
                this.chasingPlayer = true;
            }
        } else {
            if (this.img.data.name === "bear" ||
            	this.img.data.name === "stebsBird" ) {
                if (this.thoughtBubbleFramesLeft <= 0) {
                    this.chat.resetLetters();
                } else {
                    this.thoughtBubbleFramesLeft--;
                }
            }
        }
    }

    this.goalRadiusTrigger = function () {
        if (this.neutral || !this.hasGoal) {
            // don't check if close to goal
        } else {
            var goalArrayIndex = -1;
            if (this.goal === undefined && this.hasGoal) {
                if (this.img.name === "bear") {
                    var goalArrayIndex = getArrayIndexFromList(TILE_JUMPING_FISH, objectList);
                    this.goal = indexToCenteredXY(goalArrayIndex);
                } else if (this.img.name === "stebsBird") {
                    var goalArrayIndex = getArrayIndexFromList(TILE_CAMERA, animatedTileList);
                    this.goal = indexToCenteredXY(goalArrayIndex);
                }
                return;
            }
            var radius = this.goalRadius;
            var distX = Math.abs((this.x) - this.goal.x);
            var distY = Math.abs((this.y) - this.goal.y);
            var diffX = distX - (TILE_W / 8);
            var diffY = distY - (TILE_H / 8);


            if ((diffX * diffX + diffY * diffY) <= (radius * radius)) {
                //console.log("found goal!");
                this.neutral = true;
                this.atGoal = true;
                this.waiting = false;
                this.meandering = false;
                this.playerDetected = false;
                this.chasingPlayer = false;
                this.img.framesUntilNext = 45;
                if (!isAnAnimalChasingPlayer()) {
                    playingChaseMusic = false;
                    backgroundMusic.pause();
                    if (allLevels[currentLevelIndex].name == "Moon") {
                        backgroundMusic.src = "music/dark_side_of_the_chop" + sourceExtension;
                    } else { // all other levels
                        backgroundMusic.src = "music/ChopChopForestV1" + sourceExtension;
                    }
                    backgroundMusic.play();
                }
            }
        }
    }

    this.homeRadiusTrigger = function () {
        if (this.neutral) {
            // don't check if player is still in home
        } else {
            var radius = this.homeRadius;
            var distX = Math.abs(this.centerX - player.x);
            var distY = Math.abs(this.centerY - player.y);
            var diffX = distX - player.width / 4;
            var diffY = distY - player.height / 2;

            if ((diffX * diffX + diffY * diffY) > (radius * radius)) {
                if (this.playerDetected) {
                    this.waiting = true;
                    this.waitingTimer = waitingTimerFull;
                }
                this.playerDetected = false;
            }
        }
    }

    this.checkTileCollision = function (x, y, movementX, movementY) {
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

        if (this.tileTypeCollidable(walkIntoTileType)) {
            //console.log("walkIntoTileType: " + walkIntoTileType);
            return true;
        }
    }

    this.tileTypeCollidable = function (tileType) {
        if (this.collidableTiles == []) {
            return false;
        } else if (this.collidableTiles.indexOf(tileType) > -1) {
            return true;
        }
    }

} // end of animal class

function spawnAnimalBasedOnTile(tileType, arrayIndex) {
	switch (tileType) {
		case TILE_DEATH_CAT:
            animal = new deathCat(arrayIndex, tileType);
            objectList.push(animal);
            worldGrid[arrayIndex] = TILE_REPLACE_ANIMAL;
            break;
        case TILE_STEBS_BIRD:
            animal = new bigBird(arrayIndex, tileType);
            objectList.push(animal);
            worldGrid[arrayIndex] = TILE_REPLACE_ANIMAL;
            break;
        case TILE_RABBIT:
            var rabbitsToSpawn = [];
            rabbitsToSpawn = arrayWithRange(getRoundedRandomNumberBetweenMinMax(3, 4));
            for (var r = 0; r < rabbitsToSpawn.length; r++) {
                animal = new rabbitClass(arrayIndex, tileType);
                objectList.push(animal);
            }
            worldGrid[arrayIndex] = TILE_REPLACE_ANIMAL;
            break;
        case TILE_JUMPING_FISH:
            animal = new jumpingFish(arrayIndex, tileType);
            objectList.push(animal);
            worldGrid[arrayIndex] = TILE_WATER;
            break;
        case TILE_ALLIGATOR:
            animal = new alligatorClass(arrayIndex, tileType);
            objectList.push(animal);
            worldGrid[arrayIndex] = TILE_WATER;
            break;
        case TILE_PINCHER_BUG:
            animal = new pincherBug(arrayIndex, tileType);
            objectList.push(animal);
            worldGrid[arrayIndex] = TILE_REPLACE_ANIMAL;
            break;
        case TILE_BEAR:
            animal = new bearClass(arrayIndex, tileType);
            objectList.push(animal);
            worldGrid[arrayIndex] = TILE_REPLACE_ANIMAL;
            break;
    }
}

function isAnAnimalChasingPlayer() {
    for (let i = 0; i < objectList.length; ++i) {
        if (objectList[i].chasingPlayer) {
            return true;
        }
    }
    return false;
}
