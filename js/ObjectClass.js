var objectList = [];

function objectClass (img,x,y,width,height,worldTileType,arrayIndex) {
	this.x = x;
	this.y = y;
	this.img = img;
	this.width = width;
	this.height = height;
	this.health = 2;
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	var colliderWidth = 32;
	var colliderHeight = 64;
	var colliderOffsetX = this.width/4;
	var colliderOffsetY = 0;
	this.hasHitbox = tileTypeGetsHitbox(this.tileType);
	if (this.hasHitbox) {
		this.hitbox = new colliderClass(this.x + TILE_W/2,this.y + TILE_H/2,
		colliderWidth,colliderHeight,colliderOffsetX,colliderOffsetY);
	}
	this.remove = false;

	this.draw = function() {
		canvasContext.drawImage(this.img,this.x - this.width/4,this.y - this.height/4 - TILE_H/2);
		if (this.hasHitbox) {
			this.hitbox.update(this.x,this.y);
			this.hitbox.draw("red");
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

