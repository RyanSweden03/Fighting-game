const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var audio = document.getElementById("music");
audio.volume = 0.1;

canvas.width = 1200
canvas.height = 576

c.fillRect(0,0,canvas.width, canvas.height)

const gravity = 0.2


//Keys used for horizontal movement
const keys = {
    a : { pressed : false},
    d : { pressed : false},
    ArrowLeft : { pressed : false},
    ArrowRight : { pressed : false}
}

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    Source: './images/bk.png'
})


const P1 = new Players(
    'darkcyan',
    {
        position:{
            x: 50,
            y:100},
        velocity:{
            x:0,
            y:5
        },offset:{
            x: 0,
            y:0
        }
        
    }
    )
const P2 = new Players(
    'green',
    {
        position:{
            x: 1000,
            y:100},
        velocity:{
            x:0,
            y:0.4
        },
        offset:{
            x: -40,
            y: 0
    }
    })

function mov(){
    // WAD Player
    
    if (keys.a.pressed && P1.Last === 'a'){
        P1.vel.x = -5
    }else if (keys.d.pressed && P1.Last=== 'd'){
        P1.vel.x = 5
    }
    //ArrowKey player
    if (keys.ArrowLeft.pressed && P2.Last === 'ArrowLeft'){
        P2.vel.x = -5
    }else if (keys.ArrowRight.pressed && P2.Last === 'ArrowRight'){
        P2.vel.x = 5
    }
}

function checkCollision(Rect1, Rect2, mensaje,caso){
if (Rect1.Box.position.x + Rect1.Box.width >= Rect2.position.x && Rect1.Box.position.x <= Rect2.position.x+Rect2.width
        && Rect1.Box.position.y +Rect1.Box.height>= Rect2.position.y && Rect1.Box.position.y <= Rect2.position.y + Rect2.height
        && Rect1.Attacking){
        console.log(mensaje)
        Rect1.Attacking = false
        Rect2.health -= 10
        console.log(Rect2.health)
        if (caso === 1){
            document.querySelector('#P2Health').style.width = P2.health+'%'
        }
        if(caso === 2){
            document.querySelector('#P1Health').style.width = P1.health + '%'
        }
    }
}
let timer = 10
let winner
function decreasetimerAndEndGames(){
    if(timer > 0){
        setTimeout(decreasetimerAndEndGames,1000);
        timer--
        document.querySelector('#timer').innerHTML = timer
    }   
    if(timer === 0){
        if(P1.health > P2.health){
            document.querySelector('#winner').innerHTML = 'Player 1 Wins'
            winner = 'Player 1 Wins'
        }else if(P1.health < P2.health){
            document.querySelector('#winner').innerHTML = 'Player 2 Wins'
            winner = 'Player 2 Wins'
        }else{
            document.querySelector('#winner').innerHTML = 'Draw'
            winner = 'Draw'
        }
    }
    console.log(winner)


}
decreasetimerAndEndGames()
function Run(){
    // console.log(background)
    window.requestAnimationFrame(Run)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.draw()
    P1.move()
    P2.move()
    P1.vel.x = 0
    P2.vel.x = 0
    mov()

    //Collision detection
    checkCollision(P1,P2,"Pegaaaaaaaaaaaaaa el 1",1)
    checkCollision(P2,P1, "Pegaaaaaaaaaaaaaaaa el 2",2)

}
Run()


window.addEventListener('keydown', (evento)=>{
    console.log(evento.key)
    switch(evento.key){
        case 'd':
            keys.d.pressed = true
            P1.Last = 'd'
            break
        case 'a':
           keys.a.pressed = true
           P1.Last = 'a' 
           break
        case 'w':
            P1.vel.y = -15
            break
        case ' ':
            P1.attack()    
            break      
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            P2.Last = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            P2.Last = 'ArrowRight'
            break 
        case 'ArrowUp':
            P2.vel.y = -15
            break  
        case '0':
            P2.attack()
            break      

    }
})

window.addEventListener('keyup', (evento)=>{
    switch(evento.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
    }
})