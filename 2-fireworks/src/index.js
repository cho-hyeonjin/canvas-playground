import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";
import { randomNumBetween } from "./js/utils.js";

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
    const PARTICLE_NUM = 400;
    const x = randomNumBetween(0, this.canvasWidth);
    const y = randomNumBetween(0, this.canvasHeight);
    for (let i = 0; i < PARTICLE_NUM; i++) {
      // randomNumBetween의 파라미터로 (고정된 x좌표값, 고정된 y좌표값)이 아닌
      // (𝛳각도에 따라 변동되는 x좌표값, 𝛳 각도에 따라 변동되는 y좌표값)을 넣어준다!
      // 𝛳각도는 360도를 호도법(radian)으로 표현한다.
      const r = randomNumBetween(0, 3); // 임의로 정한 범위
      const angle = (randomNumBetween(0, 360) * Math.PI) / 180; // 𝛳각도 호도법 표현
      const vx = Math.cos(angle) * r; // x좌표값 = cos𝛳 * r
      const vy = Math.sin(angle) * r; // y좌표값 = sin𝛳 * r
      this.particles.push(new Particle(x, y, vx, vy));
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
      this.particles.forEach((particle, index) => {
        // 기존에는 particle들이 화면 밖으로 나가도 아래 두 메서드가 계속 호출됨 → 🐛 불필요한 CPU 연산으로 성능저하 야기
        particle.update();
        particle.draw();

        /** 🚀 성능 개선 - 🛡️ 불필요한 CPU 연산으로 인한 성능 저하 방어 코드 추가 */
        if (particle.opacity < 0) {
          this.particles.splice(index, 1);
        }
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
