// Particle System by Brandon Trumpold

// To add a new particle type to the system, simply add a new object inside of particleDefs
// The "type" can be named anything you'd like, but should usually be named what that particle is used for
// "howMany" is how many particles you'd like to spawn, "startSpeed" of course refers to it's speed
// the higher "howLong" is, the longer the particle will live, the higher the "gravity", the faster the particles will fall
// "startAng" refers to where you'd like the particles to start (0 is directly to the right, 180 is to the left
// and "angSpreadDeg" will allow you specify how wide of an angle youd like the particles to come out at, 360 will give you a full circle if startAng is 0
// If you want to have different sizes for the particles, simply add a variable to the draw function instead of 2,2

var particleDefs = [
					{type: 'chop', howMany: 15, startSpeed: 7, howLong: 30, gravity: 0.1, startAng: 0, angSpreadDeg: 180, color: 'white'}
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

	this.color = 'white';

	this.move = function() {
		this.x += this.velX;
		this.y += this.velY;

		this.velY += this.gravity;

		this.cycleLife--;
	}

	this.readyToRemove = function() {
		return this.cycleLife <= 0; // This will return true once the cycle life has reached 0
	}

	this.draw = function() {
		drawRect(Math.floor(this.x), Math.floor(this.y), 2,2, this.color, 0.8);
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

		// var randAng = Math.random() * Math.PI * 2.0; // random radian

		
		var randAng = (pfxDef.startAng * Math.PI / 180.0) + 2.0 * (Math.random() - 0.5) * pfxDef.angSpreadDeg * (Math.PI / 180.0); // random radian
		var randSpeedPerc = Math.random() * pfxDef.startSpeed;

		newPFX.velX = randSpeedPerc * Math.cos(randAng);
		newPFX.velY = randSpeedPerc * Math.sin(randAng);

		newPFX.color = pfxDef.color;
		newPFX.cycleLife = pfxDef.howLong;
		newPFX.gravity = pfxDef.gravity;

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