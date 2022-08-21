import {ktmanDisk,ktmanRunRight,ktmanRunLeft,ktmanIdleLeft,ktmanIdleRight} from './ktmanAnim.js'
import {coin, coinInit} from './coin.js'
import {player, playerInit} from './player.js'


// Sounds
const soundDeathSound = () => {
let deathSound = new Audio('../sounds/death.mp3')
deathSound.volume = 0.15
deathSound.play();
}

const enemyDeath = () => {
let enemyDeath =  new Audio('../sounds/enemyDeath.mp3')
enemyDeath.volume = 0.1
enemyDeath.play();
}

let beep = new Audio("../sounds/ah.mp3")
let ambient = new Audio('../sounds/ambient.mp3')

beep.volume = 0.02
ambient.volume = 0.02
ambient.defaultPlaybackRate()


// ambient.play()

var resp = ambient.play();

// if (resp !== undefined) {
//     resp.then(_ => {
//         ambient.play()
//     }).catch(error => {
//         // ambient.play()
//     });
// }

//ktman.style.scale = 3


// Images

let platformImg = new Image()
platformImg.src = './img/platform.png'

let platformSmallImg = new Image()
platformSmallImg.src = './img/platformSmallTall.png'

let hills = new Image()
hills.src = './img/hills.png'

let background = new Image()
background.src = './img/background.png'

let bulletSprite = new Image()
bulletSprite.src = './img/disk.png'


//Blender----------------
let blenderBullet = new Image()
blenderBullet.src = './img/blender/blenderBullet.svg'

let blenderStayRight = new Image()
blenderStayRight.src = './img/blender/blender-stayRight.svg'            

let blenderStayLeft = new Image()
blenderStayLeft.src = './img/blender/blender-stayLeft.svg'

let blenderRunLeft = new Image()
blenderRunLeft.src = './img/blender/blender-runLeft.svg'

let blenderRunRight = new Image()
blenderRunRight.src = './img/blender/blender-runRight.svg'

let blenderShootingRight = new Image();
blenderShootingRight.src = './img/blender/blender-shootingRight.svg'

let blenderShootingLeft = new Image();
blenderShootingLeft.src = './img/blender/blender-shootingLeft.svg'







// --------------------------------------------------


const characteristics = {
    gravity: 0.8,
    bulletCD: false,
    shooting: false,
    shootingDirectionRight: false,
    platforms: [],
    genericObject: [],
    bullets: [],
    enemies: [],
    scrollOffset: 0,
    jumps: {},
}



const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576





class Enemy {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40
        this.height = 40
    }
    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y,
            this.width, this.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += characteristics.gravity
    }
}


class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)

    }
}


class GenericObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Bullet {
    constructor (x, y, color, width, height, velocity, target) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = velocity
        this.width = width
        this.height = height
        this.bulletFrames = 0
        this.needReturn = false
        this.target = target
    }

    draw() {

        //c.fillStyle = this.color
        //c.fillRect(this.x, this.y, this.width, this.height)
        if(player.character == 'ktman')
        {
            c.drawImage(ktmanDisk,
                12 * this.bulletFrames + this.bulletFrames,0,
                12, 12,
                this.x,
                this.y,
                this.width,
                this.height);
        }
        else if( player.character == 'blender')
        {
            //c.fillStyle = this.color
            //c.fillRect(this.x, this.y, this.width, this.height)
            c.drawImage(blenderBullet,
                7 * this.bulletFrames + this.bulletFrames,0,
                7, 4,
                this.x,
                this.y,
                this.width,
                this.height);
        }

    }
    intarget() {
        
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y 

        characteristics.enemies.forEach(enemy => {
            if (this.x < enemy.position.x + enemy.width &&
                this.x + this.width > enemy.position.x &&
                this.y < enemy.position.y + enemy.height &&
                this.height + this.y > enemy.position.y){
                    this.needReturn = true
                    enemy.velocity += 100
                    enemyDeath()
                if(player.character == 'blender')
                    if (characteristics.bullets.indexOf(this) !== -1) 
                    characteristics.bullets.splice(characteristics.bullets.indexOf(this), 1);
            }
        })

        if(player.character == 'ktman')
        {
            if ( this.x < this.target.x &&
                 this.x + this.width > this.target.x &&
                 this.y < this.target.y &&
                 this.y + this.height > this.target.y)
        
            {
                this.needReturn = true;        
            }
        }
    }
    return() {
        this.draw()
        

        const angle = Math.atan2((player.position.y + player.height / 2) - (this.y + this.height / 2),
         (player.position.x + player.width / 2) - (this.x + this.width / 2))
        // console.log(angle);
        
        
            this.velocity.x = Math.cos(angle) *8,
            this.velocity.y =  Math.sin(angle) *8

            this.x = this.x + this.velocity.x
            this.y = this.y + this.velocity.y
    


        
        //Видалення кулі
        if (this.x < player.position.x + player.width && 
            this.x + this.width > player.position.x &&
            this.y < player.position.y + player.height &&
            this.height + this.y > player.position.y){
                if (characteristics.bullets.indexOf(this) !== -1) {
                    characteristics.bullets.splice(characteristics.bullets.indexOf(this), 1);
                }  
        }

        characteristics.enemies.forEach(enemy => {
        //Смерть ворогам! Слава Україні
        if (this.x < enemy.position.x + enemy.width &&
            this.x + this.width > enemy.position.x &&
            this.y < enemy.position.y + enemy.height &&
            this.height + this.y > enemy.position.y){
                this.needReturn = true
                enemy.velocity += 100
                enemyDeath()
        }
        })


    }
}



