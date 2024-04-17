/** 랜덤 숫자 생성 유틸 */
export const randomNumBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

/** window 빗변 길이 도출 유틸 */
export const hypotenuse = (x, y) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
