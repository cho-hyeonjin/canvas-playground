import CanvasOption from "./CanvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  /** 앞으로 Particle 다룰 때 항상 기본적으로 사용해야하는 메서드 정의하기 */
  /** Particle 클래스 내장 메서드 1 - update 메서드 */
  update() {
    this.y += 1;
  }

  /** Particle 클래스 내장 메서드 2 - draw 메서드 */
  draw() {
    this.ctx.fillStyle = "#f0f0f0";
    this.ctx.beginPath(); // canvas 2D context야~ 나 선 그린다~
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath(); // 헤이 canvas 2D context~ 다 그렸다~
  }
}