// Змінні ------------------------------------------------------------------------------


// let player = new Player()



canvas.addEventListener('click', (event) => {

   if(player.character == 'ktman' && characteristics.bullets.length <= 0 )
   {

        const angle = Math.atan2(event.offsetY - ((player.position.y ) + player.height / 2), event.offsetX - ((player.position.x ) + player.width / 2))
        console.log(angle);
       
        const velocity = {
            x: Math.cos(angle) * 6.5,
            y: Math.sin(angle) * 6.5
        }
        
        const target = {
            x: event.offsetX,
            y: event.offsetY
        }
        let bullet = new Bullet(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2,
            'yellow',
            36,
            36,
            velocity,
            target
        )
        bullet.x -= 18;
        bullet.y -= 18;
        // console.log(bullet)
        setTimeout(()=>{
            bullet.needReturn = true;
        }, 1000)

        

        // bullet.position.x = player.position.x + (player.width / 2) - (bullet.width / 2);
        // bullet.position.y = player.position.y + (player.height / 2) - (bullet.height / 2)
        beep.play()
        characteristics.bullets.push(bullet)
    }
    else if(player.character == 'blender' && !characteristics.bulletCD)
    {
        
        characteristics.shooting = true  //СТАТУС СТРІЛЬБИ ДЛЯ АНІМАЦІЇ
        characteristics.bulletCD = true  //КУЛЛДАУН ВИСТРІЛУ
        const angle = Math.atan2(event.offsetY - ((player.position.y ) + player.height / 2),
                                 event.offsetX - ((player.position.x ) + player.width / 2))
        const velocity = {
           x: Math.cos(angle) * 10,
           y: Math.sin(angle) * 10
        }
       
       const target = {
           x: event.offsetX,
           y: event.offsetY
        }
       let bullet = new Bullet(
           player.position.x + player.width / 2,
           player.position.y + player.height / 2,
           'yellow',
           28,
           16,
           velocity,
           target
       )
       

        beep.play()
        characteristics.bullets.push(bullet)
        // console.log(bullets)

        if(bullet.target.x > player.position.x) //ВИЗНАЧЕННЯ НАПРЯМКУ КУЛІ ВЛІВО/ВПРАВО
        {
            characteristics.shootingDirectionRight = true;
        }
        else if(bullet.target.x <= player.position.x)
        {
            characteristics.shootingDirectionRight = false;
        }
        
        setTimeout(()=>{
            if (characteristics.bullets.indexOf(bullet) !== -1) {
                characteristics.bullets.splice(characteristics.bullets.indexOf(bullet), 1);
            } 
        }, 1000)
        setTimeout(()=>{
            characteristics.bulletCD = false
            characteristics.shooting = false
        }, 300)
        setTimeout(()=>{
            characteristics.shooting = false
        }, 900)
    }
})






// Init Function ------------------------------------------------------------------------------

function init() {
    characteristics.scrollOffset = 0;
    coinInit()
    playerInit()
    characteristics.enemies = [
        new Enemy({
            x: 700,
            y: 100
        }),
        new Enemy({
            x: 400,
            y: 100
        }),
        new Enemy({
            x: 900,
            y: 100
        }),
        new Enemy({
            x: 530,
            y: 300
        })
    ]

    characteristics.platforms = [
        new Platform({
            x: platformImg.width * 4 + 300 - 3 + platformImg.width - platformSmallImg.width,
            y: 350,
            image: platformSmallImg,

        }),
        new Platform({
            x: platformImg.width - 6 - platformSmallImg.width + 100,
            y: 245,
            image: platformSmallImg,
        }),
        new Platform({
            x: platformImg.width - 3 - platformSmallImg.width,
            y: 360,
            image: platformSmallImg,
        }),
        new Platform({
            x: -1,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width - 4 + platformSmallImg.width,
            y: 360,
            image: platformSmallImg,
        }),
        new Platform({
            x: platformImg.width - 3,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 2 + 100,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 3 + 300,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 4 + 300 - 3,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 5 + 550 - 3,
            y: 470,
            image: platformImg,
        }),
    ]

    characteristics.genericObject = [
        new GenericObject({
            x: -1,
            y: -1,
            image: background
        }),
        new GenericObject({
            x: -1,
            y: -1,
            image: hills
        })
    ]




}


