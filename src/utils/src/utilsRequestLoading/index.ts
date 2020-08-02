// let uid = 0;
const SHOW_DELAY = 100; // 延迟显示，当请求很快完成时，不显示；
const MIN_SHOW_TIME = 100; // 最小显示时长，优化loading时间一闪而过的体验；
let count = 0; // loading计数
let startTime = 0; // 显示的开始时间, 如果大于0loading是显示的，等于0loading是关闭的；

function showLoading() {
  ++count;
  if (count === 1) {
    if (SHOW_DELAY > 0) {
      setTimeout(() => {
        if (count > 0) {
          _show();
        }
      }, SHOW_DELAY);
    } else {
      _show();
    }
  }
}

/**
 * @description 关闭
 * @param { boolean } hideAllLoading 是否删除所有的loading， 在切换路由时可能需要设置为true，如果业务需要的话
 */
function hideLoading(hideAllLoading: boolean = false) {
  if (hideAllLoading) {
    count = 0;
  } else {
    --count;
  }
  if (count < 0) {
    count = 0;
  }
  if (count === 0 && startTime > 0) {
    const nowTime = new Date().getTime();
    const hideDelay = MIN_SHOW_TIME - (nowTime - startTime);
    if (hideDelay > 0) {
      setTimeout(() => {
        if (startTime > 0) {
          _hide();
        }
      }, hideDelay);
    } else {
      _hide();
    }
  }
}

function _show() {
  // 记录loading显示开始时间
  startTime = new Date().getTime();
  // 这里显示loading，具体逻辑后面添加
  console.log('显示loading');
}

function _hide() {
  startTime = 0;
  // 这里隐藏loading，具体逻辑后面添加
  console.log('隐藏loading');
}

export {
  showLoading,
  hideLoading
};