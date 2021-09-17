var PLAY = 1;
var END = 0;
var gameState = PLAY;

var maki, makirunning, makidefeated;
var ground, groundimage, invisibleground;
var backgroundImg;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var score=0;


var gameOver, restart;


function preload(){
  

backgroundImg = loadImage("background.jpg");
makirunning = loadAnimation("maki1.png","maki2.png","maki1.png");
makidefeated = loadAnimation("makidefeated.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle4.png");


groundimage = loadImage("ground.png")

gameOverImg = loadImage("gameover.png");
restartImg = loadImage("restart.png");

}

function setup() {
 createCanvas(windowWidth, windowHeight);

 maki = createSprite(100,500,20,70);
 obstaclesGroup = new Group();

 maki.addAnimation("running", makirunning)
 maki.addAnimation("collided", makidefeated)
 maki.setCollider('circle',0,0,120)
 

invisibleGround = createSprite(width/2,height-20,width,20);
}

function draw() {
    background(backgroundImg);
    textSize(20);
    fill("black")
    text("Score: "+ score,30,50);
    
      maki.collide(invisibleGround);

      if (gameState === PLAY) {
        spawnObstacles();
        if((keyDown("SPACE")) && maki.y  >= height-350) {
    
            maki.velocityY = -10;
          }
          maki.velocityY = maki.velocityY + 0.8
          if(obstaclesGroup.isTouching(maki)){

            gameState = END;
          }
      } else if(gameState === END) {
        if(obstaclesGroup.isTouching(maki)){
            collidedSound.play()
            gameState = END;
        }
      }
      else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;

        ground.velocityX = 0;
        maki.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);

        makirunning.changeAnimation("collided",makidefeated)
          
      }
    drawSprites();

}


function spawnObstacles(){
    if(frameCount % 350 === 0) {
        var obstacle = createSprite(width,height-125,20,30);
        obstacle.setCollider('circle',0,0,45)
        obstacle.velocityX = -5
        obstacle.scale = 0.4
        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
                  break;
          case 3: obstacle.addImage(obstacle3);
                  break;      
          default: break;
        }
        obstacle.lifetime = 350;
        obstaclesGroup.add (obstacle)
    }
}
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    maki.changeAnimation("running",maki_running);
    
    score = 0;
}