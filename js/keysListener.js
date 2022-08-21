import { tank, smoothStop } from './main.js'

// addEventListener('keydown', ({ keyCode }) => {
//   switch (keyCode) {
//     //********************************************************
//     //PLAYER WASD
//     case 87: //W => forward
//       tank.keys.forward = true
//       break
//     case 83:  //S => back
//       tank.keys.back = true
//       break
//     case 68: //D => right
//       tank.keys.right = false
//       tank.keys.left = true
//       //ROTATE RIGHT  
//       break
//     case 65: //A => left
//       tank.keys.right = true
//       tank.keys.left = false
//       //ROTATE LEFT
//       break
//     default:
//       return
//   }
// })

// addEventListener('keyup', ({ keyCode }) => {
//   switch (keyCode) {
//     //********************************************************
//     //PLAYER WASD
//     case 87: // W => forward
//       tank.keys.forward = false
//     break
//     case 83: // S => back
//       tank.keys.back = false
//       break
//     case 68: // D => right
//       tank.keys.right = false
//       console.log('Up right');
//       break
//     case 65: // A => left
//       tank.keys.left = false
//       console.log('Up left');
//       break
//     default:
//       return
//   }
// })

document.onkeydown = (e) => {
  if (e.code == 'KeyW') {
    tank.keys.forward = true;
    tank.keys.back = false;
    tank.move = true;
    tank.speed = -2;
  } else if (e.code == 'KeyA') {
    tank.keys.right = false
    tank.keys.left = true
    tank.move = true;
  } else if (e.code == 'KeyS') {
    tank.keys.forward = false;
    tank.keys.back = true;
    tank.move = true;
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