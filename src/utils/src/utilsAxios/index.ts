import axios from 'axios';
import { handleResponse, handleBlockError } from './requestHandle';
import { showLoading, hideLoading } from '../utilsRequestLoading/index';

const BASE_URL = '/';
const TIMEOUT = 20000;
const HEADERS = {};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: { ...HEADERS }
});

/**
 *
 * @param axiosConfig axios 请求的配置
 * @param options 接口的其他配置
 */
const request = function (axiosConfig) {
  const loading = axiosConfig.loading !== false; // 默认设置为true
  if (loading) { showLoading(); }
  try {
    // 添加认证等请求头信息

    return axiosInstance(axiosConfig).then(res => {
      // 接口正常返回
      // 这里将options单独提取出来，是为了扩展性，也可以不提取
      const options = { preHandler: axiosConfig.preHandler};
      if (loading) { hideLoading(); }
      return handleResponse(res, options);
    });
  } catch (e) {
    if (loading) { hideLoading(); }
    handleBlockError(e);
    return Promise.reject({ code: -1, msg: '请求出错，请稍后再试' });
  }
};

request.get = function (url, params: any, options?) {
  params = params || {};
  options = options || {};
  const _config = { url, ...options, params: params, method: 'get' };
  return request(_config);
};

request.delete = function (url, params: any, options?) {
  params = params || {};
  options = options || {};
  const _config = { url, ...options, params: params, method: 'delete' };
  return request(_config);
};

request.post = function (url, data: any, options?) {
  data = data || {};
  options = options || {};
  const _config = { url, ...options, data: data, method: 'post' };
  return request(_config);
};

request.put = function (url, data: any, options?) {
  data = data || {};
  options = options || {};
  const _config = { url, ...options, data: data, method: 'put' };
  return request(_config);
};

export default request;