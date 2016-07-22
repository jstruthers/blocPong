import { copy, getNormals, normalize } from '../helper_functions/vectors'

export default class Paddle {
  
  constructor({ team, size, pos, speed, friction }) {
    this.team = team
    this.pos = pos
    this.size = size
    this.speed = speed
    this.friction = friction
    this.points =
      (() => {
        let {x, y} = this.pos,
            {w, h} = this.size
        return [
          {x, y},
          {x: x + w, y},
          {x: x + w, y: y + h},
          {x, y: y + h}
        ]
      })()
  }
  
  recalc() {
    let points = this.points,
        len = points.length
    this.edges = []
    this.normals = []
    for (var i = 0; i < len; i++) {
        let p1 = points[i],
            p2 = i < len - 1 ? points[i + 1] : points[0],
            edge = {x: p2.x - p1.x, y: p2.y - p1.y},
            normal = copy(edge)
        normal = getNormals(normal).right
        normal = normalize(normal)
        this.edges.push(edge)
        this.normals.push(normal)
    }
  }
  
  move() {
    if (this.speed.vel <= this.friction && this.speed.vel >= -this.friction) {
      this.speed.vel = 0;
    } else if (this.speed.vel >= 0.05) {
      this.speed.vel -= this.friction;
    } else if (this.speed.vel <= -0.05) {
      this.speed.vel += this.friction;
    }
    
    this.pos.y += this.speed.vel
  }
  
  handleEdge(court) {
    let { y } = this.pos,
        {w: courtW, h: courtH} = court

    if (y > (courtH - this.size.h)) {
      this.pos.y = courtH - this.size.h - 1;
    } else if (y < 0) {
      this.pos.y = 1;
    }

    if ((y > (courtH - this.size.h)) || (y < 0)) {
      this.speed.vel *= -0.5;
    }
  }
  
  display(context) {
    context.strokeStyle = "black"
    context.strokeRect(this.pos.x, this.pos.y, this.size.w, this.size.h)
  }
}