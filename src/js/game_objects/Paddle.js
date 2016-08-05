import Vector from './Vector.js'

export default class Paddle {
  
  constructor({ team, size, points, acc, vel, friction }) {
    this.team = team
    this.size = size
    this.points = points
    this.pos = this.getCenter()
    this.acc = acc
    this.vel = vel
    this.friction = friction
  }
  
  move() {
    // apply friction
    if (this.vel.pos.y <= this.friction && this.vel.pos.y >= -this.friction) {
      this.vel.pos.y = 0;
    } else if (this.vel.pos.y >= 0.05) {
      this.vel.pos.y -= this.friction;
    } else if (this.vel.pos.y <= -0.05) {
      this.vel.pos.y += this.friction;
    }
    
    // translate each point
    this.points.forEach(point => {
      point.pos.x += this.vel.pos.x
      point.pos.y += this.vel.pos.y
    })
  }
  
  handleKeyPress(keyCode) {
    switch(keyCode) {
      case 87: this.vel.pos.y -= this.acc; break
      case 83: this.vel.pos.y += this.acc; break
      case 65: this.rotation.vel -= this.rotation.acc; break
      case 68: this.rotation.vel += this.rotation.acc; break
    }
  }
  
  handleCollision() {
    this.vel.pos.y *= -1
  }
  
  getCenter() {
    let count = this.points.length

    if (count === 0) {
      return new Vector({pos: {x: 0, y: 0}, unit: false})
    }
    let Xs = this.points.map(v => v.pos.x).reduce((pre, cur) => pre + cur),
        Ys = this.points.map(v => v.pos.y).reduce((pre, cur) => pre + cur)
    let sum = {
      x: this.points.reduce((prev, curr) => {
        return prev + curr.pos.x
      }, 0),
      y: this.points.reduce((prev, curr) => {
        return prev + curr.pos.y
      }, 0)
    }

    return { x: sum.x / count, y: sum.y / count }
  }
  
  getNormals() {
    this.normals = this.points.map((point, i) => {
      let p1 = this.points[i],
          p2 = i === this.points.length - 1
            ? this.points[0]
            : this.points[i + 1],
          v = new Vector({
            pos: {x: p2.pos.x - p1.pos.x, y: p2.pos.y - p1.pos.y}
          })
      return v.leftNormal().normalize()
    })
  }
  
  display(ctx) {
    ctx.fillStyle = "black"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(this.points[0].pos.x, this.points[0].pos.y)
    for (let i = 1; i < this.points.length; i += 1) {
      ctx.lineTo(this.points[i].pos.x, this.points[i].pos.y)
    }
    ctx.closePath()
    ctx.fill()
  }
}