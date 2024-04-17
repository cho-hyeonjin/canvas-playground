import CanvasOption from "./js/CanvasOption.js";

class Canvas extends CanvasOption {
  constructor() {
    super();
  }
  init() {
    /** canvas size (2개의 옵션 조절) */
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr; // dpr = device pixel ratio → css : 1px = device : Npx
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr); // ctx = canvas get context

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;

      if (delta < this.interval) return;

      this.ctx.fillRect(100, 100, 200, 200);

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
