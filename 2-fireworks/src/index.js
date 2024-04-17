import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";

class Canvas extends CanvasOption {
  constructor() {
    super();
    /** Particle 인스턴스 담을 배열 (인스턴스 속성) */
    this.particles = [];
  }
  init() {
    /** canvas size (2개의 옵션 - CSS, <canvas>'s width, height) 조절 */
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr; // dpr = device pixel ratio → css : 1px = device : Npx
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr); // ctx = canvas get context

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";

    /** particle 생성 */
    this.createParticles();
  }

  /** Particle 생성 함수 정의 */
  createParticles() {
    const PARTICLE_NUM = 1;
    for (let i = 0; i < PARTICLE_NUM; i++) {
      const x = 300;
      const y = 300;
      this.particles.push(new Particle(x, y));
    }
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;

      if (delta < this.interval) return;
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      /** Particle class 내장 함수로 particle 생성 */
      this.particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      then = now - (delta % this.interval);
    };
    /** initial execute */
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});

window.addEventListener("resize", () => {
  canvas.init();
});
