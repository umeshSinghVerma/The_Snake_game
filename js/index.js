let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let scoreBox = document.getElementById("scoreBox");
let hiscoreBox = document.getElementById("hiscoreBox");


const main = (ctime) => {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;

  gameEngine();
};


const isCollide = (snake) => {
    //bumping into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            return true;
        }
    }
    //bumping into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
                return true;
     }
};


const gameEngine = () => {
   
  //Checking the collision detection
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over!. Press any  key to play again!");
    score = 0;
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
  }

  //if the food is eaten ,increment the score and regenerate the food
  if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
            foodsound.play();
            score += 1;
            if(score>hiscoreval){
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
            }
            scoreBox.innerHTML = "Score: " + score;
            snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
            let a = 2;
            let b = 16;
            food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        }


  for (let i = snakeArr.length-2; i >=0; i--) {
    snakeArr[i+1]={...snakeArr[i]};
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //Moving the Snake
  board.innerHTML = "";


  //Display the Snake
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });


  //Display the food
  FoodElement = document.createElement("div");
  FoodElement.style.gridRowStart = food.y;
  FoodElement.style.gridColumnStart = food.x;
  FoodElement.classList.add("food");
  board.appendChild(FoodElement);
};

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(localStorage.getItem("hiscore"));
    hiscoreBox.innerHTML="HiScore: "+hiscore;
}
window.requestAnimationFrame(main);


window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //Start the Game;
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("LeftArrow");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("RightArrow");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      console.log("Go Away Demon");
      break;
  }
});
