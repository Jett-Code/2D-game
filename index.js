const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
const g = 0.6

class Sprite{
    constructor(position, velocity, color, offset){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 100
        this.lastkey
        this.color = color
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 90,
            height:20
        }
        this.isAttacking
        this.health = 100
    }

    draw(){
        c.fillStyle = this.color.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        if(this.isAttacking){
        c.fillStyle = 'pink'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }   

    update(){
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.offset
        this.attackBox.position.y = this.position.y

        
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x 
        
        if(this.position.y + this.height >= canvas.height){
            this.position.y = canvas.height - this.height
            this.velocity.y = 0
        
        }
        else{
            this.velocity.y += g 
            console.log(this.velocity.y)
        }
        
    }

    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }
}

const player = new Sprite(
    {
        x:0,
        y:0
    },
    {
        x:0,
        y:0
    },
    {
        color: 'green'
    },
    {
        offset: 0
    }
)

const enemy = new Sprite(
    {
        x:450,
        y:300
    },
    {
        x:0,
        y:0
    },
    {
        color: 'red'
    },
    {
        offset: 40
    }
    
)
console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function winner(player, enemy, timerId){
    clearTimeout(timerId)
        if(enemy.health < player.health){
          
            document.querySelector('#result').innerHTML = 'player wins'
            
        }
        else if(player.health < enemy.health){
            document.querySelector('#result').innerHTML = 'enemy wins'
        }
        else{
            document.querySelector('#result').innerHTML = 'tie'
        }   
        
    }


let timer = 10
let timerId
function dectimer(){
    timerId = setTimeout(() => {
        
        if(timer > 0 ) {
            timer--
            console.log(timer)
            document.querySelector('#timer').innerHTML = timer
            dectimer()
        }
    }, 1000);

    if(timer === 0 ){
        winner(player, enemy, timerId)
    }
    else if(enemy.health === 0 || player.health === 0){
        winner(player, enemy, timerId)
    }
}
dectimer()

function animation(){
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    if(keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 5
    }
    else if (keys.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -5
    }

    if(keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5
    }
    else if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -5
    }

    if(player.attackBox.position.x + player.attackBox.width >= enemy.position.x && player.attackBox.position.x <= enemy.position.x + enemy.width && player.attackBox.position.y + player.attackBox.height >= enemy.position.y && player.attackBox.position.y <= enemy.position.y + enemy.height && player.isAttacking){
        enemy.health -= 20
        document.querySelector("#enemy").style.width = enemy.health + "%"
        player.isAttacking = false
    }
    
    if(enemy.attackBox.position.x + enemy.attackBox.width >= player.position.x && enemy.attackBox.position.x <= player.position.x + enemy.width && enemy.attackBox.position.y + enemy.attackBox.height >= player.position.y && enemy.attackBox.position.y <= player.position.y + player.height && enemy.isAttacking){
        player.health -=20
        document.querySelector("#player").style.width = player.health + "%"
        enemy.isAttacking = false
    }

}

animation()



window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastkey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastkey = 'a'
            break
        case 'w':
            player.velocity.y = -15
            break
        case ' ':
            player.attack()
            break
        case 'ArrowDown':
            enemy.attack()
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -15
            break
    }
})

window.addEventListener('keyup', (event) => {
   
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            
            
            break
        case 'a':
            keys.a.pressed = false
            
            break
        
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            
            break
       
        
    }
})

