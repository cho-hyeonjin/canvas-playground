import { hexToRgb, randomNumBetween } from "./utils.js";

export default class Particle {
  constructor(x, y, deg = 0, colors) {
    this.angle = (Math.PI / 180) * randomNumBetween(deg - 30, deg + 30);
    this.radius = randomNumBetween(30, 100); // confetti fragment마다 받는 힘 랜덤하게 설정해서 더 자연스럽게
    this.x = x * innerWidth;
    this.y = y * innerHeight;

    this.vx = this.radius * Math.cos(this.angle);
    this.vy = this.radius * Math.sin(this.angle);

    this.friction = 0.89;
    this.gravity = 0.5;

    this.width = 12;
    this.height = 12;

    // 🚀
    this.opacity = 1;

    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);

    this.rotation = randomNumBetween(0, 360);
    this.rotationDelta = randomNumBetween(-1, 1);

    this.colors = colors || ["#A374DB"];
    this.color = hexToRgb(
      this.colors[Math.floor(randomNumBetween(0, this.colors.length - 1))]
    );
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

    this.rotation += this.rotationDelta;
  }
  draw(ctx) {
    ctx.translate(this.x + this.width * 2, this.y + this.height * 2);
    ctx.rotate((Math.PI / 180) * this.rotation);
    ctx.translate(-this.x - this.width, -this.y - this.height);

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta)
    );

    ctx.resetTransform();
  }
}
