function AnimatedSpriteClass(data) {
	this.data = data;
	this.spriteSheet = data.spriteSheet;
	this.animationFrames = data.animationFrames;
	this.numberOfFrameIndexes = data.animationFrames - 1;
	this.currentFrameIndex = 0;
	this.framesUntilNext = data.framesUntilNext;
	this.framesMoveSideways = data.framesMoveSideways;
	this.loops = data.loops;
	this.framesBetweenLoops = data.framesBetweenLoops || 0;
	this.currentPauseFramesLeft = 0;
	this.reversing = false;

	this.setFrame = function(frame) {
		this.currentFrameIndex = frame;
	}

	this.getFrame = function(frame) {
		return this.currentFrameIndex;
	}

	//	canvasContext.drawImage(image,
	//							source x, source y, source width, source height,
	//							destination x, destination y, destination width/ strech/squish, destination height/ strech/squish);

	this.draw = function (x,y, opacity = 1, streched = false, strechX = 1, strechY = 1, loopsToEndAndBack = false) {
		let additionalWidth;
		let additionalHeight;
		canvasContext.save();
        canvasContext.globalAlpha = opacity;
		canvasContext.imageSmoothingEnabled = false;
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
			//The frames in the source image are arranged left to right, all using the same height
			canvasContext.drawImage(this.spriteSheet, 
									this.currentFrameIndex * this.spriteSheet.width/this.animationFrames, 0,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height,
									x, y,
									this.spriteSheet.width/this.animationFrames + (additionalWidth * strechX),
									this.spriteSheet.height * strechY);
		} else {
			//The frames in the source image are arranged top to bottom, all using the same width
			canvasContext.drawImage(this.spriteSheet,
									0, this.currentFrameIndex * this.spriteSheet.height/this.animationFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames,
									x, y,
									this.spriteSheet.width * strechX,
									this.spriteSheet.height/this.animationFrames + (additionalHeight * strechY));
		}
		canvasContext.restore();
	}

	this.drawRotated = function(atX,atY,
								offsetInRelationToRotationX,offsetInRelationToRotationY, 
								rotationInDegrees, opacity = 1) {
		canvasContext.imageSmoothingEnabled = false;
		canvasContext.save();
		canvasContext.translate(atX, atY);
		canvasContext.globalAlpha = opacity;
		canvasContext.rotate(rotationInDegrees*DEGREES_TO_RADIANS);
		if (this.framesMoveSideways) {
			canvasContext.drawImage(this.spriteSheet,
									this.currentFrameIndex * this.spriteSheet.width/this.animationFrames, 0,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height,
									offsetInRelationToRotationX, offsetInRelationToRotationY,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height);
		} else {
			canvasContext.drawImage(this.spriteSheet,
									0, this.currentFrameIndex * this.spriteSheet.width/this.animationFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames,
									offsetInRelationToRotationX, offsetInRelationToRotationY,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames);
		}
		canvasContext.restore();
	}
}; //end of Animated Sprite Class