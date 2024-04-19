import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

const interval = 1000 / 60;

const particles = [];

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
}

function createRing() {
  const PARTICLE_NUM = 100;
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles.push(new Particle());
  }
}

function render() {
  let now, delta;
  let then = Date.now();

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // particles.forEach((particle, index) => {
    //   particle.update();
    //   particle.draw(ctx);

    //   /** 🚀 CPU 연산 성능 개선을 위한 🛡️ 방어코드 Ver.1 - Side Effect (splice 메서드의 원본 배열 변경 특성으로 인해) 발생하는 코드 */
    //   if (particle.opacity < 0) {
    //     particles.splice(index, 1);
    //     // spice는 원본 변경 메서드이기 때문에 opacity가 0보다 작아진 particle을 particles 배열에서 삭제하고 나면 원본 배열에 변경이 발생한다.
    //     // 때문에 다음 인덱스의 particle이 제거된 particle의 위치로 이동이 되면서 해당 index의 particle을 건너뛰게 되는 현상 발생 --- 의도치 않은 side effct!
    //   }
    // });

    /** 🚀 CPU 연산 성능 개선을 위한 🛡️ 방어코드 Ver.2 - Fix the Side Effect!  --- forEach 대신 for문 사용, [array.length - 1]에 해당하는 인덱스부터 1씩 줄이면서 뒤에서부터 앞으로 순회 */
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);

      if (particles[i].opacity < 0) particles.splice(i, 1);
    }

    then = now - (delta % interval);
  };

  requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", init);

window.addEventListener("click", () => {
  const texts = document.querySelectorAll("span");

  const countDownOption = {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: "Power4.easeOut",
  };

  gsap.fromTo(texts[0], { opacity: 0, sacle: 5 }, { ...countDownOption });
  gsap.fromTo(
    texts[1],
    { opacity: 0, sacle: 5 },
    {
      ...countDownOption,
      delay: 1,
      onStart: () => (texts[0].style.opacity = 0),
    }
  );
  gsap.fromTo(
    texts[2],
    { opacity: 0, sacle: 5 },
    {
      ...countDownOption,
      delay: 2,
      onStart: () => (texts[1].style.opacity = 0),
    }
  );

  const ringImg = document.querySelector("#ring");
  gsap.fromTo(
    ringImg,
    { opacity: 1 },
    {
      opacity: 0,
      duration: 1,
      delay: 3,
      onStart: () => {
        createRing();
        texts[2].style.opacity = 0;
      },
    }
  );
});
