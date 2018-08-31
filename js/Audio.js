let backgroundMusic = new Audio();
let chop1 = new Audio();
let chop2 = new Audio();
let missedSwing = new Audio();
let birdSound = new Audio();
let deathMeow = new Audio();

let arrayOfSounds = [backgroundMusic, chop1, chop2];

let audioType = undefined;
let sourceExtension = undefined;

let arrayOfChopSFXs = [chop1,chop2];

let setAudioTypeAndSourceExtension = () => {
  if (backgroundMusic.canPlayType('audio/ogg;')) {
      audioType = 'audio/ogg';
  } else {
      audioType = 'audio/mpeg';
  }

  if (audioType === 'audio/mpeg') {
    sourceExtension = ".mp3";
  } else {
    sourceExtension = ".ogg";
  }
};
setAudioTypeAndSourceExtension();

//be sure to include all SFX and other potential sounds in the array
let assignAudioTypes = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSounds.length; arrayOfSoundsIndex++ ) {
    arrayOfSounds[arrayOfSoundsIndex].type = audioType;
  }
};
assignAudioTypes();

backgroundMusic.src = "music/ChopChopMenu_V1" + sourceExtension;

backgroundMusic.addEventListener('timeupdate', function(){
	var buffer = .44;
    if(this.currentTime > this.duration - buffer) {
    	this.currentTime = 0;
        this.play();
}}, false);

chop1.src = "SFX/Chop1" + sourceExtension;
chop2.src = "SFX/Chop2" + sourceExtension;
missedSwing.src = "SFX/missedSwing" + sourceExtension;
deathMeow.src = "SFX/deathMeow" + sourceExtension;
deathMeow.volume = 0.5;
birdSound.src = "SFX/birdSound" + sourceExtension;
birdSound.volume = 0.6;

let decreaseMasterVolume = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSounds.length; arrayOfSoundsIndex++ ) {
    arrayOfSounds[arrayOfSoundsIndex].volume -= 0.1;
  }
};

let increaseMasterVolume = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSounds.length; arrayOfSoundsIndex++ ) {
    arrayOfSounds[arrayOfSoundsIndex].volume += 0.1;
  }
};
