//Create variables here
var dog , dogImage1 , dogImage2;
var happyDog;
var foodS;
var database;
var foodStock;

function preload()
{
	//load images here
   dogImage1=loadImage("images/dogImg.png");
   dogImage2=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(600, 800);

  database = firebase.database();

  dog = createSprite(500,500);
  dog.addImage(dogImage1);
  dog.scale=0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  drawSprites();

  textSize(15);
  fill("lightyellow");
  text("Food Remaining:"+foodS, 430, 50);
  textSize(20);
  text("Press UP_ARROW key to feed the Dog", 20, 50);
  
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage2);
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage1);
  }

}

function readStock(data){

  foodS = data.val(); 
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  
  database.ref('/').update({
    'Food': x
  })
}



