const canvas = document.querySelector("canvas");
console.log(canvas);
const c = canvas.getContext("2d");
console.log(c);

canvas.width = innerWidth;
canvas.height = innerHeight;

let gridSize = 100;

class Boundary {
  static width = gridSize;
  static height = gridSize;
  constructor({ position }) {
    this.position = position;
    this.width = gridSize;
    this.height = gridSize;
  }
  draw() {
    c.fillStyle = "#577590 ";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = gridSize/3;
  }
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "#F3CA40 ";
    c.fill();
    c.closePath();
  }
  update(){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

const map = [
  ["-", "-", "-", "-", "-", "-", "-", " ", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-", " ", " ", "-"],
  ["-", " ", "-", "-", "-", "-", "-", "-", " ", "-"],
  ["-", " ", "-", " ", " ", " ", " ", "-", " ", "-"],
  ["-", " ", "-", " ", "-", "-", " ", " ", " ", "-"],
  ["-", " ", " ", " ", "-", " ", " ", "-", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

const boundaries = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    }, 
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
let lastKey = ''


map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
          })
        );
        break;
    }
  });
});
function animate(){
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)
    boundaries.forEach((Boundary) => {
        Boundary.draw();
      });
      
     player.update();
    player.velocity.y = 0
    player.velocity.x = 0

      if(keys.w.pressed && lastKey === 'w') {
        player.velocity.y = -5
      } else if(keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -5
      } else if(keys.s.pressed && lastKey === 's'){
        player.velocity.y = 5
      } else if(keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 5
      }
 }
animate()


addEventListener("keydown", ({ key }) => {
  console.log(key);
  switch (key) {
    case "w":
      keys.w.pressed = true 
      lastKey = 'w'
      break;
    case "s":
        keys.s.pressed = true 
        lastKey = 's'
      break;
    case "a":
        keys.a.pressed = true 
        lastKey = 'a'
      break;
    case "d":
        keys.d.pressed = true 
        lastKey = 'dd'
      break;
  }
});

addEventListener("keyup", ({ key }) => {
    console.log(key);
    switch (key) {
      case "w":
        keys.w.pressed = false
        break;
      case "s":
        keys.s.pressed = false
        break;
      case "a":
        keys.a.pressed = false
        break;
      case "d":
        keys.d.pressed = false
        break;
    }
  });
  