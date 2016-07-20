export default class Paddle {
  
  constructor({ team, size, pos, speed }) {
    this.team = team
    this.pos = pos
    this.size = size
    this.speed = speed
  }
  
  handleEdge(court) {
    let { y } = this.pos,
        {w: courtW, h: courtH} = court

    if (y > (courtH - this.size.h)) {
      this.pos.y = courtH - this.size.h - 2;
    } else if (y < 0) {
      this.pos.y = 2;
    }
    if ((y > (courtH - this.size.h)) || (y < 0)) {
      this.vel *= -0.7;
    }
  }
  
  display(context) {
    context.strokeStyle = "black"
    context.strokeRect(this.pos.x, this.pos.y, this.size.w, this.size.h)
  }
}