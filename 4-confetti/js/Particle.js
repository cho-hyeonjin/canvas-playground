import { randomNumBetween } from "./utils.js";

export default class Particle {
  constructor(x, y) {
    this.angle = (Math.PI / 180) * randomNumBetween(0, 360);
    this.radius = 3;
    this.x = x;
    this.y = y;

    this.vx = this.radius * Math.cos(this.angle);
    this.vy = this.radius * Math.sin(this.angle);

    this.width = 30;
    this.height = 30;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
