import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
Vue.use(Vuex);

import auth from "./modules/auth";
import admin from "./modules/admin";
import cart from "./modules/cart";
import product from "./modules/product";
import order from "./modules/order";

export default new Vuex.Store({
    namespaced: true,
    modules: {
        admin,
        auth,
        product,
        order,
        cart
    }
});
