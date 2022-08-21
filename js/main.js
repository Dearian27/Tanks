import { tank, tankInit } from "./tank.js"
import { ctx, canvas } from "./canvas.js"
import { bullet_default } from "./sprites.js"

// bullets
const bullets = []
class Bullet {
  constructor() {
    this.id = (bullets.length == 0) ? 0 : bullets.slice(-1).id + 1
    this.rotate = 270
    this.time = 60 * 3
    this.w = 6
    this.h = 6
    this.x = tank.position.x + tank.width / 2 - 10 / 2 + (Math.cos(
      (tank.rotate - 90) * (Math.PI / 180)
    )) * 30
    this.y = tank.position.y + tank.height / 2 - 10 / 2 + (Math.sin(
      (tank.rotate - 90) * (Math.PI / 180)
    )) * 30
    this.speedX = (Math.cos((tank.rotate - 90) * (Math.PI / 180))) * 10
    this.speedY = (Math.sin((tank.rotate - 90) * (Math.PI / 180))) * 10
  }

  draw() {
    if (this.y < 0) this.speedY = -this.speedY
    if (this.y > canvas.height + this.h) this.speedY = -this.speedY
    if (this.x < 0) this.speedX = -this.speedX
    if (this.x > canvas.width + this.h) this.speedX = -this.speedX

    this.x += this.speedX
    this.y += this.speedY

    ctx.fillStyle = '#000'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.h, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.fillRect(this.x, this.y, this.w, this.h)
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

// setInterval(() => {
//   if (!tank.keys.back && !tank.keys.forward) {
//     if (tank.velocity.y > 0) {
//       tank.velocity.y = ((tank.velocity.y * 10) - 2) / 10
//     } else if (tank.velocity.y < 0) {
//       tank.velocity.y = ((tank.velocity.y * 10) + 2) / 10
//     }
//   }
// }, 1000/60)



export {
  tank,
  ctx, canvas,
  smoothStop
}

/*
const canvas = document.getElementById('canvas')
const cw = 1280
const ch = 720
canvas.setAttribute('width', cw)
canvas.setAttribute('height', ch)
const ctx = canvas.getContext('2d')

const sides = {
  left: false,
  right: false,
  down: false
}

const tank = {
  w: 50,
  h: 80,
  x: Math.floor(cw / 2),
  y: Math.floor(ch / 2),
  rotate: 0,
  speedRotate: 3,
  defaultSpeed: 5,
  move: false,
  speed: 0,
  smooth: 1
}

const bullets = []

document.onclick = () => {
  bullets.push({
    id: (bullets.length == 0) ? 0 : bullets.slice(-1).id + 1,
    rotate: tank.rotate,
    time: 60 * 1,
    w: 10,
    h: 25,
    x: tank.x + tank.w / 2 - 10 / 2 + (Math.cos((tank.rotate - 90) * (Math.PI / 180))) * 100,
    y: tank.y + tank.h / 2 - 25 / 2 + (Math.sin((tank.rotate - 90) * (Math.PI / 180))) * 100,
    speedX: (Math.cos((tank.rotate - 90) * (Math.PI / 180))) * 10,
    speedY: (Math.sin((tank.rotate - 90) * (Math.PI / 180))) * 10
  })
}

let image = new Image()
function render() {
  ctx.clearRect(0, 0, cw, ch);

  if (sides.left) tank.rotate = tank.rotate += tank.speedRotate
  else if (sides.right) tank.rotate = tank.rotate -= tank.speedRotate
  if (tank.rotate > 360) tank.rotate = 0
  else if (tank.rotate < 0) tank.rotate = 360

  tank.y += (Math.cos(tank.rotate * (Math.PI / 180))) * tank.speed
  tank.x += -(Math.sin(tank.rotate * (Math.PI / 180))) * tank.speed

  ctx.save()

  ctx.translate(tank.x + tank.w / 2, tank.y + tank.h / 2)
  ctx.rotate(tank.rotate * (Math.PI / 180))
  ctx.fillStyle = '#aaa'
  ctx.fillRect(-(tank.w / 2), -(tank.h / 2), tank.w, tank.h)
  image.src = './sprites/tank.png'

  ctx.restore()

  bullets.forEach((bullet, index) => {
    ctx.save()
    ctx.translate(bullet.x + bullet.w / 2, bullet.y + bullet.h / 2)
    ctx.rotate(bullet.rotate * (Math.PI / 180))
    ctx.fillStyle = 'red'
    ctx.fillRect(-(bullet.w / 2), -(bullet.h / 2), bullet.w, bullet.h)
    bullet.x += bullet.speedX
    bullet.y += bullet.speedY
    ctx.restore()

    if (bullet.time <= 0) delete bullets[index]
    else bullet.time--
  })

  setTimeout(arguments.callee, 1000/60)
} render()

function smoothStop() {
  if (tank.speed > tank.smooth) tank.speed = ((tank.speed * 10) - tank.smooth * 10) / 10
  else if (tank.speed < tank.smooth) tank.speed = ((tank.speed * 10) + tank.smooth * 10) / 10
  else tank.speed = 0

  if (tank.speed !== 0) setTimeout(arguments.callee, 50)
}

document.onkeydown = (e) => {
  if (e.code == 'KeyA') {
    sides.down = true
    sides.right = true
  } else if (e.code == 'KeyD') {
    sides.down = true
    sides.left = true
  }
  
  if (e.code == 'KeyW') {
    tank.move = true
    tank.speed = -tank.defaultSpeed
  } else if (e.code == 'KeyS') {
    tank.move = true
    tank.speed = tank.defaultSpeed
  }
}

document.onkeyup = (e) => {
  if (e.code == 'KeyA') {
    sides.down = false
    sides.right = false
  } else if (e.code == 'KeyD') {
    sides.down = false
    sides.left = false
  }

  if (e.code == 'KeyW' || e.code == 'KeyS') {
    tank.move = false

    smoothStop()
  }
}
 */