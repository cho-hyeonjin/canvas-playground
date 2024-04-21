import App from "./App.js";

export default class Background {
  constructor() {
    this.img = document.querySelector("#bg2-img");
    this.height = App.height;
    this.width = App.height * (this.img.width / this.img.height);
    this.leftPos = { x: 0, y: 0 };
    this.rightPos = { x: this.width - 4, y: 0 }; // x에만 -4 해준 이유: bg2-img만 x길이가 짧아서 한 장이 끝나는 부분과 다음장이 이어지는 부분 사이에 공백이 생김.. 그거 메꿔주려고 -4했음
    this.speed = -10;
  }

  update() {
    /** 배경 그림 2장으로 계속 이어붙이는 식으로 무한 연장 */
    /** 그림의 시작점은 왼쪽상단, 그림의 길이는 그것에 + width --- 왼쪽 그림 끝날때 오른쪽에 그림 붙이기 */
    if (this.leftPos.x + this.width < 0) {
      this.leftPos.x = this.rightPos.x + this.width - 4; // 마찬가지로 bg2-img만 x길이가 짧아서
    }
    /** 그림의 시작점은 왼쪽상단, 그림의 길이는 그것에 + width --- 오른쪽 그림 끝날때 왼쪽에 그림 붙이기 */
    if (this.rightPos.x + this.width < 0) {
      this.rightPos.x = this.leftPos.x + this.width - 4;
    }

    this.leftPos.x += this.speed;
    this.rightPos.x += this.speed;
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      this.leftPos.x,
      this.leftPos.y,
      this.width,
      this.height
    );
    App.ctx.drawImage(
      this.img,
      this.rightPos.x,
      this.rightPos.y,
      this.width,
      this.height
    );
  }
}
