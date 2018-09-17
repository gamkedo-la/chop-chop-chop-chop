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
	this.colliderHeight = this.height;
	this.colliderOffsetX = this.width/4 + 3;
	this.colliderOffsetY = 0;

	// handle tall tree (64x128) non-standard size
	if (worldTileType == TILE_TALL_TREE) {
		//console.log("Tall tree detected!");
		this.health = 4;
		this.y -= 48;
		this.colliderHeight = this.height/2;
		this.colliderOffsetY = 48;
		this.colliderOffsetX -= 6;
	}

	if (worldTileType == TILE_LOLLIPOP) {
		this.hasLeaves = false;
		this.colliderWidth = TILE_W/4 - 4;
		this.colliderHeight = 28;
		this.colliderOffsetX = this.width/4 - 1;
		this.colliderOffsetY = TILE_H/2;
	}

	if (worldTileType == TILE_STALAGMITE) {
		this.hasLeaves = false;
		this.health = 5;
		this.colliderWidth = TILE_W - 10;
		this.colliderHeight = this.height - 8;
		this.colliderOffsetX = this.width/4 + 1;
	}

	return new objectClass(this);
}