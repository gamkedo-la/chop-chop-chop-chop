let backgroundMusic = new Audio();
let chop1 = new Audio();
let chop2 = new Audio();
let metallicChop = new Audio();
let missedSwing = new Audio();
let campfireSFX = new Audio();
let birdSound = new Audio();
let deathMeow = new Audio();
let playerHurt = new Audio();

let arrayOfSounds = [backgroundMusic,chop1,chop2,metallicChop,missedSwing,campfireSFX,birdSound,deathMeow,playerHurt];

let arrayOfMusic = [backgroundMusic];
let arrayOfSFXs = [chop1,chop2,metallicChop,missedSwing,campfireSFX,birdSound,deathMeow,playerHurt];

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

let volumeDefault = 1;

chop1.src = "SFX/Chop1" + sourceExtension;
chop2.src = "SFX/Chop2" + sourceExtension;
missedSwing.src = "SFX/MissedSwing" + sourceExtension;
metallicChop.src = "SFX/MetallicChop" + sourceExtension;
metallicChop.volume = 0.5;
campfireSFX.src = "SFX/Fire" + sourceExtension;
deathMeow.src = "SFX/DeathMeow" + sourceExtension;
deathMeow.volume = 0.5;
birdSound.src = "SFX/BirdSound" + sourceExtension;
birdSound.volume = 0.6;
playerHurt.src = "SFX/PlayerHurt" + sourceExtension;

/*let decreaseMasterVolume = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSounds.length; arrayOfSoundsIndex++ ) {
    arrayOfSounds[arrayOfSoundsIndex].volume -= 0.1;
  }
};*/

let decreaseMusicVolume = () => {
  for ( let arrayOfMusicIndex = 0; arrayOfMusicIndex < arrayOfMusic.length; arrayOfMusicIndex++ ) {
    arrayOfMusic[arrayOfMusicIndex].volume -= 0.1;
  }
};

let decreaseSFXVolume = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSFXs.length; arrayOfSoundsIndex++ ) {
    arrayOfSFXs[arrayOfSoundsIndex].volume -= 0.1;
  }
};

let increaseMusicVolume = () => {
  for ( let arrayOfMusicIndex = 0; arrayOfMusicIndex < arrayOfMusic.length; arrayOfMusicIndex++ ) {
    arrayOfMusic[arrayOfMusicIndex].volume += 0.1;
  }
};

let increaseSFXVolume = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSFXs.length; arrayOfSoundsIndex++ ) {
    arrayOfSFXs[arrayOfSoundsIndex].volume += 0.1;
  }
};
