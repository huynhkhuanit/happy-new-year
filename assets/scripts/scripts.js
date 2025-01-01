const flipElement = document.querySelector('.flip');
const front = flipElement.querySelector('.front');
const back = flipElement.querySelector('.back');
const giftContainer = document.getElementById('gift-container');
const backgroundVideo = document.getElementById('background-video');
const audioElement = document.getElementById('background-audio');
const audioSource = document.getElementById('audio-source');
const typingTexts = document.querySelectorAll('.typing-text');
const contentContainer = document.querySelector('.container');

const audioFiles = [
  "./assets/audio/fireworks-sound-effect-2.mp3",
  "./assets/audio/fireworks-sound-effect-2.mp3"
];

let currentAudioIndex = 0;
let playCount = 0;
const maxPlayCount = 2;
let typingIndex = 0;

window.addEventListener('load', () => {
  contentContainer.style.display = 'none';
  backgroundVideo.style.display = 'none';
  audioElement.pause();
  giftContainer.style.display = 'flex';
});

function openGift() {
  giftContainer.style.display = 'none';
  contentContainer.style.display = 'block';
  backgroundVideo.style.display = 'block';


  backgroundVideo.play().then(() => {
    console.log("Video nền đang phát.");
  }).catch(error => {
    console.error("Lỗi khi phát video:", error);
  });

  playAudio();
  showTypingEffect();
}

giftContainer.addEventListener('click', openGift);

function playAudio() {
  audioElement.muted = false;
  audioElement.volume = 0.5;
  audioElement.play().then(() => {
    console.log("Đang phát: " + audioFiles[currentAudioIndex]);
  }).catch(error => {
    console.error("Lỗi khi phát âm thanh:", error);
  });
}

audioElement.addEventListener('ended', () => {
  playCount++;

  if (playCount < maxPlayCount) {
    audioElement.currentTime = 0;
    playAudio();
  } else {
    playCount = 0;
    currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
    audioSource.src = audioFiles[currentAudioIndex];
    audioElement.load();
    playAudio();
  }
});

function showTypingEffect() {

  typingTexts.forEach(text => {
    text.style.display = 'none';
    text.style.animation = 'none';
  });
  const currentText = typingTexts[typingIndex];
  currentText.style.display = 'inline-block';
  currentText.style.animation = 'typing 2.25s steps(30) forwards, erase 1s steps(30) 4s forwards';
  typingIndex = (typingIndex + 1) % typingTexts.length;
  setTimeout(showTypingEffect, 6000);
}

setTimeout(() => {
  front.style.transform = 'rotateX(-180deg)';
  back.style.transform = 'rotateX(0deg)';
}, 5000);
