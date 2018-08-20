var animalList = [];

function animalClass (img,x,y,width,height,worldTileType) {
	this.x = x;
	this.y = y;
	this.img = img;
	this.width = width;
	this.height = height;

	this.draw = function() {
		drawRect(this.x,this.y,this.width,this.height, "red")
		/*canvasContext.drawImage(this.img,this.x - this.width/4,this.y - this.height/4 - TILE_H/2);
*/	}
	
	this.move = function() {
		var movePosX = Math.random();
		var movePosY = Math.random();
		this.x += (movePosX > 0.5 ? Math.random() * 4 : -Math.random() * 4);
		this.y += (movePosY > 0.5 ? Math.random() * 4 : -Math.random() * 4);
	}
} // end of objectClass

function drawAllAnimals() {
	for (var i = 0; i < animalList.length; i++) {
		animalList[i].draw();
	}
}

function moveAllAnimals() {
	for (var i = 0; i < animalList.length; i++) {
		animalList[i].move();
	}
}