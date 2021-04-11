var bird,birdflying;
var greenchilliGroup,redchilliGroup,pipe1Group,pipe2Group,eggsGroup;
var gamestate = "info";
var score = 0;
var life = 3;

function preload(){
   birdflying =  loadAnimation("birdImage1.png","birdImage2.png");
   backgroundImage = loadImage("skyImage.jpg")
   hitAnimation = loadAnimation("birdImage1hit.png","birdImage2hit.png")
   hitSound = loadSound("hit.ogg");
   loseSound = loadSound("lose.wav");
}

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
   
    
    bird = createSprite(width/5,height/5,width/10,height/10);
    bird.addAnimation("flying",birdflying);
    bird.addAnimation("hit",hitAnimation);
    bird.scale = 0.4;

    

    greenchilliGroup = new Group();
    redchilliGroup = new Group();
    pipe1Group = new Group();
    pipe2Group = new Group();
    eggsGroup = new Group();



    
   
   
}


function draw(){
  background(backgroundImage)
 if(gamestate == "info"){
    fill("yellow");
   
    textFont("cursive");
    textSize(20);
    text("Press spacebar to fly",width/2,height/4 );  
    text("Beware of the redchillies and  pipes ",width/2,height/3);
    text("Help the bird reach its eggs ",width/2,height/2.5);
    //fill("darkred");
    text("Take the eggs back at the end to win",width/2,height/2);
    text("Consume greenchillies to become smaller!",width/2,height/1.75);
    text("If you miss eggs at the end you lose!",width/2,height/1.5);
 
 
 if(keyCode == 32){
     gamestate = "Play";
     
 }
}

if(gamestate == "Play"){

 if(keyDown("Space")){
   bird.velocity.y =  - 11;
   
   
 }
// music.play();

 bird.velocity.y = bird.velocity.y + 1;
 spawnObstacles1();
 spawnObstacles2();

 var rand3 = Math.round(random(1,2))

 if(frameCount%300 == 0){
   switch(rand3){
     case 1 : spawnRedChilli();
     break;
     case 2 : spawnGreenChilli();
     break;
   }
 }

 if(redchilliGroup.isTouching(bird)){
   bird.scale = 0.6;
   redchilliGroup[0].destroy();
 }

 if(greenchilliGroup.isTouching(bird)){
    bird.scale = 0.2
    greenchilliGroup[0].destroy();    
 }

 if (pipe1Group.bounceOff(bird)){

    bird.changeAnimation("hit",hitAnimation)
    life = life - 1;
    
    pipe1Group[0].destroy();
    hitSound.play();
 }

if (pipe2Group.bounceOff(bird)){
    bird.changeAnimation("hit",hitAnimation)
    life = life - 1;
    pipe2Group[0].destroy();
    hitSound.play();
}

if (life == 0){
  gamestate = "End"  
}

if(frameCount%10 == 0){
    score = score + 1;
};

spawnEggs();

if(bird.isTouching(eggsGroup)){
 gamestate = "win"   
}

}
if(gamestate == "win"){
    background(backgroundImage); 
    bird.velocityY = 0;
    textFont("cursive");
    textSize(50);
    fill("darkred");
    text("YOU WIN!",360,200);
    bird.destroy();
    pipe1Group.destroy();
    pipe2Group.destroy();
    eggsGroup.destroy();
    redchilliGroup.destroy();
    greenchilliGroup.destroy();  
}


if(bird.y>410){
 gamestate = "End"
}



 drawSprites();
 textSize(20);
 textFont("Arial");
 fill("darkred");
 text("score:"+score,width/20,height/5);
 text("life:"+life,width/20,20+height/5);
 
 if(gamestate == "End"){
    background(backgroundImage); 
    bird.velocityY = 0;
    textSize(50);
    textFont("cursive");
    fill("darkred");
    text("GAME OVER!",width/2,height/2);
    loseSound.play();
    sleep(10);
    loseSound.stop();    
 
  }  
}


function spawnObstacles1(){
 
 if(frameCount%150 == 0){
    obstacle1 = createSprite(width,0,width/5,height/2);
   
  

    obstacle1.velocity.x = -2;
    var rand1 = Math.round(random(1,2))
    switch(rand1){
        case 1: obstacle1.addImage(loadImage("pipe1.png"));
        break
        case 2: obstacle1.addImage(loadImage("pipebigImage1.png"));
        break
    }
    obstacle1.scale =1.
    pipe1Group.add(obstacle1);
    obstacle1.lifetime = 3000;

    }
}



function spawnObstacles2(){

if(frameCount%120 == 0){
    obstacle2 = createSprite(width,height,width/5,height/2);
    
    
    obstacle2.velocity.x = -2; 
    var rand2 = Math.round(random(1,2))
    switch(rand2){
        case 1: obstacle2.addImage(loadImage("pipe2.png"));
        break
        case 2: obstacle2.addImage(loadImage("pipebigImage2.png"));
        break
    }
    obstacle2.scale = 1.5;
    pipe2Group.add(obstacle2);
    obstacle2.lifetime = 3000;

    }
   
}
function spawnGreenChilli(){ 
    greenChilli = createSprite(width,Math.round(random(width/5,height/2)),width/5,height/2);
    greenChilli.addImage(loadImage("greenchilli.png"))
    greenChilli.scale = 0.2;

    greenChilli.velocity.x = -2; 
    greenchilliGroup.add(greenChilli);

    greenChilli.lifetime = 500;     
    
}

function spawnRedChilli(){  
    
        redChilli = createSprite(width,Math.round(random(width/5,height/3)),width/5,height/2);       
        redChilli.addImage(loadImage("redchilli.png"))
        redChilli.scale = 0.08;        
        redChilli.velocity.x = -2;        
        redchilliGroup.add(redChilli);
        redChilli.lifetime = 500;        
       
    }
    
    function spawnEggs(){
      if(frameCount%3000 == 0){
        eggs = createSprite(width,height/2);
        eggs.addImage(loadImage("eggs.png"));
        eggs.scale = 0.5;
        eggs.velocity.x = -2;

        eggsGroup.add(eggs);

      }
    }
    
    

    
