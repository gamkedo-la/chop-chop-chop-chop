// trees shake when being chopped
const HIT_SHAKE_COUNT = 6; // frames to shake for
const HIT_SHAKE_SPEED = 0.1; // 0.1=fast, 5=slow 
const HIT_SHAKE_SIZE = 2; // size of wobble

var objectList = [];
var trees = [TILE_SMALL_TREE,TILE_SMALL_TREE_ALT,TILE_TALL_TREE,
				TILE_LOLLIPOP,TILE_NORMAL_TREE,
				TILE_NORMAL_TREE_ALT,TILE_PUFFY_TREE, TILE_WILLOW_TREE];
var stumps = [TILE_STUMP_ALT,TILE_STUMP,TILE_LOLLIPOP_STUMP,
				TILE_NORMAL_STUMP,TILE_NORMAL_STUMP_ALT,
				TILE_PUFFY_STUMP, TILE_WILLOW_STUMP];
var moonTrees = [TILE_MOON_TREE_1,TILE_MOON_TREE_2,TILE_MOON_TREE_3,TILE_STALAGMITE]
var moonObjects = [TILE_MOON_LARGE_CRATER_1,TILE_MOON_LARGE_CRATER_2,
					TILE_MOON_TREE_1_STUMP,TILE_MOON_TREE_2_STUMP,TILE_MOON_TREE_3_STUMP,
					TILE_STALAGMITE_STUMP];
var replacements = [
TILE_REPLACE_TREE,
TILE_REPLACE_STUMP,
TILE_REPLACE_MOON_OBJECT,TILE_REPLACE_MOON_TREE]

function objectClass (newObject) {
	this.object = newObject;
	this.x = newObject.x;
	this.y = newObject.y;
	this.health = newObject.health;
	this.pendingShakes = 0; // shake for a while when hit
	this.arrayIndex = newObject.arrayIndex;
	this.tileType = newObject.tileType;
	this.img = newObject.img;
	this.width = newObject.width;
	this.height = newObject.height;
	this.hiddenTile = newObject.hiddenTile;
	this.hasLeaves = newObject.hasLeaves;
	this.hasHitbox = newObject.hasHitbox;
	this.colliderWidth = newObject.colliderWidth;
	this.colliderHeight = newObject.colliderHeight;
	this.colliderOffsetX = newObject.colliderOffsetX;
	this.colliderOffsetY = newObject.colliderOffsetY;

	if (this.hasHitbox) {
		this.hitbox = new colliderClass(this.x,this.y,
		this.colliderWidth,this.colliderHeight,
		this.colliderOffsetX,this.colliderOffsetY);
	}
	this.remove = false;

	this.move = function() {
		// nothing
	}

	this.draw = function() {
		if ((replacements.indexOf(worldGrid[this.arrayIndex]) > -1)) {
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
			//console.log("Tree falling!");
			player.treeCount++; // add to stats for GUI
			treesCutThisLevel++
			if (treesCutThisLevel >= allLevels[currentLevelIndex].treesToCut) {
				for (var i = 0; i < worldGrid.length; i++) {
					if (worldGrid[i] === TILE_THORN) {
						worldGrid[i] = TILE_TERRAIN
					}
				}
			}
			
			var yoffset = 0; // to make things come from higher up if reqd
			var prefix = ""; // to change "leaf" to "tall_leaf"
			if (this.tileType == TILE_TALL_TREE || 
				this.tileType == TILE_MOON_TREE_1) {
				yoffset = -64;
				prefix = "tall_";
			}

			if (this.tileType == TILE_MOON_TREE_2) {
				prefix = "moon_tree_2_";
			}
			
			var leavesToSpawn = 12;
			for (var leaves = 0; leaves < leavesToSpawn; leaves++) {

				// leaves
				if (this.hasLeaves) spawnParticles(prefix+'leaf',this.x+Math.random()*48-16, yoffset+this.y-20 + Math.random()*10); // from top of tree, a leaf falls

				// a few chunks of wood debris / logs / branches
				if (Math.random()<0.15) spawnParticles(prefix+'debris0',this.x+Math.random()*32, yoffset+this.y + Math.random()*10); 
				if (Math.random()<0.15) spawnParticles(prefix+'debris1',this.x+Math.random()*32, yoffset+this.y + Math.random()*10); 
				if (Math.random()<0.15) spawnParticles(prefix+'debris2',this.x+Math.random()*32, yoffset+this.y + Math.random()*10); 
			}
			spawnProperRemnants(this.tileType,this.arrayIndex,this.hiddenTile);
			this.remove = true;
		}
	}

} // end of objectClass

