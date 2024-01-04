// Varaible Declaraction
let Modal=document.querySelector(".Modal");
let btn=document.querySelector("button");
let Modal_overlay=document.querySelector(".Modal_overlay");
let Modal_inside=document.querySelector(".Modal_inside");
const s_span=document.getElementById("score");
const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const sqSize = 20;
const horizontalSq = width / sqSize;
const verticalSq = height / sqSize;
let firstEat;
let hasNotEaten;
let valueX;
let valueY;
let n;
n=10;
let FPS=1000/n;
let gameLoop;
let gameStarted;
let currentdir;
const directions = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
  };
let snake;
let Score;



// Functions

function setDirection(e) {
    const oldDir=currentdir;
    const newDir = e.key;
    
    if(newDir==directions.DOWN && oldDir!==directions.UP ||
         newDir===directions.UP && oldDir !==directions.DOWN || 
         newDir===directions.LEFT && oldDir!==directions.RIGHT||
         newDir===directions.RIGHT&&oldDir!==directions.LEFT)
         {
            console.log("fine");


            if (!gameStarted) {
                gameStarted = true;
                gameLoop = setInterval(() => {
                  frame();
                  MoveSnake();
                  
                }, FPS);
              }currentdir = newDir;




         }else{
            console.log("not fine");
         }
  
  
    
  }

function frame() {
    drawBoard();
    drawSnake();
    drawFood();
    UpdateScore();
  
  }
function drawBoard(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
}

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * sqSize, y * sqSize, sqSize, sqSize);
  
    ctx.strokeStyle = "black";
    ctx.strokeRect(x * sqSize, y * sqSize, sqSize, sqSize);
  }
function drawSnake() {
    snake.forEach((segment) => {
      drawSquare(segment.x, segment.y, "red");
    });
  }
function MoveSnake() {
    // eats food when head.x and head.y is equal to the valueX and valueY
    // When they equal you have to add the {} to the array of the snake
    //  when such as situation happen do not pop
    
    if (!gameStarted) return;
    const head = { ...snake[0] };
    switch (currentdir) {
        case directions.UP:
            head.y -= 1;
            break;
        case directions.DOWN:
            head.y += 1;
            break;
        case directions.RIGHT:
            head.x += 1;
            break;
        case directions.LEFT:
            head.x -= 1;
            break;
  }
    if(head.x<0 || head.y<0 || head.x>20||head.y>20||hitSelf()){
        gameOver();
    
    }else{
        if(head.x==valueX && head.y==valueY){
            n=n+0.5
            Score+=1
            hasNotEaten=false;
            console.log("Eaten");
        }else{
            snake.pop();
            hasNotEaten=true;
        }
        snake.unshift(head);
        
    }

  }
function drawFood(){
    function Foodgen(){
        valueX=Math.floor(Math.random()* sqSize);
        valueY=Math.floor(Math.random()* sqSize);
        drawSquare(valueX,valueY,"red");

    }
    if(firstEat){
        Foodgen();
        firstEat=false;

    }else if  (hasNotEaten){
        drawSquare(valueX,valueY,"red");
        
    }else{
        Foodgen();
        
    }
    console.log("hasnoteaten: ",hasNotEaten);
    console.log("firstEat: ",firstEat);

    

}

function UpdateScore(){
    s_span.innerHTML=Score;

}
function hitSelf(){
    const snakeBody=[...snake];
    const head=snakeBody.shift();

    return snakeBody.some(square=>square.x===head.x && square.y===head.y)


}



function Initialization(){
    firstEat=false;
    hasNotEaten=true;
    valueX=0;
    valueY=0;
    Score=0;
    gameStarted=false;
    snake = [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ];
    drawBoard();
    frame();
    document.addEventListener("keydown", setDirection);

}
function gameOver(){
    clearInterval(gameLoop);
    Modal.classList.add("open");
    Modal_overlay.addEventListener("click",()=>{

        
        Modal.classList.remove("open");
        Initialization();
    })
}

// Main
n=15;
console.log(FPS);
Initialization();
