let backgroundMusic = new Audio();
let audioType = undefined;
let sourceExtension = undefined;

let setAudioTypeAndSourceExtension = () => {

  if (backgroundMusic.canPlayType('audio/mpeg;')) {
      audioType = 'audio/mpeg';
  } else {
      audioType = 'audio/ogg';
  }

  if (audioType === 'audio/mpeg') {
    sourceExtension = ".mp3";
  } else {
    sourceExtension = ".ogg";
  }

}
setAudioTypeAndSourceExtension();

backgroundMusic.type = audioType;
backgroundMusic.src = "music/ChopChopForestV1" + sourceExtension;
backgroundMusic.loop = true;

console.log(backgroundMusic.volume);
