import { tank, tankInit } from "./tank.js"
import { ctx, canvas } from "./canvas.js"
import { bullet_default } from "./sprites.js"

// bullets
const bullets = []
class Bullet {
  constructor() {
    this.id = (bullets.length == 0) ? 0 : bullets.slice(-1).id + 1
    this.rotate = 270
    this.time = 60 * 10
    this.w = 5
    this.h = 5
    this.x = tank.position.x + tank.width / 2 - 10 / 2 + (Math.cos(
      (tank.rotate - 90) * (Math.PI / 180)
    )) * 40 + 3
    this.y = tank.position.y + tank.height / 2 - 10 / 2 + (Math.sin(
      (tank.rotate - 90) * (Math.PI / 180)
    )) * 40 + 3
    this.speedX = (Math.cos((tank.rotate - 90) * (Math.PI / 180))) * 3
    this.speedY = (Math.sin((tank.rotate - 90) * (Math.PI / 180))) * 3
  }

  draw() {
    this.ricochet()
    this.collision()
    this.x += this.speedX
    this.y += this.speedY

    ctx.fillStyle = '#000'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.h, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  ricochet() {
    if (this.y < 0) this.speedY = -this.speedY
    if (this.y + this.h > canvas.height) this.speedY = -this.speedY
    if (this.x < 0) this.speedX = -this.speedX
    if (this.x + this.h > canvas.width) this.speedX = -this.speedX
  }

  collision() {
    const avg = tank.height - tank.width
    let countH = (Math.cos((tank.rotate) * (Math.PI / 180))) * avg
    if (countH < 0) countH = -countH

    const width = tank.width + -countH + avg
    const height = tank.width + countH
    const posx = tank.position.x + ((tank.height - width) / 2) - avg / 2
    const posy = tank.position.y + -((tank.height - width) / 2) + avg / 2

    if(this.x + this.w * 1.5 > posx && this.x - this.w / 2 < posx + width
      && this.y + this.h / 2 > posy && this.y - this.h / 2 < posy + height) {
      tankInit()
   }
  }
}

// Added bullet
document.onclick = () => {
  if (tank.reload) return

  let fire = new Audio('../audio/fire.mp3')
  fire.volume = 0.4
  fire.play()

  bullets.push(new Bullet())
  tank.reload = true
  setTimeout(() => tank.reload = false, tank.reloadTime)
}

setInterval(()=> { //for animation
  if(tank.move && tank.keys.back)
  {
    tank.frame++
    if(tank.frame >= 4)
      tank.frame = 0
  }
  else if (tank.move)
  {
    tank.frame--
    if(tank.frame <= 0)
      tank.frame = 3
  }
}, 25)

class Floor {
  constructor(x, y, color) {
    this.position = {
      x: x,
      y: y
    }

    this.height = 100,
    this.width = 100,
    this.color = color
    //'#fff' '#ff0'
  }
  
  draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

function animate() {
  
  if (canvas.offsetHeight > window.innerHeight) {
    canvas.style.height = '100%'
    canvas.style.width = 'auto'
  } else if (canvas.offsetWidth > window.innerWidth) {
    canvas.style.width = '100%'
    canvas.style.height = 'auto'
  }

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  tank.update()
  
  bullets.forEach((bullet, index) => {
    // drawing all bullets
    if (bullet.time > 0) bullet.time--
    else delete bullets[index]
    bullet.draw()
  })

  if(tank.keys.back || tank.keys.forward || tank.keys.left || tank.keys.right)
    tank.move = true;
  else
    tank.move = false;

  requestAnimationFrame(animate) //arguments.callee
} animate()

function smoothStop() {
  if (tank.speed > tank.smooth) tank.speed = ((tank.speed * 10) - tank.smooth * 10) / 10
  else if (tank.speed < tank.smooth) tank.speed = ((tank.speed * 10) + tank.smooth * 10) / 10
  else tank.speed = 0

  if (tank.speed !== 0) setTimeout(smoothStop, 50)
}



export {
  tank,
  ctx, canvas,
  smoothStop
}