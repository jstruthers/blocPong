import Vector from './Vector.js'

export default class Collider {

  Result(isIntersecting, willIntersect, correction) {
    return {
        isIntersecting,
        willIntersect,
        correction
    }
  }

  // project vectors on to normal and return min/max value
  minMaxDotProd(vectors, normal) {
    let min = null,
        max = null
    // For circles
    vectors.forEach(v => {
        let dp = v.dot(normal)
        if (min === null || dp < min) { min = dp }
        if (max === null || dp > max) { max = dp }
    })
    return { min, max }
  }
  
  smallest(vectors) {
    let mag2s = vectors.map((v, i) => {
      return [v.pos.x * v.pos.x + v.pos.y * v.pos.y, i]
    }).sort((a, b) => {
      return a[0] - b[0]
    });
    return vectors[mag2s[0][1]];
  }

  checkNormal(objA, objB, normal) {
    // project points onto normal to find bounds of shadow on axis
    let aMinMax = this.minMaxDotProd(objA.points, normal),
        bMinMax = this.minMaxDotProd(objB.points, normal)
    // check for overlap of shadows on axis
    if (aMinMax.min <= bMinMax.max && aMinMax.max >= bMinMax.min) {
    // correction vector is in direction of normal x amount overlapping
        let newV = normal.copy(),
            correction = newV.scale(bMinMax.max - aMinMax.min)
        correction.surface = newV.rightNormal()
        return this.Result(true, false, correction)
    }
    return this.Result(false, false, new Vector({pos: {x: 0, y: 0}}))
  }

  checkCollision(objA, objB) {
    let correctionVectors = [];
    // project points of objA and objB onto objA's normals
    // check for overlap
    if (!objA.normals) { objA.getNormals() }
    if (!objB.normals) { objB.getNormals() }
    for (let i = 0; i < objA.normals.length; i += 1) {
      let result = this.checkNormal(objA, objB, objA.normals[i]);
      if (result.isIntersecting) {
        correctionVectors.push(result.correction);
      } else {
        return false
      }
    }
    // project points of objA and objB onto objB's normals
    // check for overlap
    for (let i = 0; i < objB.normals.length; i += 1) {
      let result = this.checkNormal(objA, objB, objB.normals[i]);
      if (result.isIntersecting) {
        correctionVectors.push(result.correction);
      } else {
        return false
      }
    }
    // if all overlap, return smallest correction vector
    return this.Result(true, false, this.smallest(correctionVectors))
  }
  
  checkBoundaries(objA, boundaries) {
    let collision = false,
        result,
        i = 0

    if (objA.hasOwnProperty('radius')) {
      objA.updateBoundingBox()
      objA = objA.boundingBox
    }

    while (collision === false && i < boundaries.length) {
      collision = this.checkCollision(objA, boundaries[i])
      result = [this.checkCollision(objA, boundaries[i]), i]
      i += 1
    }
    return result
  }
}
