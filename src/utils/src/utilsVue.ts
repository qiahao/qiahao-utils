/*
* @Author: qiahao
* @Date:  2020-01-14 17:22
* @Last Modified by: qiahao
* @Last Modified time: 2020-01-14
*/


function getInstaller(type: 'component' | 'filter' | 'directive', option: any) {
   return {
    installed: false,
    install(Vue: any) {
      if (this.installed) { return; }
      for (const key in option) {
        if (option.hasOwnProperty(key)) {
          Vue[type](key, option[key]);
        }
      }
      this.installed = true;
    }
  };
}

export {
  getInstaller
};