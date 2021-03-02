class Food{
    constructor(){

        this.image = loadImage("images/Milk.png") 
        this.foodStock=0;
        this.lastFed;


    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    getFoodStock(){
        return this.foodStock;

    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
        
    }

    deductFoodStock(){

        if(this.foodStock>0){
            this.foodStock=this.foodStock-1
        }
        
    }

    BathRoom(){
        background(Bedroomi,500,500)
    }
    WashRoom(){
        background(Washroomi,500,500)
    }
    Garden(){
        background(Gardeni,500,500)
    }

    

    display(){
        background("aqua")
            var x=80, y=100
            imageMode(CENTER)
            textSize(15)
            if(lastFed>=12){
                text("Last Feed : "+ lastFed%12 + " PM", 50,30);
            }else if(lastFed==0){
                text("Last Feed : 12 AM",50,30);
            }else{
                text("Last Feed : "+ lastFed + " AM", 50,30);
            }
            image(this.image,720,220,70,70)
            if(this.foodStock !== 0){
                for(var i =0; i <this.foodStock;i++){
                    if(i%10==0){
                        x=80
                        y=y+50
                    }
                    image(this.image,x,y,50,50)
                    x=x+30
                }
            }

    }
}