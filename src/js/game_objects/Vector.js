export default class Vector {
  
  constructor({pos, unit = false}) {
    this.pos = pos
    this.unit = unit
  }
  
  copy() {
    return new Vector({pos: {x: this.pos.x, y: this.pos.y}})
  }
  
  getMag() {
    return Math.sqrt(this.pos.x * this.pos.x + this.pos.y * this.pos.y)
  }

  normalize() {
    let len = this.getMag()
    if (len === 0) {
      return new Vector({
        pos: { x: 0, y: 0 },
        unit: false
      })
    } else {
      return new Vector({
        pos: {
          x: this.pos.x / len,
          y: this.pos.y / len
        },
        unit: true
      })
    }
  }

  dot(vectorB) {
    return this.pos.x * vectorB.pos.x + this.pos.y * vectorB.pos.y
  }
  
  project(vectorB) {
    let dp = this.dot(vectorB)
    if (vectorB.unit) {
      // simplification if b is unit vector
      return new Vector({pos: {x: dp * vectorB.pos.x, y: dp * vectorB.y}, unit: false})
    } else {
      return new Vector({
        pos: {
          x: (dp / (vectorB.pos.x * vectorB.pos.x + vectorB.pos.y * vectorB.pos.y)) * vectorB.pos.x,
          y: (dp / (vectorB.pos.x * vectorB.pos.x + vectorB.pos.y * vectorB.pos.y)) * vectorB.pos.y
        },
        unit: false
      })
    }
  }

  leftNormal() {
    return new Vector({pos: {x: -this.pos.y, y: this.pos.x}, unit: false})
  }

  rightNormal() {
    return new Vector({pos: {x: this.pos.y, y: -this.pos.x}, unit: false})
  }

  perProduct(vectorB) {
    return this.dot(this.rightNormal(vectorB))
  }

  add(vectorB) {
    return new Vector({
      pos: {
        x: this.pos.x + vectorB.pos.x,
        y: this.pos.y + vectorB.pos.y
      }
    })
  }

  sub(vectorB) {
    return new Vector({
      pos: {
        x: this.pos.x - vectorB.pos.x,
        y: this.pos.y - vectorB.pos.y
      }
    })
  }
  
  scale(scalar) {
    return new Vector({
      pos: {
        x: this.pos.x * scalar,
        y: this.pos.y * scalar
      }
    })
  }
}
