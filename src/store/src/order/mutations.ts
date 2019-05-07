import { order } from '../mutationType';

const mutations = {
  [order.updateOrderStatus](state, info) {
    state.orderStatus = info;
  }
};

export default mutations;