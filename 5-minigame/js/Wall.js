import App from "./App.js";
import { randomNumBetween } from "./util.js";

export default class Wall {
  constructor(config) {
    this.img = document.querySelector("#wall-img");
    this.type = config.type; // "BIG", "SMALL"
    switch (this.type) {
      case "BIG":
        this.sizeX = 18 / 30;
        this.sx = this.img.width * (9 / 30);
        break;
      case "SMALL":
        this.sizeX = 9 / 30;
        this.sx = this.img.width * (0 / 30);
        break;
    }
    this.width = App.height * this.sizeX;
    this.height = App.height;
    this.gapY = randomNumBetween(App.height * 0.15, App.height * 0.35);
    this.x = App.width;
    // -this.height
    // App.height - this.gapY - this.height
    this.y1 = -this.height + randomNumBetween(30, App.height - this.gapY - 30);
    this.y2 = this.y1 + this.height + this.gapY;
  }

  get isOutside() {
    return this.x + this.width < 0;
  }

  update() {
    this.x += -6;
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      // SMALL 사이즈
      this.sx, // sx
      0, // sy
      this.img.width * this.sizeX, // sw
      this.img.height, // sh
      // BIG 사이즈
      this.x,
      this.y1,
      this.width,
      this.height
    );
    App.ctx.drawImage(
      this.img,
      // SMALL 사이즈
      this.sx, // sx
      0, // sy
      this.img.width * this.sizeX, // sw
      this.img.height, // sh
      // BIG 사이즈
      this.x,
      this.y2,
      this.width,
      this.height
    );
  }
}
