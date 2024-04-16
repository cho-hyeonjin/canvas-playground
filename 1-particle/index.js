const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
console.log(ctx.canvas);

// 💡 ∴ canvas 작업을 할 때에는 stylesheet의 canavas property의 size 속성값과 canvas의 size를 동일하게 일치시켜주도록 하자!
const canvasWidth = 300;
const canvasHeight = 300;

/** style(css)로 canvas 사이즈 변경하기 */
// canvas.style.width =  + "px";
// canvas.style.height = 300 + "px"; // canvas의 기본값음 150인데 css로 300으로 변경됨
canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

/** canvas의 자체 속성 canvas.width와 canvas.heitght로 canvas 사이즈 변경하기 */
// canvas.width = 300;
// canvas.height = 300; // 이 작업 안 해주면 아래 ctx.fillRect로 만든 사각형이 세로로 긴 직사각형이 됨. (style(css)로 height를 늘려줬으니까)
canvas.width = canvasWidth;
canvas.height = canvasHeight;

/** canvas의 사이즈가 css로 지정한 canvas의 사이즈보다 작을 때 - ctx.fillRect로 만든 사각형의 화질이 떨어지게 됨. (canvas의 크기가 100, 100인데 style에서 설정한 canvas는 300, 300이니까 300에 맞춰서 1픽셀의 크기가 넓어진 것!) */
// canvas.width = 100;
// canvas.height = 100;

ctx.fillRect(10, 10, 50, 50);
// 💡 canvas의 size를 다루는 방식은 2가지인데, 이 2가지 방식을 함께 다뤄줘야 한다.
//   1. css값을 직접 추정해서 canvas size를 조절하는 방식
//   2. canvas 자체 속성인 canvas.width와 canvas.height를 조절하는 방식. (default: 300px, 150px)
