import { ctx, canvas } from "./canvas.js"
import { redTank, yellowTank, tower } from "./sprites.js"

class Tank {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.height = 48
    this.width = 36
    this.rotate = 0
    this.speed = 0
    this.move = false
    this.frame = 0
    this.smooth = 1
    this.keys = {
      forward: false,
      back: false,
      left: false,
      right: false,
    }
    this.reload = false
    this.reloadTime = 1000
  }

  draw() {
    if (this.rotate > 360) this.rotate = 0
    else if (this.rotate < 0) this.rotate = 360
  
    if (this.keys.left && !this.keys.back) {
      this.rotate -= 2
    } else if (this.keys.right && !this.keys.back) {
      this.rotate += 2
    } else if (this.keys.left) {
      this.rotate += 2
    } else if (this.keys.right) {
      this.rotate -= 2
    }

    ctx.save()

    ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
    ctx.rotate(this.rotate * (Math.PI / 180))
    // ctx.fillStyle = '#aaa'
    // ctx.fillRect(-(this.width / 2), -(this.height / 2), this.width, this.height)
    ctx.drawImage(yellowTank,
      320 * this.frame, 0,
      320, 430,
      -(this.width / 2),
      -(this.height / 2),
      this.width,
      this.height);
    

    // TOWER OF TANK
    ctx.drawImage(tower,
      // 8, 13,5
      -(25 / 2),
      -(42 - 25 / 2),
      25,
      40);
    ctx.fillStyle = '#fa0'
  
    ctx.restore()
    // this.drawCollision()
  }
  update() {
    tank.position.y += (Math.cos(tank.rotate * (Math.PI / 180))) * tank.speed
    tank.position.x += -(Math.sin(tank.rotate * (Math.PI / 180))) * tank.speed
    this.draw()
  }

  drawCollision() {
    const avg = this.height - this.width
    let countH = (Math.cos((tank.rotate) * (Math.PI / 180))) * avg
    if (countH < 0) countH = -countH

    const width = tank.width + -countH + avg
    const height = tank.width + countH
    const posx = tank.position.x + ((tank.height - width) / 2) - avg / 2
    const posy = tank.position.y + -((tank.height - width) / 2) + avg / 2
    
    ctx.fillStyle = 'red'
    ctx.fillRect(posx, posy, height, width)
  }
}

 let tank = new Tank(canvas.width/2, canvas.height/2)


const tankInit = () => {
  tank = new Tank(canvas.width/2, canvas.height/2)
}

 export { Tank, tank, tankInit }