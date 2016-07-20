export default class Paddle {
  
  constructor({ team, size, pos, speed, friction }) {
    this.team = team
    this.pos = pos
    this.size = size
    this.speed = speed
    this.friction = friction
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