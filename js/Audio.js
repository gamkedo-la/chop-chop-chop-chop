let backgroundMusic = new Audio();
let unimplementedSFX1 = new Audio();
let unimplementedSFX2 = new Audio();
let arrayOfSounds = [backgroundMusic, unimplementedSFX1, unimplementedSFX2];
let audioType = undefined;
let sourceExtension = undefined;

let setAudioTypeAndSourceExtension = () => {

  if (backgroundMusic.canPlayType('audio/ogg;')) {
      audioType = 'audio/ogg';
  } else {
      audioType = 'audio/mpeg';
  }
  console.log(audioType);
  if (audioType === 'audio/mpeg') {
    sourceExtension = ".mp3";
  } else {
    sourceExtension = ".ogg";
  }

}
setAudioTypeAndSourceExtension();

//be sure to include all SFX and other potential sounds in the array
let assignAudioTypes = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSounds.length; arrayOfSoundsIndex++ ) {
    arrayOfSounds[arrayOfSoundsIndex].type = audioType;
  }
}
assignAudioTypes();

backgroundMusic.src = "music/ChopChopMenu_V1" + sourceExtension;
backgroundMusic.loop = true;

let decreaseMasterVolume = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSounds.length; arrayOfSoundsIndex++ ) {
    arrayOfSounds[arrayOfSoundsIndex].volume -= 0.1;
  }
}

let increaseMasterVolume = () => {
  for ( let arrayOfSoundsIndex = 0; arrayOfSoundsIndex < arrayOfSounds.length; arrayOfSoundsIndex++ ) {
    arrayOfSounds[arrayOfSoundsIndex].volume += 0.1;
  }
}