// Keys Array --------------------------------------------------------------------------------

const keys = {
    space: {
        pressed: false
    },
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    down: {
        pressed: false,
        isDownAlready: false
    }
}






// Animate ---------------------------------------------------------------------------------------

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    characteristics.genericObject.forEach(genericObject => {
        genericObject.draw()
    })

    characteristics.platforms.forEach(platform => {
        platform.draw()
    })

    player.update()
    coin.draw();


    characteristics.enemies.forEach(enemy => {
        enemy.update()
    })

    characteristics.bullets.forEach(bullet => {
        
        if(player.character == 'ktman')
        {
            if(bullet.needReturn == false)
            {
                bullet.intarget()    
            }
            else{
                bullet.return();   
            }
        }
        else if(player.character == 'blender')
        {
            bullet.intarget()  
        }
        
    })


    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if (
        (keys.left.pressed && player.position.x > 200) ||
        (keys.left.pressed && characteristics.scrollOffset === 0 && player.position.x > 0)
    ) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0
        

        if (keys.right.pressed) {
            characteristics.scrollOffset += player.speed

            coin.position.x -= player.speed;

            characteristics.enemies.forEach(enemy => {
                enemy.position.x -= player.speed
            })
            
            characteristics.platforms.forEach(platform => {
                platform.position.x -= player.speed
            })

            characteristics.bullets.forEach(bullet => {
                bullet.x -= player.speed
                // bullet.target.a -= player.speed
            })

            characteristics.genericObject.forEach(genericObject => {
                genericObject.position.x -= player.speed * 0.5
            })
        } else if (keys.left.pressed && characteristics.scrollOffset > 0) {
            characteristics.scrollOffset -= player.speed

            coin.position.x += player.speed;

            characteristics.enemies.forEach(enemy => {
                enemy.position.x += player.speed
            })

            characteristics.platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            
            characteristics.bullets.forEach(bullet => {
                bullet.x += player.speed
                // bullet.target.a += player.speed
            })

            characteristics.genericObject.forEach(genericObject => {
                genericObject.position.x += player.speed * 0.5
            })
        }
        
      
    }



    // Platform collision -----------------------------------------------------------------

    characteristics.platforms.forEach(platform => {
        //Player on platform ---------------------------------------------------------
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height
            + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
            player.isGround = true
        }
       //Enemy on platform ------------------------------------------------------------

       characteristics.enemies.forEach(enemy => {
        if (enemy.position.y + enemy.height <= platform.position.y && enemy.position.y + enemy.height
            + enemy.velocity.y >= platform.position.y && enemy.position.x + enemy.width >= platform.position.x
            && enemy.position.x <= platform.position.x + platform.width) {
            enemy.velocity.y = 0;
        }
       })
    })

    characteristics.platforms.forEach(platform => {
        // ---- Майбутній зпуск з платформи
        //     Далі буде
    })




    // enemy collision

    characteristics.enemies.forEach(enemy => {
        if (player.position.y + enemy.height <= enemy.position.y && player.position.y + player.height
            + player.velocity.y >= enemy.position.y && player.position.x + player.width >= enemy.position.x
            && player.position.x <= enemy.position.x + enemy.width) {
            player.velocity.y = -15
            player.isGround = false
            enemyDeath()
            enemy.velocity += 10
        }
    
        if (player.position.x < enemy.position.x + enemy.width &&
            player.position.x + player.width > enemy.position.x &&
            player.position.y < enemy.position.y + enemy.height &&
            player.height + player.position.y > enemy.position.y){
                soundDeathSound()
                characteristics.bullets = []
                init()
        }
      /* if (player.position.x < enemy.position.x + enemy.width  &&
            player.position.y < enemy.position.y + enemy.height + 500 &&
            player.height + 500 + player.position.y > enemy.position.y){
            enemy.position.x -= 3
        }
       else if(player.position.x + player.width + 100 > enemy.position.x &&
             player.position.y < enemy.position.y + enemy.height + 500 &&
            player.height + 500 + player.position.y > enemy.position.y)
           enemy.position.x += 3
*/
    })

    
    // win
    if (characteristics.scrollOffset > platformImg.width * 5 + 500 - 3) {
        console.log('You Win!');
    }

    // lose
    if (player.position.y > canvas.height){
        soundDeathSound()
        characteristics.bullets = []
        init()
    }


}






init()
animate()



//EXPORT ALWAYS UNDERCODE

export {c, canvas, keys, characteristics, player, soundDeathSound, init}
export {blenderBullet, blenderStayRight, blenderStayLeft, blenderRunLeft, blenderRunRight, blenderShootingRight, blenderShootingLeft};




