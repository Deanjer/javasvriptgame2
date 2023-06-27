const canvas = document.querySelector("canvas");
console.log(canvas);
const c = canvas.getContext("2d");
console.log(c);
var finished = false;

// Add behind elements.
c.globalCompositeOperation = 'destination-over'
// Now draw!
c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

let gridSize = 100;

class Boundary {
  static width = gridSize;
  static height = gridSize;
  constructor({ position }) {
    this.position = position;
    this.width = gridSize;
    this.height = gridSize;
    this.type = 'normal';
  }
  draw() {
    c.fillStyle = "#577590 ";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class finish {
  static width = gridSize;
  static height = gridSize;
  constructor({ position }) {
    this.position = position;
    this.width = gridSize;
    this.height = gridSize /2;
    this.type = 'finish';
  }
  draw() {
    c.fillStyle = "black";
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
            type: 'normal',
          })
        );
        break;
      case "x":
        boundaries.push(
          new finish({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            type: 'finish',
          })
        );
        break;
    }
  });
});

function changeLevel(level) {
  switch (level) {
    case 2:
      window.location.href = "level2.html";
      break;
    case 3:
      window.location.href = "level3.html";
      break;
    case 4:
      window.location.href = "level4.html";
      break;
    case 5:
      window.location.href = "level5.html";
      break;
    case 6:
      window.location.href = "level6.html";
      break;
  }
}


function animate(){
    
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)
    boundaries.forEach((Boundary) => {
        Boundary.draw();
        if( player.position.y - player.radius + player.velocity.y <= Boundary.position.y + Boundary.height
             && 
            player.position.x + player.radius + player.velocity.x >= Boundary.position.x 
             && 
            player.position.y + player.radius + player.velocity.y >= Boundary.position.y 
             && 
            player.position.x - player.radius + player.velocity.x <= Boundary.position.x + Boundary.width){
                console.log('collision')
                if (Boundary.type == 'finish' && finished == false) {
                  console.log('finish');
                  finished = true;
                  setHighscore('player1', level);
                  var audio = new Audio('assets/sound/fisnish.wav');
                  audio.onended = function () {};
                  audio.play();
                  changeLevel(level + 1); 
                ;
                }else{
                  console.log('bounch')
                }
                player.velocity.y = 0
                player.velocity.x = 0 
            }
      });
    player.update();
    // point.update()
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
        lastKey = 'd'
      break;
  }
});

addEventListener("keyup", ({ key }) => {
    // console.log(key);
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
  //points

// fetch('./assets/php/set_highscore.php', {
//   method: 'POST',
//   mode: 'same-origin',
//   credentials: 'same-origin',
//   headers: {
//     Accept: 'application/json, text/plain, */*',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ name: test_name, level: test_level }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Success: ', data);
//     return data;
//   });

 

  // assets/php/set_highscore.php


  const setHighscore = async (name, level) => {

    return await fetch('assets/php/set_highscore.php', {

      method: 'POST',

      mode: 'same-origin',

      credentials: 'same-origin',

      headers: {

        Accept: 'application/json, text/plain, */*',

        'Content-Type': 'application/json',

      },

      body: JSON.stringify({ name, level }),

    })

      .then((response) => response.json())

      .then((data) => {

        return data;

      });

  };
  //random background color
  function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
 console.log(bgColor);
  
    // document.body.style.background = bgColor;
    document.getElementById("top-menu").style.backgroundColor = bgColor;
    }

    random_bg_color()