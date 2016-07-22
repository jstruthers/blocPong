export function copy(src) {
  let newVector = {}
  newVector.x = src.x
  newVector.y = src.y
  return newVector
}

function add(vectorA, vectorB) {
  return {x: vectorA.x + vectorB.x, y: vectorA.y + vectorB.y}
}

function sub(vectorA, vectorB) {
  return {x: vectorA.x - vectorB.x, y: vectorA.y - vectorB.y}
}

export function magnitude(vector) {
  let { x, y } = vector
  return Math.sqrt(x * x + y * y)
}

export function mag2(vector) {
  let { x, y } = vector
  return x * x + y * y
}

export function normalize(vector) {
  let mag = magnitude(vector)
  // check for zero
  if (mag) {
    return {x: vector.x / mag, y: vector.y / mag}
  }
}

export function dotProduct(vectorA, vectorB) {
  // returns scalar value
  // negative value: a points opposite b,
  // positive value: a and b point in same direction
  // zero: a and b are perpendicular
  return vectorA.x * vectorB.x + vectorA.y * vectorB.y
}

export function projection(vectorA, vectorB) {
  let projectionX = dotProduct(vectorA, normalize(vectorB)) * vectorB.x,
      projectionY = dotProduct(vectorA, normalize(vectorB)) * vectorB.y
  return {x: projectionX, y: projectionY}
}

export function getNormals(vector) {
  let leftNormal = {x: vector.y, y: -vector.x},
      rightNormal = {x: -vector.y, y: vector.x}
  return {left: leftNormal, right: rightNormal}
}

// Calculates which Voronoi region a point is on a line segment
// Left is negative, Right is positive, Middle is Zero
export function voronoiRegion (line, point) {
    let magSquared = mag2(line),
        dp = dotProduct(point, line)

    if (dp < 0) { return -1 }
    else if (dp > magSquared) { return 1 }
    else { return 0 }
}

export function testPolygonCircle(polygon, circle) {
  
  let circlePos = copy(circle.pos),
      radius = circle.size,
      circumference = radius * radius,
      points = polygon.points,
      length = points.length,
      edge = {x: 0, y: 0},
      point = {x: 0, y: 0},
      i = 0,
      collision = true

  while(collision && i < length) {
    
    let next = (i === length - 1) ? 0 : i + 1,
        prev = (i === 0) ? length - 1 : i - 1
    
    edge = copy(polygon.edges[i])
    // Calculate the center of the circle relative to the starting point of the edge
    point = sub(copy(circlePos), points[i])
    
    if (mag2(point) < circumference) {
        collision = false
        console.log('first check', collision, i, edge)
    } else {
      // Calculate which Voronoi region the center of the circle is in
      let region = voronoiRegion(edge, point)
      if (region === -1) {

        // Need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
        edge = copy(polygon.edges[prev])

        // Calculate the center of the circle relative the starting point of the previous edge
        let point2 = sub(copy(circlePos), points[prev])

        region = voronoiRegion(edge, point2)
        if (region === 1) {
          // It's in the region we want. Check if the circle intersects the point
          let dist = magnitude(point)
          if (dist > radius) {
              collision = false
              console.log('second check', collision, i, edge)
          }
        }
      } else if (region === 1) {

        edge = copy(polygon.edges[next]) // note: next

        point = sub(copy(circlePos), points[next])

        region = voronoiRegion(edge, point)

        if (region === -1) {

          let dist = magnitude(point)
          if (dist > radius) {
              collision = false;
              console.log('third check', collision, i, edge)
          }
        }
      } else {
        // Need to check if the circle is intersecting the edge,
        // Change the edge into its "edge normal".
        let normal = normalize(getNormals(edge).right),

        // Find the perpendicular distance between the center of the 
        // circle and the edge.
           dist = dotProduct(point, normal),
           distAbs = Math.abs(dist)

        // If the circle is on the outside of the edge, there is no intersection
        if (dist > 0 && distAbs > radius) {
            collision = false
            console.log('fourth check', collision, i, edge)
        }
      }
    }
    
    i += 1
  }
  
  return collision
}




















