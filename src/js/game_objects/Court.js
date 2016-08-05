import Vector from './Vector.js'

import AABB from './AABB.js'

export default class Court {
  
  constructor({ size }) {
    this.size = size
    this.pos = {x: size.w / 2, y: size.h / 2}
    this.getBoundaries()
  }

  getBoundaries() {
    let { w, h } = this.size
    this.boundaries = [
      new AABB({
        pos: {x: w/2, y: 0 - w/2},
        size: { w, h: w}
      }),
      new AABB({
        pos: {x: w + h/2, y: h/2},
        size: { w: h, h}
      }),
      new AABB({
        pos: {x: w/2, y: h + w/2},
        size: { w, h: w }
      }),
      new AABB({
        pos: {x: 0 - h/2, y: h/2},
        size: { w: h, h}
      })
    ]
    this.boundaries.forEach((boundary, i) => {
      boundary.index = i
    })
  }
  
  display(ctx) {
    let { w, h } = this.size
    ctx.clearRect(0, 0, w, h)
    ctx.beginPath()
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 2
    ctx.moveTo(w/2, 0)
    ctx.lineTo(w/2, w/2)
    ctx.moveTo(w/2 + w/8, w/4)
    ctx.arc(w/2, w/4, w/8, 0, Math.PI * 2)
    ctx.stroke()
  }
}
