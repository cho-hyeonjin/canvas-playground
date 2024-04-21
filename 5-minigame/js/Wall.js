import App from "./App.js";

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
  }

  update() {}

  draw() {
    App.ctx.drawImage(
      this.img,
      // SMALL 사이즈
      this.sx, // sx
      0, // sy
      this.img.width * this.sizeX, // sw
      this.img.height, // sh
      // BIG 사이즈
      0,
      0,
      this.width,
      this.height
    );
  }
}
