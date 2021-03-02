//Create variables here
var database; 
var dog;
var happyDog, sadDog;
var foodS;
var foodStock
var feed,addFood;
var foodObj,fedTime,lastFed;

var bedroom, garden, bathroom;
var bedroomi,bathroomi,gardeni;

var gameState ;



function preload()
{
  //load images here
  happyDog=loadImage("images/dogImg1.png")
  sadDog = loadImage("images/dogImg.png")
  bedroomi = loadImage("img/BedRoom.png")
  bathroomi = loadImage("img/WashRoom.png")
  gardeni = loadImage("img/Garden.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  foodObj= new Food();

  foodStock=database.ref("Food")
  foodStock.on("value",readStock)

  fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed= data.val()
  })

  dog = createSprite(200,300,130,130)
  dog.addImage(sadDog)
  dog.scale = 0.2
  
  


  feed=createButton("Feed The Dog")
  feed.position(500,95)
  feed.mousePressed(feedDog) 

  addFood=createButton("Add Food")
  addFood.position(670,95)
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState')
  readState.on("value",function(data){
    gameState=data.val();
  })

}


function draw() {  

  currentTime=hour();
  
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
 }else if(currentTime==(lastFed+2)){
  update("Sleeping");
    foodObj.bedroom();
 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
    foodObj.washroom();
 }else{
  update("Hungry")
  foodObj.display();
  
 }

 if(gameState !== "Hungry") {
   feed.hide();
   addFood.hide();
   dog.remove();
 }else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog)


 }

  





  drawSprites();


  

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })


}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.deductFoodStock();
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}


function update(state){

database.ref('/').update({
  gameState : state
})


}



