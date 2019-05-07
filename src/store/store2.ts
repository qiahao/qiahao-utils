/*
 * @Author: Lanck.xie
 * @Date: 2019-05-23 11:38:50
 * @Last Modified by: Lanck.xie
 * @Last Modified time: 2019-05-23 11:53:03
 */

import store from 'store2';

export default {
    /**
    * @desc: 通用命名空间获取一个新的store.
    */
    namespace: function (nm: string) { return store.namespace(nm); },

    /**
    * @desc: 数据条数.
    */
    size: function () { return store.size(); },

    /**
    * @desc: 所有的key.
    */
    keys: function () { return store.keys(); },

    /**
    * @desc: 设置信息.
    */
    set: function (key: string, data: any) { return store.set(key, data, true); },

    /**
    * @desc: 获取信息.
    * @param alt: 如果获取不到信息, 使用此数据返回.
    */
    get: function (key: string, alt: any = null) { return store.get(key, alt); },

    /**
    * @desc: 移除信息.
    */
    remove: function (key: any) { return store.remove(key); },

    /**
    * @desc: 清空.
    */
    clear: function () { return store.clear(); }
};

