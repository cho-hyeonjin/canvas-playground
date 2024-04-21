import App from "./App.js";

export default class Background {
  constructor() {
    this.img = document.querySelector("#bg1-img");
    this.height = App.height;
    this.width = App.height * (this.img.width / this.img.height);
    this.pos = { x: 0, y: 0 };
  }

  update() {
    this.pos.x -= 20;
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }
}
