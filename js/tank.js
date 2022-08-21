import { ctx, canvas } from "./canvas.js"
import { redTank, yellowTank } from "./sprites.js"

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
    this.reloadTime = 1000 * 3
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

    // ctx.fillRect()
    ctx.restore()
  }
  update() {
    tank.position.y += (Math.cos(tank.rotate * (Math.PI / 180))) * tank.speed
    tank.position.x += -(Math.sin(tank.rotate * (Math.PI / 180))) * tank.speed
    this.draw()
  }
}

 let tank = new Tank(canvas.width/2, canvas.height/2)


const tankInit = () => {
  tank = new Tank(canvas.width/2, canvas.height/2)
}

 export { Tank, tank, tankInit }