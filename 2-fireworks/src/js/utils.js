/** 랜덤 숫자 생성 유틸 */
export const randomNumBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};
