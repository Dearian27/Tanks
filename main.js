
const yellowTank = new Image()
yellowTank.src = './sprites/yellow/frame.svg'

class Player {
  constructor() {
    this.w = 24
    this.h = 36
    this.x = Math.floor(cw / 2)
    this.y = Math.floor(ch / 2)
    this.rotate = {
      speed: 3
    }
    this.speedRotate = 3
    this.speed = 0
    this.move = false
    this.smooth = 1
    this.sides = {
      left: false,
      right: false,
      down: false,
    }
    this.frame = 0  // for animations
  }

  update(){
    ctx.save()

    tank.y += (Math.cos(tank.rotate * (Math.PI / 180))) * tank.speed
    tank.x += -(Math.sin(tank.rotate * (Math.PI / 180))) * tank.speed
    ctx.translate(tank.x + tank.w / 2, tank.y + tank.h / 2)
    ctx.rotate(tank.rotate * (Math.PI / 180))
    ctx.fillStyle = '#aaa'
    ctx.fillRect(-(tank.w / 2), -(tank.h / 2), tank.w, tank.h)
    
    // ctx.drawImage(yellowTank,
    //   12 * this.frame,0,
    //   12, 16,
    //   this.x,
    //   this.y,
    //   this.w,
    //   this.h);
    // image.src = './sprites/tank.png'

    ctx.restore()
  }
}


const tank = new Player()


const bullets = []

document.onclick = () => {
  bullets.push({
    id: (bullets.length == 0) ? 0 : bullets.slice(-1).id + 1,
    rotate: tank.rotate,
    time: 60 * 1,
    w: 4,
    h: 8,
    x: tank.x + tank.w / 2 - 10 / 2 + (Math.cos((tank.rotate - 90) * (Math.PI / 180))) * 50,
    y: tank.y + tank.h / 2 - 25 / 2 + (Math.sin((tank.rotate - 90) * (Math.PI / 180))) * 50,
    speedX: (Math.cos((tank.rotate - 90) * (Math.PI / 180))) * 10,
    speedY: (Math.sin((tank.rotate - 90) * (Math.PI / 180))) * 10
  })
}


function render() {
  ctx.clearRect(0, 0, cw, ch);

  if (tank.sides.left) tank.rotate = tank.rotate += tank.speedRotate
  else if (tank.sides.right) tank.rotate = tank.rotate -= tank.speedRotate
  if (tank.rotate > 360) tank.rotate = 0
  else if (tank.rotate < 0) tank.rotate = 360

  

  tank.update()

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

setInterval(()=> { //for animation
  
  if(tank.move)
  {
    tank.frame++
    if(tank.frame >= 3)
      tank.frame = 0
  }
}, 200)

document.onkeydown = (e) => {
  if (e.code == 'KeyA') {
    tank.sides.down = true
    tank.sides.left = true
  } else if (e.code == 'KeyD') {
    tank.sides.down = true
    tank.sides.right = true
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
    tank.sides.down = false
    tank.sides.right = false
  } else if (e.code == 'KeyD') {
    tank.sides.down = false
    tank.sides.left = false
  }

  if (e.code == 'KeyW' || e.code == 'KeyS') {
    tank.move = false

    smoothStop()
  }
}