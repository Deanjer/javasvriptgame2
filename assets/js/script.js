const canvas = document.querySelector('canvas')
console.log(canvas)
const c = canvas.getContext('2d')
console.log(c)

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
    static width = 41
    static height = 41
    constructor({position}){
        this.position = position
        this.width = 40
        this.height = 40
    }
    draw(){
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Player{
    constructor(){
        this.position = position
        this.velocity = velocity
        this.radius = 10  
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y)
    }
}

const map = [
    ['-', '-', '-', '-', '-', '-', '-', ' ', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', '-'],
    ['-', ' ', '-', '-', '-', '-', '-', '-', ' ', '-'],
    ['-', ' ', '-', ' ', ' ', ' ', ' ', '-', ' ', '-'],
    ['-', ' ', '-', ' ', '-', '-', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', '-', ' ', ' ', '-', ' ', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
]
 
const boundaries = [
  
]

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol){
             case '-':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i 
                    }
                })) 
                break
        }
    })
})

boundaries.forEach((Boundary) => {
    Boundary.draw()
})

 