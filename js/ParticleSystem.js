// Particle System by Brandon Trumpold

// To add a new particle type to the system, simply add a new object inside of particleDefs
// The "type" can be named anything you'd like, but should usually be named what that particle is used for
// "howMany" is how many particles you'd like to spawn, "startSpeed" of course refers to it's speed
// the higher "howLong" is, the longer the particle will live, the higher the "gravity", the faster the particles will fall
// "startAng" refers to where you'd like the particles to start (0 is directly to the right, 180 is to the left
// and "angSpreadDeg" will allow you specify how wide of an angle youd like the particles to come out at, 360 will give you a full circle if startAng is 0
// "floorDist" is the number of pixels below the startY that particles will consider the floor to bounce off of (leave blank for none)
// If you want to have different sizes for the particles, simply add a variable to the draw function instead of 2,2

const PARTICLE_W = 1; // in pixels
const PARTICLE_H = 1;
const BOUNCE_SCALE = -0.5; // influence speed when we bounce off the floor
const PARTICLE_SPEED_DAMPENING = 0.95;

var particleDefs = [
	{type: 'chop', howMany: 15, startSpeed: 2, howLong: 50, gravity: 0.2, startAng: -90, angSpreadDeg: 90, color: 'white', floorDist: 32},
	{type: 'moon_chop', howMany: 15, startSpeed: 2, howLong: 50, gravity: 0.2, startAng: -90, angSpreadDeg: 90, color: 'black', floorDist: 32, width: 2, height: 2 },				
	{type: 'fireworks', howMany: 15, startSpeed: 7, howLong: 30, gravity: 0.1, startAng: 0, angSpreadDeg: 180, color: 'white'},
	{type: 'footstep', howMany: 3, startSpeed: 0.5, howLong: 20, gravity: 0.02, startAng: -90, angSpreadDeg: 90, color: 'white'},
	{type: 'sparks', howMany: 1, startSpeed: 1, howLong: 25, gravity: 0.015, startAng: -90, angSpreadDeg: 45, color: 'white'},
	{type: 'splash', howMany: 30, startSpeed: 2, howLong: 35, gravity: 0.015, startAng: -90, angSpreadDeg: 45, color: 'white'},
	{type: 'leaf', howMany: 1, startSpeed: 0.75, howLong: 1000, gravity: 0.015, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 48, isLeaf:true, sprite:"leaf" },
	{type: 'debris0', howMany: 1, startSpeed: 3, howLong: 1000, gravity: 0.3, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 22, isLeaf:true, sprite:"debris0" },
	{type: 'debris1', howMany: 1, startSpeed: 3, howLong: 1000, gravity: 0.3, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 28, isLeaf:true, sprite:"debris1" },
	{type: 'debris2', howMany: 1, startSpeed: 3, howLong: 1000, gravity: 0.3, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 24, isLeaf:true, sprite:"debris2" },
	{type: 'tall_leaf', howMany: 1, startSpeed: 0.75, howLong: 1000, gravity: 0.015, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 48+112, isLeaf:true, sprite:"leaf" },
	{type: 'tall_debris0', howMany: 1, startSpeed: 3, howLong: 1000, gravity: 0.3, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 22+112, isLeaf:true, sprite:"debris0" },
	{type: 'tall_debris1', howMany: 1, startSpeed: 3, howLong: 1000, gravity: 0.3, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 28+112, isLeaf:true, sprite:"debris1" },
	{type: 'tall_debris2', howMany: 1, startSpeed: 3, howLong: 1000, gravity: 0.3, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 24+112, isLeaf:true, sprite:"debris2" },
	{type: 'moon_tree_2_leaf', howMany: 1, startSpeed: 0.65, howLong: 1000, gravity: 0.010, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 48, isLeaf:true, sprite:"spore" },
	{type: 'moon_tree_2_debris0', howMany: 1, startSpeed: 3, howLong: 1000, gravity: 0.3, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 22, isLeaf:true, sprite:"debris0" },
	{type: 'moon_tree_2_debris1', howMany: 1, startSpeed: 3, howLong: 1000, gravity: 0.3, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 28, isLeaf:true, sprite:"debris1" },
	{type: 'moon_tree_2_debris2', howMany: 1, startSpeed: 3, howLong: 1000, gravity: 0.3, startAng: -90, angSpreadDeg: 180, color: 'white', floorDist: 24, isLeaf:true, sprite:"debris2" },
	{type: 'grindstone_sparks', howMany: 1, startSpeed: 2, howLong: 150, gravity: 0.06, startAng: -200, angSpreadDeg: 25, color: 'white', floorDist: 24},				

];
var particleList = [];


