let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function (e) {
  playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow-dog.png';
// 6876 pixel dibagi 12 kolom maka sprite width 574 pixel
const spriteWidth = 575;
// 5230 pixel dibagi 10 baris maka sprite height 523 pixel
const spriteHeight = 523;


let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'gethit',
    frames: 4,
  }
];
// iterasi tiap sprite
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  }
  // iterate frames tiap option
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate() {
  // clear entire canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // draw player
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  // frame x adalah posisi sprite dalam kolom
  // frame y adalah posisi sprite dalam baris
  // let frameX = spriteWidth * 0; artinya di kolom 0
  // let frameY = spriteHeight * 0; artinya di baris 0
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  //  4 nilai pertama setelah playerimage menentukan area yang dipotong dari original sprite sheet
  //  4 niilai terakhir menentukan dimana kita taruh potongan sprite sheet tersebut di canvas
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

  gameFrame++;
  requestAnimationFrame(animate);
};
animate();