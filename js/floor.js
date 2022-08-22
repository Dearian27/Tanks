import {ctx} from './main.js'

class Floor {
  constructor(x, y, color) {
    this.position = {
      x: x,
      y: y
    }
    this.height = 100,
    this.width = 100,
    this.color = color
    this.options = {
      up: false,
      down: false,
      left: false,
      right: false,
      x: 0,
      y: 0,
    }
     this.spawnPointX = null
     this.spawnPointY = null
 
  }
 

  draw(){
    // console.log(this.spawnPointX)
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}


// floors
let floorCharac = {
  minX: 4,
  maxX: 8,
  minY: 3,
  maxY: 6,
  floorY: 4,
  floorX: 5,
  floorColors: ['#f1f1f1', '#dfdfdf'],
  floors: [],
}



  // const numbers = [];
  // numbers[0] = []; // теперь numbers - двумерный массив

const floorCharacInit = () => {
  floorCharac.floors = []
  floorCharac.floorX = Math.floor(Math.random() * (floorCharac.maxX - floorCharac.minX + 1)) + floorCharac.minX;
  floorCharac.floorY = Math.floor(Math.random() * (floorCharac.maxY - floorCharac.minY + 1)) + floorCharac.minY;

  for(let y = 0; y < floorCharac.floorY; y++)
  {
    floorCharac.floors[y] = []
    for(let x = 0; x < floorCharac.floorX; x++)
    {
      // console.log(x)
      let random = Math.floor(Math.random() * 2)
      floorCharac.floors[y][x] = new Floor ( 100 * x, 100 * y, floorCharac.floorColors[random])
      floorCharac.floors[y][x].spawnPointX = floorCharac.floors[y][x].position.x + floorCharac.floors[y][x].width / 2;
      floorCharac.floors[y][x].spawnPointY = floorCharac.floors[y][x].position.y + floorCharac.floors[y][x].height / 2;
       
        
      if( y == 0){}
        // floors[y][x].options.up = true;
    }
  }
}

export {floorCharac, Floor, floorCharacInit}