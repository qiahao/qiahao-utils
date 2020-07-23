
/**
 * @description 获取设备宽度
 */
function getScreenWidth(): number {
  return document.documentElement.clientWidth;
}
/**
 * @description 获取设备高度
 */
function getScreenHeight(): number {
  return document.documentElement.clientHeight;
}


export {
  getScreenWidth,
  getScreenHeight
};