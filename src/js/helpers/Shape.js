import Vector from './Vector'

function average(vectors) {
  let count = vectors.length

  if (count === 0) {
    return new Vector({pos: {x: 0, y: 0}, unit: false})
  }
  let sum = {
    x: vectors.reduce((prev, curr) => {
      return prev + curr.pos.x
    }, vectors[0].pos.x),
    y: vectors.reduce((prev, curr) => {
      return prev + curr.pos.y
    }, vectors[0].pos.y)
  }

  return new Vector({
    pos: {x: sum.x / count, y: sum.y / count},
    unit: false
  })
}

export class Polygon {

  constructor({points}) {
    this.points = points
    this.pos = average(this.points)
    this.getNormals()
  }

  getPoints() {
  }
  
  getCenter() {
    this.pos = average(this.points)
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

export class AABB {
  
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
