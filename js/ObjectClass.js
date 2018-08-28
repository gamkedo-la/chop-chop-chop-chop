var objectList = [];

function objectClass (img,x,y,width,height,worldTileType,arrayIndex) {
	this.x = x;
	this.y = y;
	this.img = img;
	this.width = width;
	this.height = height;
	this.health = 2;
	var colliderWidth = 32;
	var colliderHeight = 64;
	var colliderOffsetX = this.width/4;
	var colliderOffsetY = 0;
	this.hitbox = new colliderClass(x + TILE_W/2,y + TILE_H/2,
		colliderWidth,colliderHeight,colliderOffsetX,colliderOffsetY);
	this.hitbox.update(this.x, this.y);

	this.draw = function() {
		canvasContext.drawImage(this.img,this.x - this.width/4,this.y - this.height/4 - TILE_H/2);
		this.hitbox.draw("red");
	}
} // end of objectClass

function drawAllObjects() {
	for (var i = 0; i < objectList.length; i++) {
		objectList[i].draw();
	}
}