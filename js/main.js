import { tank, tankInit } from "./tank.js"
import { ctx, canvas } from "./canvas.js"
import { bullet_default } from "./sprites.js"
import { Bullet } from "./bullet.js"
import { floorCharac } from "./floor.js"






// bullets
const bullets = []


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





function animate() {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  if (canvas.offsetHeight > window.innerHeight) {
    canvas.style.height = '100%'
    canvas.style.width = 'auto'
  } else if (canvas.offsetWidth > window.innerWidth) {
    canvas.style.width = '100%'
    canvas.style.height = 'auto'
  }

  
  
  floorCharac.floors.forEach(floor =>{
    floor.forEach(el => {
      el.draw()
    })
  })
  
  bullets.forEach((bullet, index) => {
    // drawing all bullets
    if (bullet.time > 0) bullet.time--
    else delete bullets[index]
    bullet.draw()
  })

  tank.update()

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
  smoothStop,
  bullets
}