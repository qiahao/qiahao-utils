import dialog from '@bpui/dialog';
/**
 * 全局使用的提示信息
 * @param {string} msg 提示信息
 * @param {?: object} option 配置信息
 */
export function alertToast(cfg: string | {
  content?: string,
  /** 持续时间 */
  durable?: number
}) {
  dialog.apiWidget.showToast(cfg);
}

/**
 * 全局使用的提示信息
 * @param {string} msg 提示信息
 */
export function alertConfirm(cfg: string | number | {
  title?: string,
  content: string,
  okText?: string,
  cancelText?: string,
  confirm?: () => any,
  cancel?: () => void,
}) {
  if (typeof cfg === 'string' || typeof cfg === 'number') {
    cfg = { content: cfg.toString() };
  }
  const { title, content, okText, cancelText, confirm, cancel } = cfg;
  return new Promise((resolve, reject) => {
    let config: any = {};
    config.title = !title && title !== null ? '提示' : title;
    config.content = content;
    config.okText = okText || '确认';
    config.cancelText = cancelText || '取消';
    config.confirm = function (id) {
      if (typeof confirm === 'function') {
        let r = confirm();
        if (r !== false) {
          dialog.apiWidget.hideConfirm(id);
          resolve(true);
        }
      } else {
        dialog.apiWidget.hideConfirm(id);
        resolve();
      }
    };
    config.cancel = function (id) {
      if (typeof cancel === 'function') {
        cancel();
      }
      reject();
      dialog.apiWidget.hideConfirm(id);
    };

    dialog.apiWidget.showConfirm(config);
  });
}

