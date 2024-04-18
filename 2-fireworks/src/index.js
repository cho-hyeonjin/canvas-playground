import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";
import Tail from "./js/Tail.js";
import Spark from "./js/Spark.js";
import { hypotenuse, randomNumBetween } from "./js/utils.js";

class Canvas extends CanvasOption {
  constructor() {
    super();

    /** Tail 인스턴스 (불꽃 꼬리) 담을 배열 생성 */
    this.tails = [];
    /** Particle 인스턴스 담을 배열 (인스턴스 속성) */
    this.particles = [];
    /** Spark 인스턴스 담을 배열 */
    this.sparks = [];
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

  /** Tail 생성 함수 정의 */
  createTail() {
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8); // canvasWidth의 20% 지점부터 80% 지점까지로 설정 (그 이상 범위가 되면 꼬리가 잘려서 안 보이게 될 수 있기 떄문)
    const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1; //임시값
    const colorDeg = randomNumBetween(0, 360); // Random 컬러 생성에 적합한 hsl 형식으로 변경 - Particle과 색상값을 공유해야 하므로, Particle에서 draw에 사용된 color값 형식과 통일시켜준다.
    this.tails.push(new Tail(x, vy, colorDeg));
  }

  /** Particle 생성 함수 정의 */
  createParticles(x, y, colorDeg) {
    const PARTICLE_NUM = 400;
    for (let i = 0; i < PARTICLE_NUM; i++) {
      // randomNumBetween의 파라미터로 (고정된 x좌표값, 고정된 y좌표값)이 아닌
      // (𝛳각도에 따라 변동되는 x좌표값, 𝛳 각도에 따라 변동되는 y좌표값)을 넣어준다!
      // 𝛳각도는 360도를 호도법(radian)으로 표현한다.
      const r =
        randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001; // 화면 크기를 기준으로 랜덤하게 설정되는 r값
      const angle = (Math.PI / 180) * randomNumBetween(0, 360); // 𝛳각도 호도법 표현
      const vx = r * Math.cos(angle); // x좌표값 = cos𝛳 * r
      const vy = r * Math.sin(angle); // y좌표값 = sin𝛳 * r
      const opacity = randomNumBetween(0.6, 0.9); // opcity값 랜덤하게 생성
      const _colorDeg = randomNumBetween(-20, 20) + colorDeg;
      this.particles.push(new Particle(x, y, vx, vy, opacity, _colorDeg));
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
      this.ctx.fillStyle = this.bgColor + "40"; // # 00000040 - alpha값 조절, 검정색이 되기까지 잔상이 남는 듯 보여지게 됨. 리얼함을 위해 잔상효과 반영
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      /** Tail 생성 함수 실행 - Tail 생성 */
      // this.createTail();
      /** Tail 생성 함수 실행 - 랜덤하게 설정된 주기로 Tail 생성 (requestAnimationFrame은 매 프레임마다 실행되는 함수이고, 기기별 FPS에 따라 초당 60번 이상 실행되는 것이 보통이기 때문에 매 프레임마다 꼬리가 생성되면 폭죽 쏘아올리는 느낌이 아니라 위로 흐르는 빛 스트림처럼 보이게 되기 때문) */
      if (Math.random() < 0.03) this.createTail();

      this.tails.forEach((tail, index) => {
        /** 생성된 Tail 정보 update */
        tail.update();
        /** 생성된 Tail 정보로 Tail 그리기 */
        tail.draw();

        /** 꼬리가 draw될 때마다(frame이 이동될 때마다) Spark 생성 */
        for (let i = 0; i < Math.round(-tail.vy * 0.5); i++) {
          const vx = randomNumBetween(-5, 5) * 0.05;
          const vy = randomNumBetween(-5, 5) * 0.05;
          const opacity = Math.min(-tail.vy, 0.5);
          this.sparks.push(
            new Spark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg)
          );
        }

        /** 꼬리의 속도가 0이 되었을 즈음 Tail 삭제 && 해당 위치에서 Particle 생성  - Tail이 마찰력에 의해 멈춰지는 부근에 다다랐을때, 해당 위치에서 폭죽이 터지게(Particle 생성되게)끔 */
        if (tail.vy > -0.7) {
          //  vy가 음수값에서 시작해서 점진적으로 0에 수렴하게 되는데, update 시 감소되는 vy의 opacity 값과 싱크를 맞추기 위한 범위 설정
          this.tails.splice(index, 1);
          this.createParticles(tail.x, tail.y, tail.colorDeg); // tail 마찰력이 1에 수렴하는 부분에서 particle이 생성되게끔 하기 위해 인자값으로 해당 위치 좌표값 전달, (시각적으로 Tail 색상과 Particle 색상이 동일해야 쏘아올린 폭죽이 터지는 것으로 인식될 것이므로) 컬러값도 전달
        }
      });

      /** Particle 생성 함수 실행 - Particle class 내장 함수로 particle 생성 */
      this.particles.forEach((particle, index) => {
        // 기존에는 particle들이 화면 밖으로 나가도 아래 두 메서드가 계속 호출됨 → 🐛 불필요한 CPU 연산으로 성능저하 야기
        /** 생성된 Particle 정보 update */
        particle.update();
        /** 생성된 Particle 정보로 Particle 그리기 */
        particle.draw();

        /** 🚀 성능 개선 - 매 프레임마다 400개씩 생성하니까 성능이 나빠짐. → 프레임마다 무조건 push하지 않고 0.1보다 작은 값이 생성된 경우에만 push하도록 🛡️방어코드 작성 */
        if (Math.random() < 0.1) {
          /** Spark 생성 */
          this.sparks.push(new Spark(particle.x, particle.y, 0, 0, 0.3, 45));
        }

        /** 🚀 성능 개선 - 🛡️ 불필요한 CPU 연산으로 인한 성능 저하 방어 코드 추가 */
        if (particle.opacity < 0) {
          this.particles.splice(index, 1);
        }
      });

      /** Spark 생성 함수 실행 */
      this.sparks.forEach((spark, index) => {
        /** 생성된 Spark 정보 update */
        spark.update();
        /** 생성된 Spark 정보로 Spark 그리기 */
        spark.draw();

        /** 🚀 성능 개선 - opacity가 0보다 작아지면 사라지게끔 */
        if (spark.opacity < 0) {
          this.sparks.splice(index, 1);
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
