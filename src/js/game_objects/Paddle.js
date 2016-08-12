import Vector from './Vector.js'

export default class Paddle {
  
  constructor({ team, size, points, acc, vel, friction, rotation }) {
    this.team = team
    this.size = size
    this.points = points
    this.pos = this.getCenter()
    this.acc = acc
    this.vel = vel
    this.friction = friction
    this.rotation = rotation
    this.windingUp = false
    this.fullyCharged = false
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

    if (this.team === 'left') {
      if (!this.windingUp[0] && !this.fullyCharged) { this.realign() }
      this.applyRotation()
      this.getNormals()
    }
    
    // translate each point
    this.points.forEach(point => {
      point.pos.x += this.vel.pos.x
      point.pos.y += this.vel.pos.y
    })
    this.pos = this.getCenter()
  }
  
  realign() {
    let r = this.rotation
    if (r.orientation > 1) { r.angle = -r.orientation }
    else if (r.orientation < -1) { r.angle = -r.orientation }
    else {
      r.angle = 0
      r.orientation = 0
    }
  }
  
  windUp() {
    let r = this.rotation
    if (r.orientation < -45 || r.orientation > 45) {
      this.fullyCharged = true
      r.angle = 0
    } else if (this.windingUp[0] && !this.fullyCharged) {
      r.angle += r.rotAcc * this.windingUp[1]
      r.burst += r.angle
    }
  }
  
  applyRotation() {
    let r = this.rotation
    r.orientation += r.angle
    
    if (this.windingUp[0]) { this.windUp() }

    let theta = (Math.PI / 180) * r.angle,
        pCos = Math.cos(theta),
        pSin = Math.sin(theta),
        c = this.pos;
    
    this.points.forEach(p => {
      let x = p.pos.x - c.x,
          y = p.pos.y - c.y,
          rotX = x * pCos - y * pSin,
          rotY = x * pSin + y * pCos
      p.pos.x = rotX + c.x
      p.pos.y = rotY + c.y
    });
  }
  
  autoPilot(ball) {
    if (ball.pos.y > this.pos.y + this.size.h / 3) {
      this.vel.pos.y = this.acc
    } else if (ball.pos.y < this.pos.y - this.size.h / 3) {
      this.vel.pos.y = -this.acc
    } else {
      this.vel.pos.y = 0
    }
  }
  
  handleCollision() {
    this.vel.pos.y *= -1
  }
  
  getCenter() {
    let count = this.points.length

    if (count === 0) {
      return {x: 0, y: 0}
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
    ctx.fillStyle = this.team === 'left' ? 'blue' : 'red'
    ctx.strokeStyle = this.team === 'left' ? 'midnightblue' : 'firebrick'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(this.points[0].pos.x, this.points[0].pos.y)
    for (let i = 1; i < this.points.length; i += 1) {
      ctx.lineTo(this.points[i].pos.x, this.points[i].pos.y)
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    
    let pinSize = this.size.w - this.size.w * 0.7
    
    ctx.fillStyle = '#777'
    ctx.strokeStyle = '#ccc'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, pinSize, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }
}