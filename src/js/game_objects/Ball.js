export default class Ball {
  
  constructor({ size, pos }) {
    this.size = size;
    this.pos = pos;
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
      this.vel *= -1;
    }
  }
  
  display(context) {
    context.strokeStyle = "black"
    context.beginPath()
    context.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2)
    context.stroke()
  }
}