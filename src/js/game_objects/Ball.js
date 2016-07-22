export default class Ball {
  
  constructor({ size, pos, speed }) {
    this.size = size;
    this.pos = pos;
    this.speed = speed;
  }
  
  launch(court) {
    let flip = () => Math.floor(Math.random() * 3);

    if (this.speed.vel.x === 0 && this.speed.vel.y === 0
     && this.pos.x === court.w/2 && this.pos.y === court.h/2) {
      this.speed.vel.x -= this.speed.acc
      switch(flip()) {
        case 0: this.speed.vel.y += this.speed.acc; break
        case 1: this.speed.vel.y -= this.speed.acc; break
        case 2: this.speed.vel.y = 0; break
      }
    } else {
      this.speed.vel.x = 0
      this.speed.vel.y = 0
      this.pos.x = court.w/2
      this.pos.y = court.h/2
    }
  }
  
  move() {
    this.pos.y += this.speed.vel.y
    this.pos.x += this.speed.vel.x
  }
  
  handleEdge(court) {
    let { x, y } = this.pos,
        {w: courtW, h: courtH} = court

    if (y > (courtH - this.size)) {
      this.pos.y = courtH - this.size - 2
    } else if (y < 0) {
      this.pos.y = 2
    }
    if ((y > (courtH - this.size)) || (y < 0 + this.size)) {
      this.speed.vel.y *= -1
    }
    if (x < 0 - this.size * 10) {
      this.speed.vel.x = 0
      this.speed.vel.y = 0
      this.pos.x = court.w/2
      this.pos.y = court.h/2
    }
  }
  
  handleCollision(collision, paddleSpin) {
    if (collision) {
      this.speed.vel.y = paddleSpin
      this.speed.vel.x *= -1
    }
  }
  
  display(context) {
    context.strokeStyle = "black"
    context.beginPath()
    context.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2)
    context.stroke()
  }
}