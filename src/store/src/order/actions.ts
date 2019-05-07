import { order } from '../mutationType';
import orderApi from '@/api/src/orderList/orderlist';
import { getPureResponseData } from '@/utils';


export default {
  updateOrderStatus({ commit }) {
    const data = {
      allOrder: '',
      waitPay: '',
      waitTrain: '',
      waitReceipt: '',
      waitComment: ''
    };
    let all = orderApi.queryOrder({paged: 9999,pageSize: 15,orderStatus: ''}).then(res => {
      data.allOrder = res.total;
    });
    let waitPay = orderApi.queryOrder({paged: 9999,pageSize: 15,orderStatus: 'OA01'}).then(res => {
      data.waitPay = res.total;
    });
    let waitTrain = orderApi.queryOrder({paged: 9999,pageSize: 15,orderStatus: 'OA02'}).then(res => {
      data.waitTrain = res.total;
    });
    let waitReceipt = orderApi.queryOrder({paged: 9999,pageSize: 15,orderStatus: 'OA03'}).then(res => {
      data.waitReceipt = res.total;
    });
    let waitComment = orderApi.queryOrder({paged: 9999,pageSize: 15,orderStatus: 'OA04'}).then(res => {
      data.waitComment = res.total;
    });
    Promise.all([all,waitPay,waitTrain,waitReceipt,waitComment])
    .then(res => {
      commit(order.updateOrderStatus, data);
    }).catch(e => {
      commit(order.updateOrderStatus, {});
    });
  }
};
