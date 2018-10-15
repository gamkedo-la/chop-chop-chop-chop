function standardStumpClass (worldTileType,arrayIndex,hiddenTile) {
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
	this.hasHitbox = false;

	if (worldTileType == TILE_NORMAL_STUMP_ALT) {
		this.x = position.x - this.width/4;
		this.y = position.y - 1;
	}

	if (this.worldTileType == TILE_MOON_LARGE_CRATER_1 ||
		this.worldTileType == TILE_MOON_LARGE_CRATER_2) {
		this.x = position.x;
		this.y = position.y;
	}

	if (worldTileType == TILE_MOON_CHEESE_STUMP) {
		this.x = position.x - this.width/4;
		this.y = position.y - this.height/2;
		this.hasLeaves = false;
	}

	return new objectClass(this);
}