import Vector from './Vector.js'

import AABB from './AABB.js'

export default class Ball {
  
  constructor({ radius, pos, acc, vel }) {
    this.radius = radius
    this.pos = pos
    this.acc = acc
    this.vel = vel
    this.boundingBox = new AABB({
      pos: this.pos,
      size: {
        w: this.radius * 2,
        h: this.radius * 2
      }
    })
  }
  
  launch(court) {
    let flip = () => Math.floor(Math.random() * 3)

    if (this.vel.pos.x === 0 && this.vel.pos.y === 0) {
      this.vel.pos.x -= this.acc
      switch(flip()) {
        case 0: this.vel.pos.y += this.acc; break
        case 1: this.vel.pos.y -= this.acc; break
        case 2: this.vel.pos.y = 0; break
      }
    } else {
      this.vel.pos.x = 0
      this.vel.pos.y = 0
    }
  }
  
  move() {
    this.pos.x += this.vel.pos.x
    this.pos.y += this.vel.pos.y
  }
  
  handleCollision(result) {
    console.log(result)
    if (typeof result[1] === 'object') {
      this.vel.pos.x += result[1].team === "left"
        ? result[0].correction.pos.x * 0.8
        : result[0].correction.pos.x * 0.2
      this.vel.pos.y -= Math.floor(result[1].vel.pos.y * 0.6)
    } else {
      this.vel.pos.y *= -1
    }
  }
  
  toCenter(pos) {
    this.vel.pos.x = 0
    this.vel.pos.y = 0
    this.pos.x = pos.x
    this.pos.y = pos.y
  }
  
  getPoints(objB, point) {
    this.points = [
      new Vector({
        pos: {
          x: point.pos.x - this.pos.x,
          y: point.pos.y - this.pos.y
        }
      }).normalize().scale(this.radius * 1.7).add(this),
      new Vector({
        pos: {
          x: objB.pos.x - this.pos.x,
          y: objB.pos.y - this.pos.y
        }
      }).normalize().scale(this.radius * 1.7).add(this)
    ]
  }
  
  getNormals(objB) {
    let v = new Vector({
      pos: {
        x: objB.pos.x - this.pos.x,
        y: objB.pos.y - this.pos.y
      }
    })
    this.normals = [v.leftNormal().normalize()]
  }
  
  updateBoundingBox() {
    this.boundingBox.pos = this.pos
    this.boundingBox.getPoints()
    this.boundingBox.getNormals()
  }
  
  // points is the .points property of the nearest paddle (as array)
  nearestPoint(points) {
    return points.map((point, i) => {
      return [
        new Vector({
          pos: {
            x: this.pos.x - point.pos.x,
            y: this.pos.y - point.pos.y 
          }
        }),
        point,
        i
      ]
    }).reduce((prev, curr) => {
      return (curr[0].getMag() < prev[0].getMag()
        ? curr
        : prev)
    })
  }
  
  display(ctx) {
    ctx.strokeStyle = "black"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
    ctx.stroke()
  }
}