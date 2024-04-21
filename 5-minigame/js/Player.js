import App from "./App.js";
import BoundingBox from "./BoundingBox.js";

export default class Player {
  constructor() {
    this.img = document.querySelector("#bird-img");
    this.x = App.width * 0.1;
    this.y = App.height * 0.5;
    this.width = 130;
    this.height = this.width * (96 / 140);

    this.boundingBox = new BoundingBox(
      this.x + 10,
      this.y + 16,
      this.width - 20,
      this.height - 20
    );

    this.counter = 0;
    this.frameX = 0;

    this.vy = -10;
    this.gravity = 0.2;
    App.canvas.addEventListener("click", () => {
      this.vy += -5;
    });
  }

  update() {
    // this.frameX += 1;
    // if(this.frameX === 15) this.frameX = 0

    this.counter += 1;
    if (this.counter % 2 === 0) {
      this.frameX = ++this.frameX % 15;
    }
    this.vy += this.gravity;
    this.y += this.vy;
    this.boundingBox.y = this.y + 16;
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      (this.img.width / 15) * this.frameX,
      0,
      this.img.width / 15, // 총 15개니까
      this.img.height, // 한줄짜리 sprite 이미지니까
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.boundingBox.draw();
  }
}
