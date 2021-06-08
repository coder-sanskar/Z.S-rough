const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var soldier, soldierImg, backgroundImg, zombie;

var soldierAnimation;

var bullet, bulletImg, antidote, antidoteImg; 

var zombieAnimation; 

var health = 3, healthImg, hlth; 

var score = 0;

var gameOver, gameOverImg; 

function preload(){

  zombieAnimation = loadAnimation("Zombie1.png","Zombie2.png", "Zombie3.png", "Zombie4.png",
   "Zombie5.png", "Zombie6.png", "Zombie7.png", "Zombie8.png");

   soldierAnimation = loadAnimation("sm1.png", "sm2.png", "sm3.png", "sm4.png", "sm5.png", "sm6.png");

soldierImg = loadImage("soldier-firing.png");
bulletImg = loadImage("Bullet.png");
backgroundImg = loadImage("background.jpg");
antidoteImg = loadImage("Antidote.png");
healthImg = loadImage("Health.png");



}

function setup() {
  createCanvas(800,400);
  
  soldier = createSprite(750, 200, 50, 50);
  //soldier.addAnimation("soldiers", soldierAnimation)
  soldier.addImage("soldier", soldierImg);
  soldier.scale = 1.5;
  
  var hlth = createSprite(215,40,10,10);
  hlth.addImage("health", healthImg);
  hlth.scale = 0.03
  
  zombGroup = new Group();
  bulletGroup = new Group();
  antidoteGroup = new Group();

}

function draw() {
  background(backgroundImg);

  
  textSize(30);
  fill("white");
  text("『 Zᴏᴍʙɪᴇ•Sʟᴀʏᴇʀ 』", 270,50);

  textSize(29);
  fill("white");
  text("Sᴄᴏʀᴇ : " + score, 650,50);

  textSize(29);
  fill("white");
  text("Hᴇᴀʟᴛʜ : " + health + "x", 50,50);

  
if (frameCount%50===0){
spawnZombies();
}

//soldier.y = mouseY
//soldier.x = mouseX

if (keyDown("SPACE")){
  createBullet();

}

if (frameCount%400===0){
createAntidote();
}



if (bulletGroup.index !== null){
 for (var i = 0; i < zombGroup.length; i++)
   if(zombGroup.get(i).isTouching(bulletGroup)){
    zombGroup.get(i).destroy();
    
       }
}

if (soldier.index !== null){
 for (var i = 0; i < antidoteGroup.length; i++)
   if(antidoteGroup.get(i).isTouching(soldier)){
    antidoteGroup.get(i).destroy();
    score = score+1
    
       }
}

soldier.velocityX = 0;
  soldier.velocityY = 0;


 if(keyDown("UP_ARROW")) {
    
    soldier.velocityY = -4;
    
    
  }
    
 if (keyDown("DOWN_ARROW")) {
    soldier.velocityY = 4;
     
    
 }
  
  if (keyDown("LEFT_ARROW")) {
    
    soldier.velocityX = -4;
   
  }
    
    if (keyDown("RIGHT_ARROW")) {
      soldier.velocityX = 4;
       
      
    }

    //if (keyDown("RIGHT_ARROW")||keyDown("LEFT_ARROW")||keyDown("UP_ARROW")||keyDown("DOWN_ARROW")){
      //soldier.changeAnimation("walkingSoldier", soldierAnimation);
    //}
    
if (soldier.index !== null){
  for (var i = 0; i< zombGroup.length; i++)
  if (zombGroup.get(i).isTouching(soldier)){
    zombGroup.get(i).destroy();
    health = health-1;
  }
}

if (zombGroup.index !== null){
  for (var i = 0; i< bulletGroup.length; i++)
  if (bulletGroup.get(i).isTouching(zombGroup)){
    bulletGroup.get(i).destroy();
    
  }
}





  drawSprites();
}

function spawnZombies(){
 var zomb = createSprite(0,Math.round(random(180,370)),10,10);
 zomb.addAnimation("zombie", zombieAnimation);
 zomb.velocityX = 5;
 zomb.lifetime = 900;
 zomb.scale = 0.5;
 zombGroup.add(zomb);
}

function createBullet(){
var bullet = createSprite(100,100,50,20);
bullet.addImage("bullet", bulletImg);
bullet.x = soldier.x;
bullet.y = soldier.y;
bullet.velocityX = -5;
bullet.lifetime = 800;
bullet.scale = 0.1;
bulletGroup.add(bullet);
}

function createAntidote(){
var antidote = createSprite(Math.round(random(0,500)), Math.round(random(190,370)), 10,10);
antidote.addImage("antidote", antidoteImg);
antidote.scale = 0.05;
antidoteGroup.add(antidote);


}
