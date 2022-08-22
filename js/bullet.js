import {bullets, tank, canvas, ctx}  from './main.js'
import {tankInit} from './tank.js'
import {soundRicochet} from './sounds.js'
import { floorCharacInit } from './floor.js'

class Bullet {
  constructor() {
    this.id = (bullets.length == 0) ? 0 : bullets.slice(-1).id + 1
    this.rotate = 270
    this.time = 60 * 10
    this.w = 5
    this.h = 5
    this.x = tank.position.x + tank.width / 2 - 10 / 2 + (Math.cos(
      (tank.rotate - 90) * (Math.PI / 180)
    )) * 37 + 3
    this.y = tank.position.y + tank.height / 2 - 10 / 2 + (Math.sin(
      (tank.rotate - 90) * (Math.PI / 180)
    )) * 37 + 3
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
    if (this.y < 0 && this.speedY < 0) {
      this.speedY = -this.speedY
      soundRicochet()
    }
    if (this.y + this.h > canvas.height && this.speedY > 0) {
      this.speedY = -this.speedY
      soundRicochet()
    }
    if (this.x < 0 && this.speedX < 0) { 
      this.speedX = -this.speedX
      soundRicochet()
    }
    if (this.x + this.h > canvas.width && this.speedX > 0) {
      this.speedX = -this.speedX
      soundRicochet()
    } 
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
      floorCharacInit()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      bullets.splice(0, bullets.length)
   }
  }
}

export {Bullet}