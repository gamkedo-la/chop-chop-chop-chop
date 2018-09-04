// trees shake when being chopped
const HIT_SHAKE_COUNT = 6; // frames to shake for
const HIT_SHAKE_SPEED = 0.1; // 0.1=fast, 5=slow 
const HIT_SHAKE_SIZE = 2; // size of wobble

var objectList = [];

function objectClass (img,x,y,width,height,worldTileType,arrayIndex) {
	this.x = x;
	this.y = y;
	this.img = img;
	this.width = width;
	this.height = height;
	this.health = 2;
	this.pendingShakes = 0; // shake for a while when hit
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	var colliderWidth = TILE_W - 5;
	var colliderHeight = 64;
	var colliderOffsetX = this.width/4 + 3;
	var colliderOffsetY = 0;
	this.hasHitbox = tileTypeGetsHitbox(this.tileType);
	if (this.hasHitbox) {
		this.hitbox = new colliderClass(this.x + TILE_W/2,this.y + TILE_H/2,
		colliderWidth,colliderHeight,colliderOffsetX,colliderOffsetY);
	}
	this.remove = false;

	this.draw = function() {
		
		var xoffset = 0; // optionally vibrate a bit after being hit
		if (this.pendingShakes) { 
			xoffset = Math.sin(this.pendingShakes / HIT_SHAKE_SPEED) * HIT_SHAKE_SIZE;
			this.pendingShakes--;
		}
		
		canvasContext.drawImage(this.img,this.x - this.width/4 + xoffset,this.y - this.height/4 - TILE_H/2);
		
		if (this.hasHitbox) {
			this.hitbox.update(this.x,this.y);
			if (debug) this.hitbox.draw("red");
		}
	}

	this.gotHit = function(healthToSubtract) {
		this.health -= healthToSubtract;
		this.pendingShakes = HIT_SHAKE_COUNT;
		if (this.health <= 0) {
			console.log("Tree falling!");
			var leavesToSpawn = 12;
			for (var leaves = 0; leaves < leavesToSpawn; leaves++) {
				spawnParticles('leaf',this.x+Math.random()*32, this.y-20 + Math.random()*10); // from top of tree, a leaf falls

			}
			worldGrid[this.arrayIndex - worldCols] = TILE_NOTHING;
			worldGrid[this.arrayIndex] = TILE_STUMP;
			this.remove = true;
		}
	}
} // end of objectClass

function drawAndRemoveAllObjects() {
	for (var i = 0; i < objectList.length; i++) {
		objectList[i].draw();
	}
	for(var i = objectList.length - 1; i >= 0; i--) {
		if (objectList[i].remove) {
			objectList.splice(i,1);
		}
	}
}

function tileTypeGetsHitbox(tileType) {
	switch (tileType) {
		case TILE_TREE:
			return true;
			break;
		default: 
			return false;
			break;
	}
}

