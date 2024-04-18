import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "./utils.js";

export default class Tail extends CanvasOption {
  constructor(x, vy, color) {
    super();
    this.x = x;
    this.y = this.canvasHeight;
    this.vy = vy;
    this.color = color;
    this.angle = randomNumBetween(0, 2);

    /** 중력 - 위로 올라갈수록(requestAnimation 실행 횟수 늘어날수록) 작아지게 */
    /** 마찰력 - 위로 올라갈수록 마찰력 커지게 해서 화면 밖으로 나가기 전에 멈추게 */
    this.friction = 0.985;
  }

  update() {
    this.vy *= this.friction;
    this.y += this.vy;

    /** 꼬리 상승 시 움직임 자연스럽게 (일직선은 부자연스러움) */
    this.angle += 1;
    this.x += Math.cos(this.angle) * this.vy * 0.2;

    /** 꼬리가 상승함에 따라 옅어지다 없어지게 */
    this.opacity = -this.vy * 0.1;
  }
  draw() {
    this.ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`; // Particle과 색상값을 공유해야 하므로, Particle에서 draw에 사용된 color값 형식과 통일시켜준다.
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
