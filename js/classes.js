class Sprite{
    constructor({position,Source} ){
        this.position = position,
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = Source
        
    }
    draw(){
       c.drawImage(this.image,this.position.x,this.position.y)
    }
}

class Players{
    constructor(color, {position, velocity,offset} ){
        this.color = color,
        this.position = position,
        this.vel = velocity
        this.height = 150
        this.width = 50
        this.Last
        this.Attacking = false
        this.health = 100
        this.Box = {
            position:{
                x: this.position.x,
                y: this.position.y
            },
            //Distance of hitting
            width: 70,
            height: 50,
            offset
        }
    }


    draw(){
        c.fillStyle= this.color
        c.fillRect(this.position.x, this.position.y,this.width,this.height)

        //Box for attacking hitbox
        if(this.Attacking){
            c.fillStyle = 'orange'
            c.fillRect(this.Box.position.x, this.Box.position.y,this.Box.width,this.Box.width)
        }

    }
    //Movement of the players 
    move(){
        this.draw()
        //Setting up position of the box for attacking
        this.Box.position.x = this.position.x + this.Box.offset.x
        this.Box.position.y = this.position.y
        // x movement
        this.position.x +=this.vel.x
        if(this.position.x === canvas.width){
            this.position.x = 0
        }
        else if(this.position.x === 0){
            this.position.x = canvas.width
        }
        this.position.y += this.vel.y
        
        //validation to not go out of the canvas Y axis
        if(this.position.y + this.height + this.vel.y>= canvas.height ){
            this.vel.y = 0
        }else this.vel.y += gravity
        
    }
    attack(){
        this.Attacking = true
        //Delay to stop attacking
        setTimeout(()=>{
            this.Attacking = false
        },100)
    }
}

