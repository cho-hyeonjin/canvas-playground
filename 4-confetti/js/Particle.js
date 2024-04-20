import { randomNumBetween } from "./utils.js";

export default class Particle {
  constructor(x, y, deg = 0) {
    this.angle = (Math.PI / 180) * randomNumBetween(deg - 30, deg + 30);
    this.radius = randomNumBetween(30, 100); // confetti fragment마다 받는 힘 랜덤하게 설정해서 더 자연스럽게
    this.x = x;
    this.y = y;

    this.vx = this.radius * Math.cos(this.angle);
    this.vy = this.radius * Math.sin(this.angle);

    this.friction = 0.89;
    this.gravity = 0.5;

    this.width = 30;
    this.height = 30;

    // 🚀
    this.opacity = 1;

    this.widthDelta = 0;
    this.heightDelta = 0;
  }

  update() {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    // 🚀
    this.opacity -= 0.005;

    this.widthDelta += 2;
    this.heightDelta += 2;
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 0, ${this.opacity})`;
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta)
    );
  }
}
