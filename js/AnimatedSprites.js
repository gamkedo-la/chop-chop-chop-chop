var playerSideChop;

function makeAnimatedSprites() {
	playerSideChop = new AnimatedSpriteClass({
			spriteSheet: gamePics.playerSideChopSheet,
			animationFrames: 16,
			framesUntilNext: 8
	});
};

// Animated Sprite Class

function AnimatedSpriteClass(data) {
	this.data = data;
	this.spriteSheet = data.spriteSheet;
	this.animationFrames = data.animationFrames;
	this.numberOfFrameIndexes = data.animationFrames - 1;
	this.currentFrameIndex = 0;
	this.framesUntilNext = data.framesUntilNext;
	this.framesMoveSideways = data.framesMoveSideways || true;
	this.loops = data.loops || true;
	this.framesBetweenLoops = data.framesBetweenLoops || 0;
	this.currentPauseFramesLeft = 0;
	this.reversing = data.reversing || false;

	this.setFrame = function(frame) {
		this.currentFrameIndex = frame;
	}

	this.getFrame = function(frame) {
		return this.currentFrameIndex;
	}

	//	canvasContext.drawImage(image,
	//							source x, source y, source width, source height,
	//							destination x, destination y, destination width/ strech/squish, destination height/ strech/squish);

	this.draw = function (x,y, flipped = false, rotated = false, degrees, offsetInRelationToRotationX,offsetInRelationToRotationY,
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
			canvasContext.translate(x + (this.spriteSheet.width / this.animationFrames), y);
			canvasContext.scale(-1,1);
			}
		}
		if (this.loops) {
			if(this.currentPauseFramesLeft <= 0) {
                if (framesFromGameStart % this.framesUntilNext == 0) {
                	if (loopsToEndAndBack) {
                    	if (!this.reversing) {
                    		this.currentFrameIndex++;
                    		if (this.currentFrameIndex == this.numberOfFrameIndexes) {
                    			this.reversing = true;
                    		}
                    	} else if (this.reversing) {
                    		this.currentFrameIndex--;
                    		if (this.currentFrameIndex == 0) {
                    			this.reversing = false;
                    		}
                    	}		
                    } else {
	                    this.currentFrameIndex++;
	                    if (this.currentFrameIndex > this.numberOfFrameIndexes) {
	                        this.currentFrameIndex = 0;
	                        this.currentPauseFramesLeft = this.framesBetweenLoops;
	                    }
                    }
                }
            } else{
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
		if (this.framesMoveSideways) {
			if (rotated) {
			//The frames in the source image are arranged left to right, all using the same height
				canvasContext.drawImage(this.spriteSheet,
									this.currentFrameIndex * this.spriteSheet.width/this.animationFrames, 0,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height,
									offsetInRelationToRotationX, offsetInRelationToRotationY,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height);
			} else if (flipped) {
				canvasContext.drawImage(this.spriteSheet, 
									this.currentFrameIndex * this.spriteSheet.width/this.animationFrames, 0,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height,
									(this.spriteSheet.width / this.animationFrames) / 2, 
									-this.spriteSheet.height / 2,
									this.spriteSheet.width/this.animationFrames + (additionalWidth * strechX),
									this.spriteSheet.height * strechY);
			} else {
				canvasContext.drawImage(this.spriteSheet, 
									this.currentFrameIndex * this.spriteSheet.width/this.animationFrames, 0,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height,
									x, y,
									this.spriteSheet.width/this.animationFrames + (additionalWidth * strechX),
									this.spriteSheet.height * strechY);
			}
		} else {
			if (rotated) {
			//The frames in the source image are arranged top to bottom, all using the same width
				canvasContext.drawImage(this.spriteSheet,
									0, this.currentFrameIndex * this.spriteSheet.width/this.animationFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames,
									offsetInRelationToRotationX, offsetInRelationToRotationY,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames);
			} else if (flipped) {
				canvasContext.drawImage(this.spriteSheet,
									0, this.currentFrameIndex * this.spriteSheet.height/this.animationFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames,
									0, 0,
									this.spriteSheet.width * strechX,
									this.spriteSheet.height/this.animationFrames + (additionalHeight * strechY));
			} else {
				canvasContext.drawImage(this.spriteSheet,
									0, this.currentFrameIndex * this.spriteSheet.height/this.animationFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames,
									x, y,
									this.spriteSheet.width * strechX,
									this.spriteSheet.height/this.animationFrames + (additionalHeight * strechY));
			}
		}
	canvasContext.restore();
	} // end of draw function
}; //end of Animated Sprite Class