function pfx() {

	// Initializing to onscreen values to narrow down point of breakage if any bugs occur
	// These /should/ get set in spawnParticles()
	this.x = 75;
	this.y = 75;
	this.velX = -3;
	this.velY = -3;
	this.cycleLife = 10; // How long the particle will "live" before being removed
	this.gravity = -1;
	this.floorY = 0; // if >0, this is the "floor" Y coordinate particles bounce off of

	this.color = 'white';

	this.move = function() {
		this.x += this.velX;
		this.y += this.velY;

		this.velY += this.gravity;

		if (this.floorY) { // if specified, bounce off the floor
			if (this.y > this.floorY) {
				this.y = this.floorY;
				this.velY = BOUNCE_SCALE * this.velY; // bounce up with less force
				if (this.isLeaf) {
					this.velY = 0; // leaves don't bounce
					this.velX = 0; // and don't slide on the ground
				}
			}
		}

		if (this.isLeaf && (this.velY > this.gravity)) { // float back and forth side to side as it falls
			this.x += Math.sin(this.cycleLife / 10) * 0.5;
		}

		// decay horizontal speed to logs don't slide around
		this.velX *= PARTICLE_SPEED_DAMPENING;

		this.cycleLife--;
	}

	this.readyToRemove = function() {
		return this.cycleLife <= 0; // This will return true once the cycle life has reached 0
	}

	this.draw = function() {
		if (this.sprite) {
			canvasContext.drawImage(gamePics[this.sprite],Math.floor(this.x), Math.floor(this.y));
		} 
		else { // normal square particle:
			drawRect(Math.floor(this.x), Math.floor(this.y), this.width, this.height, this.color, 0.8);
			canvasContext.globalAlpha = 1;
		}
	}

}

// Use this function to spawn the particles, make sure to declare any newly created particles in particleDefs if you haven't already
function spawnParticles(type, startX, startY) {
	var pfxDef = null;
	var howMany = null;

	for (var i = 0; i < particleDefs.length; i++) {
		if (type == particleDefs[i].type) {
			pfxDef = particleDefs[i];
			break;
		}
	}

	if (pfxDef == null) {
		console.log('could not find particle definition, add to particleDefs! type: ' + type);
		return;
	}

	if (pfxDef.howMany == 'random') {
		howMany = getRoundedRandomNumberBetweenMinMax(2,4);
	} else {
		howMany = pfxDef.howMany;
	}

	for (var j = 0; j < howMany; j++) {
		var newPFX = new pfx();

		newPFX.x = startX;
		newPFX.y = startY;
		
		if (pfxDef.floorDist) { // if specified, set a floor height to bounce off
			newPFX.floorY = startY + pfxDef.floorDist;
		}

		// var randAng = Math.random() * Math.PI * 2.0; // random radian

		
		var randAng = (pfxDef.startAng * Math.PI / 180.0) + 2.0 * (Math.random() - 0.5) * pfxDef.angSpreadDeg * (Math.PI / 180.0); // random radian
		var randSpeedPerc = Math.random() * pfxDef.startSpeed;

		newPFX.velX = randSpeedPerc * Math.cos(randAng);
		newPFX.velY = randSpeedPerc * Math.sin(randAng);

		newPFX.color = pfxDef.color;
		newPFX.cycleLife = pfxDef.howLong;
		newPFX.gravity = pfxDef.gravity;
		newPFX.isLeaf = pfxDef.isLeaf;
		newPFX.sprite = pfxDef.sprite;
		newPFX.width = (pfxDef.width == undefined) ? PARTICLE_W : pfxDef.width;
		newPFX.height = (pfxDef.height == undefined) ? PARTICLE_H : pfxDef.height;

		particleList.push(newPFX);
	}	
}

function moveParticles() {
	for (var i = 0; i < particleList.length; i++) {
		particleList[i].move();
	}

	for (var i = particleList.length - 1; i >= 0; i--) {
		if ( particleList[i].readyToRemove() ) { 
			particleList.splice(i, 1);
		}
	} 
}

function drawParticles() {
	for (var i = 0; i < particleList.length; i++) {
		particleList[i].draw();
	}
}