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
        pos: {x: w/2, y: 0 - w/2 + 10},
        size: { w, h: w}
      }),
      new AABB({
        pos: {x: w + h/2, y: h/2},
        size: { w: h, h}
      }),
      new AABB({
        pos: {x: w/2 - 10, y: h + w/2 - 10},
        size: { w, h: w }
      }),
      new AABB({
        pos: {x: -h/2, y: h/2},
        size: { w: h, h}
      })
    ]
    this.boundaries.forEach((boundary, i) => {
      boundary.index = i
    })
  }
  
  display(ctx) {
    let { w, h } = this.size,
        bg = document.getElementById('pongCourt')
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(bg, 0, 0, 600, 500)
  }
}
