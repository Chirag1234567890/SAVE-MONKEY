var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;

function preload(){  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
}

function setup() {
  
createCanvas(500,400);
  
monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1;
  
ground=createSprite(400,350,1000,10);
ground.velocityX=-4;
ground.shapeColor="black";
  
FoodGroup =new Group();
obstacleGroup =new Group();
}


function draw() {
background("white");

stroke("white");
textSize(25);
fill("white");
text("Score: " + score,500,50);  
  
stroke("black");
textSize(25);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate());
text("Survival Time: " + survivalTime,175,20);
  
if(ground.x=0){
  ground.x=ground.width/2;
}
  
if(keyDown("space")){
  monkey.velocityY=-12;
}
  
monkey.velocityY = monkey.velocityY +0.8 ;
  

monkey.collide(ground);

if(monkey.isTouching(obstacleGroup)){
survivalTime.destroy();
}
  
food();
obstacles();
    
survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
drawSprites();
}

function food(){
if (frameCount % 80 === 0) {
banana = createSprite(500,120,40,10);
banana.y = Math.round(random(120,200));
banana.addImage(bananaImage);
banana.scale=0.05;
banana.velocityX = -3;
banana.lifetime = 166;
FoodGroup.add(banana);
banana.depth = monkey.depth;
monkey.depth = monkey.depth + 1;
}
}
  
function obstacles(){
if (frameCount % 300 === 0) {
obstacle=createSprite(500,325,20,20);
obstacle.velocityX=-5;
obstacle.addImage(obstacleImage);
obstacle.scale=0.15;
obstacle.lifetime=100;
obstacleGroup.add(obstacle);
}
}