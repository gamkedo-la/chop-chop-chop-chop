var playerWalking;
var playerSideChop;
var cutsceneAnimation;
var animatedWaterTiles;
var placeholderDeathCatMeander;
var stebsBird;

function makeAnimatedSprites() {
	playerIdle = new AnimatedSpriteClass({
		name: "playerIdle",
		spriteSheet: gamePics.playerWalkingSheet,
		animationColFrames: 8,
		currentFrameIndex: 0,
		framesUntilNext: 1,
		loops: false
	});
	playerWalking = new AnimatedSpriteClass({
		name: "playerWalking",
		spriteSheet: gamePics.playerWalkingSheet,
		animationColFrames: 8,
		currentFrameIndex: 0,
		framesUntilNext: 3,
	});
	playerSideChop = new AnimatedSpriteClass({
		name: "playerSideChop",
		spriteSheet: gamePics.playerSideChopSheet,
		animationColFrames: 16,
		framesUntilNext: 1,
	});
	maxAxeProjectile = new AnimatedSpriteClass({
		name: "maxAxeProjectile",
		spriteSheet: gamePics.maxAxeProjectileSheet,
		animationColFrames: 4,
		framesUntilNext: 1,
	});
	cutsceneAnimation = new AnimatedSpriteClass({
		name: "cutsceneAnimation",
		spriteSheet: gamePics.cutscene,
		animationColFrames: 4,
		currentFrameIndex: 0,
		framesUntilNext: 1,
		loops: true
	});

};

