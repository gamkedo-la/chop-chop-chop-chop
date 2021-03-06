let backgroundMusic = new Audio();
let chop1 = new Audio();
let chop2 = new Audio();
let axeWhirl = new Audio();
let missedSwing = new Audio();
let campfireSFX = new Audio();
let tornadoSwoosh = new Audio();
let birdSound = new Audio();
let deathMeow = new Audio();
let bugSound = new Audio();
let bearRoar1 = new Audio();
let bearRoar2 = new Audio();
let bearRoar3 = new Audio();
let playerHurt = new Audio();
let animalHit = new Audio();
let cutsceneSound = new Audio();

let arrayOfSounds = [backgroundMusic,chop1,chop2,axeWhirl,missedSwing,tornadoSwoosh,
					birdSound,deathMeow,bugSound,bearRoar1,bearRoar2,bearRoar3,
					playerHurt,animalHit,cutsceneSound,campfireSFX];

let arrayOfMusic = [backgroundMusic];
let arrayOfSFXs = [chop1,chop2,axeWhirl,missedSwing,tornadoSwoosh,
					birdSound,deathMeow,bugSound,
					bearRoar1,bearRoar2,bearRoar3,
					playerHurt,animalHit,cutsceneSound,campfireSFX];

let audioType = undefined;
let sourceExtension = undefined;

let arrayOfChopSFXs = [chop1,chop2];
let arrayOfRoarSFXs = [bearRoar1,bearRoar2,bearRoar3];

let volumeDefault = 0.5;

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
    arrayOfSounds[arrayOfSoundsIndex].volume = volumeDefault;
  }
};
assignAudioTypes();

backgroundMusic.src = "music/ChopChopMenu_v1" + sourceExtension;

backgroundMusic.addEventListener('timeupdate', function(){
	var buffer = .44;
    if(this.currentTime > this.duration - buffer) {
    	this.currentTime = 0;
        this.play();
}}, false);

chop1.src = "SFX/Chop1" + sourceExtension;
chop2.src = "SFX/Chop2" + sourceExtension;
axeWhirl.src = "SFX/AxeWhirl2" + sourceExtension;
missedSwing.src = "SFX/MissedSwing" + sourceExtension;
campfireSFX.src = "SFX/Fire" + sourceExtension;
deathMeow.src = "SFX/DeathMeow" + sourceExtension;
//deathMeow.volume = 0.5;
birdSound.src = "SFX/BirdSound" + sourceExtension;
//birdSound.volume = 0.6;
bugSound.src = "SFX/BugSound" + sourceExtension;
playerHurt.src = "SFX/PlayerHurt" + sourceExtension;
animalHit.src = "SFX/AnimalHit" + sourceExtension;
//animalHit.volume = 0.6;
bearRoar1.src = "SFX/BearRoar01" + sourceExtension;
bearRoar2.src = "SFX/BearRoar02" + sourceExtension;
bearRoar3.src = "SFX/BearRoar03" + sourceExtension;
cutsceneSound.src = "SFX/cutscene" + sourceExtension;
cutsceneSound.volume = 0.075;
tornadoSwoosh.src = "SFX/Tornado" + sourceExtension;

let decreaseMusicVolume = () => {
  for ( let arrayOfMusicIndex = 0; arrayOfMusicIndex < arrayOfMusic.length; arrayOfMusicIndex++ ) {
  	if (arrayOfMusic[arrayOfMusicIndex].volume <= 0.1) {
    	arrayOfMusic[arrayOfMusicIndex].volume = 0;
    } else {
    	arrayOfMusic[arrayOfMusicIndex].volume -= 0.1;
	}
  }
};

let decreaseSFXVolume = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSFXs.length; arrayOfSoundsIndex++ ) {
  	if (arrayOfSFXs[arrayOfSoundsIndex].volume <= 0.1) {
    	arrayOfSFXs[arrayOfSoundsIndex].volume = 0;
    } else {
    	arrayOfSFXs[arrayOfSoundsIndex].volume -= 0.1;
	}
  }
};

let increaseMusicVolume = () => {
  for ( let arrayOfMusicIndex = 0; arrayOfMusicIndex < arrayOfMusic.length; arrayOfMusicIndex++ ) {
  	if (arrayOfMusic[arrayOfMusicIndex].volume >= 0.9) {
    	arrayOfMusic[arrayOfMusicIndex].volume = 1;
    } else {
    	arrayOfMusic[arrayOfMusicIndex].volume += 0.1;
	}
  }
};

let increaseSFXVolume = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSFXs.length; arrayOfSoundsIndex++ ) {
    if (arrayOfSFXs[arrayOfSoundsIndex].volume >= 0.9) {
    	arrayOfSFXs[arrayOfSoundsIndex].volume = 1;
    } else {
    	arrayOfSFXs[arrayOfSoundsIndex].volume += 0.1;
	}
  }
};