function spawnObjectBasedOnTile(tileType, arrayIndex, hiddenTile) {
	switch (tileType) {
		case TILE_SMALL_TREE:
		case TILE_SMALL_TREE_ALT:
		case TILE_WILLOW_TREE:
		case TILE_TALL_TREE:
		case TILE_MOON_TREE_1:
		case TILE_LOLLIPOP:
		case TILE_STALAGMITE:
		case TILE_NORMAL_TREE:
		case TILE_NORMAL_TREE_ALT:		
		case TILE_PUFFY_TREE:
		case TILE_MOON_TREE_2:
		case TILE_MOON_TREE_3:
			newObject = new standardTreeClass(tileType, arrayIndex, hiddenTile);
			break;
		case TILE_STUMP:
		case TILE_STUMP_ALT:
		case TILE_WILLOW_STUMP:
		case TILE_LOLLIPOP_STUMP:
		case TILE_MOON_TREE_1_STUMP:
		case TILE_STALAGMITE_STUMP:
		case TILE_NORMAL_STUMP:
		case TILE_NORMAL_STUMP_ALT:
		case TILE_PUFFY_STUMP:
		case TILE_MOON_LARGE_CRATER_1:
		case TILE_MOON_LARGE_CRATER_2:
		case TILE_MOON_TREE_2_STUMP:
		case TILE_MOON_TREE_3_STUMP:
			newObject = new standardStumpClass(tileType, arrayIndex, hiddenTile);
			break;
	}
	objectList.push(newObject);
	replaceTiles(arrayIndex);
}

function replaceTiles(arrayIndex) {
	if (trees.indexOf(worldGrid[arrayIndex]) > -1) {
		worldGrid[arrayIndex] = TILE_REPLACE_TREE;
	} else if (stumps.indexOf(worldGrid[arrayIndex]) > -1) {
		worldGrid[arrayIndex] = TILE_REPLACE_STUMP;
	} else if (moonObjects.indexOf(worldGrid[arrayIndex]) > -1) {
		worldGrid[arrayIndex] = TILE_REPLACE_MOON_OBJECT;
	} else if (moonTrees.indexOf(worldGrid[arrayIndex]) > -1) {
		worldGrid[arrayIndex] = TILE_REPLACE_MOON_TREE;
	}
}

function spawnProperRemnants(tileType, arrayIndex, hiddenTile) {
	worldGrid[arrayIndex - worldCols] = hiddenTile;
	switch (tileType) {
		case TILE_SMALL_TREE:
			worldGrid[arrayIndex] = TILE_STUMP;
		break;
		case TILE_SMALL_TREE_ALT:		
		case TILE_TALL_TREE:
			worldGrid[arrayIndex] = TILE_STUMP_ALT;
		break;
		case TILE_MOON_TREE_1:
			worldGrid[arrayIndex] = TILE_MOON_TREE_1_STUMP;
		break;
		case TILE_WILLOW_TREE:
			worldGrid[arrayIndex] = TILE_WILLOW_STUMP;
		break;
		case TILE_LOLLIPOP:
			worldGrid[arrayIndex] = TILE_LOLLIPOP_STUMP;
		break;
		case TILE_STALAGMITE:
			worldGrid[arrayIndex] = TILE_STALAGMITE_STUMP;
		break;
		case TILE_NORMAL_TREE:
			worldGrid[arrayIndex] = TILE_NORMAL_STUMP;
			break;
		case TILE_NORMAL_TREE_ALT:
			worldGrid[arrayIndex] = TILE_NORMAL_STUMP_ALT;
			break;
		case TILE_PUFFY_TREE:
			worldGrid[arrayIndex] = TILE_PUFFY_STUMP;
			break; 
		case TILE_MOON_TREE_2:
			worldGrid[arrayIndex] = TILE_MOON_TREE_2_STUMP;
			break;
		case TILE_MOON_TREE_3:
			worldGrid[arrayIndex] = TILE_MOON_TREE_3_STUMP;
			break;
	}
}

function moveAllObjects() {
	for (var i = 1; i < objectList.length; i++) {
		objectList[i].move();
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
