var objectList = [];

function objectClass (img,x,y,width,height,worldTileType) {
	this.x = x;
	this.y = y;
	this.img = img;
	this.width = width;
	this.height = height;
	this.AABB = {
		topLeft: { x: this.x - this.width/4 + TILE_W/2, y: this.y - this.height/2 },
		topRight: { x: this.x + this.width/4 + TILE_W/2, y: this.y - this.height/2 },
		bottomRight: { x: this.x + this.width/4 + TILE_W/2, y: this.y + this.height/2 },
		bottomLeft: { x: this.x - this.width/4 + TILE_W/2, y: this.y + this.height/2 },
	}

	this.draw = function() {
		canvasContext.drawImage(this.img,this.x - this.width/4,this.y - this.height/4 - TILE_H/2);
		canvasContext.beginPath();
		canvasContext.moveTo(this.AABB.topLeft.x,this.AABB.topLeft.y);
		canvasContext.lineTo(this.AABB.topRight.x,this.AABB.topRight.y);
		canvasContext.lineTo(this.AABB.bottomRight.x,this.AABB.bottomRight.y);
		canvasContext.lineTo(this.AABB.bottomLeft.x,this.AABB.bottomLeft.y);
		canvasContext.lineTo(this.AABB.topLeft.x,this.AABB.topLeft.y);
		canvasContext.strokeStyle = "red";
		canvasContext.stroke()
	}
} // end of objectClass

function drawAllObjects() {
	for (var i = 0; i < objectList.length; i++) {
		objectList[i].draw();
	}
}