// trees shake when being chopped
const HIT_SHAKE_COUNT = 6; // frames to shake for
const HIT_SHAKE_SPEED = 0.1; // 0.1=fast, 5=slow 
const HIT_SHAKE_SIZE = 2; // size of wobble

var objectList = [];
var objects = [TILE_STUMP_ALT,
TILE_STUMP,
TILE_SMALL_TREE,
TILE_SMALL_TREE_ALT,
TILE_REPLACE_TREE,
TILE_REPLACE_STUMP]

function objectClass (img,x,y,width,height,worldTileType,arrayIndex,hiddenTile) {
	this.x = x;
	this.y = y;
	this.img = img;
	this.width = width;
	this.height = height;
	this.health = 2;
	this.pendingShakes = 0; // shake for a while when hit
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.hiddenTile = hiddenTile;
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
		if ((objects.indexOf(worldGrid[this.arrayIndex]) > -1)) {
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
		} else {
			return;
		}
	}

	this.gotHit = function(healthToSubtract) {
		this.health -= healthToSubtract;
		this.pendingShakes = HIT_SHAKE_COUNT;
		if (this.health <= 0) {
			console.log("Tree falling!");
			var leavesToSpawn = 12;
			for (var leaves = 0; leaves < leavesToSpawn; leaves++) {
				
				// leaves
				spawnParticles('leaf',this.x+Math.random()*48-16, this.y-20 + Math.random()*10); // from top of tree, a leaf falls

				// a few chunks of wood debris / logs / branches
				if (Math.random()<0.15) spawnParticles('debris0',this.x+Math.random()*32, this.y + Math.random()*10); 
				if (Math.random()<0.15) spawnParticles('debris1',this.x+Math.random()*32, this.y + Math.random()*10); 
				if (Math.random()<0.15) spawnParticles('debris2',this.x+Math.random()*32, this.y + Math.random()*10); 
			}
			spawnProperRemnants(this.tileType,this.arrayIndex, this.hiddenTile);
			this.remove = true;
		}
	}

	this.replaceTiles = function() {
		if (this.tileType == TILE_SMALL_TREE || this.tileType == TILE_SMALL_TREE_ALT) {
			worldGrid[this.arrayIndex] = TILE_REPLACE_TREE;
		} else if (this.tileType == TILE_STUMP || this.tileType == TILE_STUMP_ALT) {
			worldGrid[this.arrayIndex] = TILE_REPLACE_STUMP;
		}
	}

} // end of objectClass

function spawnProperRemnants(tileType, arrayIndex, hiddenTile) {
	switch (tileType) {
		case TILE_SMALL_TREE:
			worldGrid[arrayIndex - worldCols] = hiddenTile;
			worldGrid[arrayIndex] = TILE_STUMP;
		break;
		case TILE_SMALL_TREE_ALT:
			worldGrid[arrayIndex - worldCols] = hiddenTile;
			worldGrid[arrayIndex] = TILE_STUMP_ALT;
		break;
	}
}

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
		case TILE_SMALL_TREE:
		case TILE_SMALL_TREE_ALT:
			return true;
			break;
		default: 
			return false;
			break;
	}
}

