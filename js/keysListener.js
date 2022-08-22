import { tank, smoothStop } from './main.js'


document.onkeydown = (e) => {
  if (e.code == 'KeyW') {
    tank.keys.forward = true
    tank.keys.back = false
    tank.move = true
    tank.speed = -2;
  } else if (e.code == 'KeyA') {
    tank.keys.right = false
    tank.keys.left = true
    tank.move = true
  } else if (e.code == 'KeyS') {
    tank.keys.forward = false
    tank.keys.back = true
    tank.move = true
    tank.speed = 2;
  } else if (e.code == 'KeyD') {
    tank.keys.right = true
    tank.keys.left = false
    tank.move = true;
  }
}

document.onkeyup = (e) => {
  if (e.code == 'KeyW') {
    tank.keys.forward = false;
    smoothStop()
  } else if (e.code == 'KeyA') {
    tank.keys.left = false
  } else if (e.code == 'KeyS') {
    tank.keys.back = false;
    smoothStop()
  } else if (e.code == 'KeyD') {
    tank.keys.right = false
  }
}