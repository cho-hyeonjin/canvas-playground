const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
// 💡 canvas의 size를 다루는 방식은 2가지인데, 이 2가지를 함께 다뤄줘야 한다.
//   1. css에서 canvas 선택자로 조절하는 방식
//   2. canvas 객체에 내장된 canvas.width와 canvas.height 속성값을 조절하는 방식. (default: 300px, 150px)

/** Device Pixels Ratio - 하나의 css pixel을 그릴 때 사용되는 기기의 픽셀 수 - 높을수록 선명 */
const dpr = window.devicePixelRatio;

// 💡 ∴ canvas 작업을 할 때에는 stylesheet의 canavas property의 size 속성값과 canvas의 size를 동일하게 일치시켜주도록 하자!
const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

/** style(css)로 canvas 사이즈 변경하기 */
canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

/** canvas의 자체 속성 canvas.width와 canvas.heitght로 canvas 사이즈 변경하기 */
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

/** 원 그리기 - 각도는 degree가 아닌 radian */

/** 채워진 원 */
// ctx.beginPath(); // 그리기 시작
// ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360);
// ctx.fillStyle = "blue";
// ctx.fill(); // 채워진 원 / 반원 그릴 때
// ctx.closePath(); // 그리기 끝

// /** 안채워진 원 */
// ctx.beginPath();
// // ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360); // 원
// ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 180); // 반원(호)
// ctx.stroke();
// ctx.closePath(); // 그리기 끝

/** 도형 움직이기 - 애니메이션 (using RequestAnimaition을 이용하여 매 프레임마다 우리가 만든 도형의 위치가 변하는 함수 호출하기)  */
/** Particle 클래스 정의 - 여러 개의 Particle을 만들 수 있도록 */
class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 180 * 360);
    ctx.fillStyle = "#0b6623";
    ctx.fill();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

let interval = 1000 / 60; // 목표 interval 시간 설정 → 1s === 1000ms, 60fps === 60 frame/s
let now, delta;
let then = Date.now();

/** 애니메이션 함수 정의 */
function animate() {
  window.requestAnimationFrame(animate); // 매 프레임마다 실행되는 함수이지만, 컴퓨터 사양에 따라 초당 프레임 횟수(fps)가 달라진다. 일반 컴퓨터의 경우 주사율이 60hz이고, 초당 60프레임이 실행되지만, 게이밍 노트북과 같이 그래픽 성능이 좋은 컴퓨터의 경우 주사율이 높아 초당 144프레임 이상이 렌더링 될 수도 있다. ∴ 기기(환경)에 따라 이 함수가 호출되는 횟수가 달라지게 된다. ∴ 컴퓨터 사양과 관계 없이 동일한 fps를 설정해주어야 한다.
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 이전 도형이 지워지고

  // particle.y를 1씩 증가시켜서 다시 그리기.
  particle.y += 1;
  particle.draw();

  then = now - (delta % interval);
}

/** 애니메이션 함수 실행 */
animate();