function AnimatedSpriteClass(data) {
	this.data = data;
	this.name = data.name;
	this.spriteSheet = data.spriteSheet;
	this.animationColFrames = data.animationColFrames;
	this.framesUntilNext = data.framesUntilNext;
	this.loops = (data.loops == undefined) ? true : data.loops;
	this.currentFrameIndex = (data.currentFrameIndex == undefined) ? 0 : data.currentFrameIndex;
	this.framesMoveSideways = (data.framesMoveSideways == undefined) ? true : data.framesMoveSideways;
	this.framesBetweenLoops = (data.framesBetweenLoops == undefined) ? 0 : data.framesBetweenLoops;
	this.animationRowFrames = (data.animationRowFrames == undefined) ? 1 : data.animationRowFrames;
	this.numberOfColFrameIndexes = data.animationColFrames - 1;
	this.numberOfRowFrameIndexes = data.animationRowFrames - 1;
	this.currentPauseFramesLeft = 0;
	this.reversing = false;
	this.x = data.x;
	this.y = data.y;
	this.arrayIndex = data.arrayIndex;
	this.tileType = data.tileType;
	this.makesNoise = (data.makesNoise == undefined) ? false : data.makesNoise;
	this.noise = (data.makesNoise == false) ? null : data.noise;

	this.setFrame = function(frame) {
		this.currentFrameIndex = frame;
	}

	this.getFrame = function(frame) {
		return this.currentFrameIndex;
	}

	this.draw = function (x,y, currentAxisIndexOfAnimation = 1,
							flipped = false, rotated = false, degrees,
							offsetInRelationToRotationX,offsetInRelationToRotationY,
	 						opacity = 1, streched = false, strechX = 1, strechY = 1,
	 						loopsToEndAndBack = false) {
		let additionalWidth;
		let additionalHeight;
		canvasContext.save();
        canvasContext.globalAlpha = opacity;
        if (rotated) {
			canvasContext.translate(x, y);
			canvasContext.rotate(degrees*DEGREES_TO_RADIANS);
		}
		if (flipped) {
			if (rotated) {
				canvasContext.scale(-1,1);
			} else {
			canvasContext.translate(x + (this.spriteSheet.width / this.animationColFrames), y);
			canvasContext.scale(-1,1);
			}
		}
		if (this.loops) {
			if(this.currentPauseFramesLeft <= 0) {
                if (framesFromGameStart % this.framesUntilNext == 0) {
                	if (loopsToEndAndBack) {
                    	if (!this.reversing) {
	                    		this.currentFrameIndex++;
	                    		if (this.framesMoveSideways) {
	                    			if (this.currentFrameIndex == this.numberOfColFrameIndexes) {
	                    				this.reversing = true;
	                    			}
	                    		} else {
	                    			if (this.currentFrameIndex == this.numberOfRowFrameIndexes) {
	                    				this.reversing = true;
	                    			}
	                    		}
                    	} else if (this.reversing) {
                    		this.currentFrameIndex--;
                    		if (this.currentFrameIndex == 0) {
                    			this.reversing = false;
                    		}
                    	}
                    } else {
	                    this.currentFrameIndex++;
	                    if (this.framesMoveSideways) {
		                    if (this.currentFrameIndex > this.numberOfColFrameIndexes) {
		                        this.currentFrameIndex = 0;
		                        this.currentPauseFramesLeft = this.framesBetweenLoops;
		                    }
		                } else {
		                	if (this.currentFrameIndex > this.numberOfRowFrameIndexes) {
		                        this.currentFrameIndex = 0;
		                        this.currentPauseFramesLeft = this.framesBetweenLoops;
		                    } // end of reset currentFrameIndex if > numberOfRowFrameIndexes
		                } // end of else check when sprite sheet isn't orientated sideways
                    } // end of else if loopsToEndAndBack is false
                } // end of framesFromGameStart % this.framesUntilNext == 0;
            } else {
				this.currentPauseFramesLeft--;
			}
		}
		if (streched) {
			additionalWidth = this.spriteSheet.width;
			additionalHeight = this.spriteSheet.height;
		} else {
			additionalWidth = 0;
			additionalHeight = 0;
		}
		if (this.framesMoveSideways) { //The frames in the source image are arranged left to right, all using the same height
			if (rotated) {
				canvasContext.drawImage(this.spriteSheet,
									this.currentFrameIndex * this.spriteSheet.width/this.animationColFrames,
									(currentAxisIndexOfAnimation - 1) * this.spriteSheet.height/this.animationRowFrames,
									this.spriteSheet.width/this.animationColFrames, 
									this.spriteSheet.height/this.animationRowFrames,
									offsetInRelationToRotationX, offsetInRelationToRotationY,
									this.spriteSheet.width/this.animationColFrames, 
									this.spriteSheet.height/this.animationRowFrames);
			} else if (flipped) {
				canvasContext.drawImage(this.spriteSheet,
									this.currentFrameIndex * this.spriteSheet.width/this.animationColFrames,
									(currentAxisIndexOfAnimation - 1) * this.spriteSheet.height/this.animationRowFrames,
									this.spriteSheet.width/this.animationColFrames, 
									this.spriteSheet.height/this.animationRowFrames,
									(this.spriteSheet.width / this.animationColFrames) / 2,
									-this.spriteSheet.height / 2,
									this.spriteSheet.width/this.animationColFrames + (additionalWidth * strechX),
									this.spriteSheet.height/this.animationRowFrames * strechY);
			} else {
				canvasContext.drawImage(this.spriteSheet,
									this.currentFrameIndex * this.spriteSheet.width/this.animationColFrames,
									(currentAxisIndexOfAnimation - 1) * this.spriteSheet.height/this.animationRowFrames,
									this.spriteSheet.width/this.animationColFrames, 
									this.spriteSheet.height/this.animationRowFrames,
									x - (this.spriteSheet.width / this.animationColFrames) / 2,
									y - (this.spriteSheet.height / this.animationRowFrames) / 2,
									this.spriteSheet.width/this.animationColFrames + (additionalWidth * strechX),
									(this.spriteSheet.height/this.animationRowFrames) * strechY);
			}
		} else {
			if (rotated) { //The frames in the source image are arranged top to bottom, all using the same width
				canvasContext.drawImage(this.spriteSheet,
									(currentAxisIndexOfAnimation - 1) * this.spriteSheet.width/this.animationColFrames,
									this.currentFrameIndex * this.spriteSheet.width/this.animationRowFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationRowFrames,
									offsetInRelationToRotationX, offsetInRelationToRotationY,
									this.spriteSheet.width, this.spriteSheet.height/this.animationRowFrames);
			} else if (flipped) {
				canvasContext.drawImage(this.spriteSheet,
									(currentAxisIndexOfAnimation - 1) * this.spriteSheet.width/this.animationColFrames,
									this.currentFrameIndex * this.spriteSheet.height/this.animationRowFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationRowFrames,
									0, 0,
									this.spriteSheet.width * strechX,
									this.spriteSheet.height/this.animationRowFrames + (additionalHeight * strechY));
			} else {
				canvasContext.drawImage(this.spriteSheet,
									(currentAxisIndexOfAnimation - 1) * this.spriteSheet.width/this.animationColFrames,
									this.currentFrameIndex * this.spriteSheet.height/this.animationRowFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationRowFrames,
									x - (this.spriteSheet.width / this.animationColFrames) / 2,
									y - (this.spriteSheet.height / this.animationRowFrames) / 2,
									this.spriteSheet.width * strechX,
									this.spriteSheet.height/this.animationRowFrames + (additionalHeight * strechY));
			}
		}
	canvasContext.restore();
	} // end of draw function
}; //end of Animated Sprite Class
