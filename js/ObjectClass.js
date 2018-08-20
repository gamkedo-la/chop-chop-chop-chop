var objectList = [];

function objectClass (img,x,y,width,height,worldTileType) {
	this.x = x;
	this.y = y;
	this.img = img;
	this.width = width;
	this.height = height;

	this.draw = function() {
		canvasContext.drawImage(this.img,this.x - this.width/4,this.y - this.height/4 - TILE_H/2);
	}
} // end of objectClass

function drawAllObjects() {
	for (var i = 0; i < objectList.length; i++) {
		objectList[i].draw();
	}
}