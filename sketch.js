var monkey, bananagroup, background, ground, obstacle, stonegroup, speed;

var monkeyimg, bananaimg, backgroundimg, obstacleimg, collided;

var score 
var gameState 
var PLAY 
var END
var INITIAL 
var collision

function preload(){
  monkeyimg= loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
  backgroundimg= loadImage("jungle.png");
  bananaimg= loadImage("banana.png");
  obstacleimg= loadImage("stone.png");
  collided= loadImage("Monkey_05.png");
}




function setup() {
  createCanvas(600, 400);
  
  background= createSprite(200,150);
  background.addImage("backgroundimg", backgroundimg);
  background.scale= 1.3;
  
  ground= createSprite(width/2, 390, width, 10);
  ground.visible= false;
  
  monkey= createSprite(80,340);
  monkey.addAnimation("collided", collided);
  monkey.addAnimation("monkeyimg", monkeyimg);
  monkey.scale= 0.15;
  
  score=0
  
  gameState= 1;
  PLAY=1;
  END=0;
  
  bananagroup= createGroup();
  stonegroup= createGroup();
  
  speed= -8;
  
  collision= 0;
}

function draw() {
  background(220);
  
  if(gameState===PLAY){
    
    monkey.changeAnimation("monkeyimg");
    background.velocityX=-5;
    
    if(background.x<0){
      background.x= background.width/2;
    }
    
    if(keyWentDown("space")&& monkey.collide(ground)){
      monkey.velocityY=-20;
    }
    
    monkey.velocityY= monkey.velocityY+1;
    
    bananas();
    obstacles();
    
    score= score+Math.round((getFrameRate()/30));


  }
  
  monkey.collide(ground);
  
  if (gamestate === END) {
    background.velocityX = 0;

    stonegroup.setVelocityXEach(0);
    stonegroup.setLifetimeEach(-1);

    bananagroup.setVelocityXEach(0);
    bananagroup.setLifetimeEach(-1);

    monkey.velocityY = 0;
    
    monkey.changeAnimation("collided",collided);
  }
  
  if (keyWentDown("s") && gamestate === END) {
    stonegroup.destroyEach();
    bananagroup.destroyEach();
    score = 0;
    gamestate = PLAY;
    speed = -6;
    monkey.scale = 0.12;
    collision = 0;
  }
  
  if (monkey.isTouching(bananagroup)) {
    bananagroup.destroyEach();
    speed = speed - 0.5;
    monkey.scale = monkey.scale + 0.02;
    score = score + 20;
    collision = 0;

  }
  if (score % 100 === 0) {
    monkey.scale = monkey.scale + 0.01;
  }

  
  if (collision === 2) {
    gamestate = END;
  }

  
  if (stonegroup.isTouching(monkey)) {
    stonegroup.destroyEach();
    monkey.scale = 0.13;
    score = score - 100;
    collision += 1;
  }
  
  drawSprites();
  
  
  
  
  

if (gamestate === END) {

    fill(250);
    textSize(22);
    stroke(0);
    strokeWeight(2);
    text("Game Over!", width / 2 - width / 10, height / 2);
    text("Press R to Restart", width / 2 - width / 6.5, height / 2 + 30);
  }

  fill("Black");
  textSize(22);
  stroke("white");
  strokeWeight(2);
  text("Score: " + score, 40, height / 8)
}


