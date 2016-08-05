import Vector from './Vector.js'

export default class AABB {
  
  constructor({pos, size}) {
    this.pos = pos;
    this.size = size;
    this.getPoints();
    this.getNormals();
  }

  getPoints() {
    let halfW = this.size.w / 2,
        halfH = this.size.h / 2
    this.points = [
      new Vector({pos: {x: this.pos.x - halfW, y: this.pos.y - halfH}}),
      new Vector({pos: {x: this.pos.x + halfW, y: this.pos.y - halfH}}),
      new Vector({pos: {x: this.pos.x + halfW, y: this.pos.y + halfH}}),
      new Vector({pos: {x: this.pos.x - halfW, y: this.pos.y + halfH}})
    ]
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
}
