import CanvasOption from "./CanvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy, opacity, colorDeg) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.opacity = opacity; // 랜덤으로 생성한 opacity값을 prop으로 받아서 불꽃마다 사라지는 시간 다르게 설정
    /** 중력가속도 */
    this.gravity = 0.12;
    /** 마찰력 */
    this.friction = 0.93;

    /** Tail과 같은 색상 */
    this.colorDeg = colorDeg;
  }

  /** 앞으로 Particle 다룰 때 항상 기본적으로 사용해야하는 메서드 정의하기 */
  /** Particle 클래스 내장 메서드 1 - update 메서드 */
  update() {
    this.vy += this.gravity; // gravity ++

    this.vx *= this.friction; // 마찰력이 점진적으로 감소하여 0에 수렴
    this.vy *= this.friction;

    this.x += this.vx; // x velocity ++
    this.y += this.vy; // y velocity ++

    /** 🚀 성능 개선 - update 될 때마다 opacity를 감소시키다가 opacity가 0이 되면 particle이 사라지도록 하기 위한 설정 */
    // 기존 코드에서는 particle이 화면 밖으로 나가도 계속 update 연산이 이뤄지기 때문에 불필요한 CPU 연산 지속, 성능 저하
    // 이를 개선하기 위한 방어코드 작성 - opacity를 이용하여 opacity 수치가 0이 되면 update 함수 실행 종료 코드를 추가할 것임!
    this.opacity -= 0.02;
  }

  /** Particle 클래스 내장 메서드 2 - draw 메서드 */
  draw() {
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity})`;
    this.ctx.beginPath(); // canvas 2D context야~ 나 선 그린다~
    this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath(); // 헤이 canvas 2D context~ 다 그렸다~
  }
}
