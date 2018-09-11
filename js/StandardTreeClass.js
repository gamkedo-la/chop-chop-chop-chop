function standardTreeClass (worldTileType,arrayIndex,hiddenTile) {
	var position = indexToCenteredXY(arrayIndex);
	this.x = position.x - TILE_W/2;
	this.y = position.y - TILE_H/2;
	this.arrayIndex = arrayIndex;
	this.tileType = worldTileType;
	this.hiddenTile = hiddenTile;
	this.img = worldPics[this.tileType];
	this.width = this.img.width;
	this.height = this.img.height;
	this.health = 2;
	this.hasLeaves = true;
	this.hasHitbox = true;
	this.colliderWidth = TILE_W - 5;
	this.colliderHeight = 64;
	this.colliderOffsetX = this.width/4 + 3;
	this.colliderOffsetY = 0;

	return new objectClass(this);
}