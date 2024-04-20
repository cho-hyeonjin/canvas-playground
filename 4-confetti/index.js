const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio > 1 ? 2 : 1; // 이렇게 설정한 이유: 🚀성능 --- canvas를 무조건 확대시키고 scale 하게 되면 dpr이 3 || 4인 경우 성능이 나빠진다. dpr이 2인 기기에서의 선명함으로도 충분하기 때문에 성능상 그 이상을 설정할 필요는 없어 보임
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000 / 60;

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
}

function render() {
  let now, delta;
  let then = Date.now();

  /** confetti fragment option */
  const x = canvas.width / 2;
  let y = canvas.height / 2;
  let widthAlpha = 0;
  const width = 50;
  const height = 50;
  let deg = 0.1;

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    widthAlpha += 0.1;
    deg += 0.1;
    y += 1;

    /** 1frame당 ctx 중심 x,y로 옮겨가서 (설정해둔 rotate 단위값) 만큼 ctx 회전시키고, ctx 중심 다시 원위치 (ctx.rotate값은 매frame마다 ++, 초기화 X BUT translate값은 매번 초기화 후 재설정하기 때문에 매 frame마다 x, y값) */
    ctx.translate(x + width, y + height);
    ctx.rotate(deg);
    ctx.translate(-x - width, -y - height);

    ctx.fillStyle = "yellow";
    ctx.fillRect(
      x,
      y,
      width * Math.cos(widthAlpha), // cos과 sin 그래프 모두 2π(360도) 주기를 가지며, -1~1 범위 내에서 반복된다.
      height * Math.sin(widthAlpha) // 그래서 이렇게 width와 height 값에 sig과 cos값을 곱해주기만 해도 좌우, 상하로 팔랑이는 도형을 만들 수 있다.
      // width,
      // height
    );

    /** 그리기 끝난 후 rotate값도 원상복구 */
    ctx.resetTransform();

    then = now - (delta % interval);
  };
  requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", () => init);
