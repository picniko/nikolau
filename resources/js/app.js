window._ = require("lodash");
window.axios = require("axios");
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.Vue = require("vue").default;

import App from "./App.vue";
import router from "./routes";
import store from "./store";
import VueTailwind from "vue-tailwind";
import TPagination from "vue-tailwind/dist/t-pagination";
import TTable from "vue-tailwind/dist/t-table";

const settings = {
    "t-pagination": {
        component: TPagination
    },
    "t-table": {
        component: TTable
    }
};

Vue.use(VueTailwind, settings);

new Vue({
    el: "#app",
    store,
    router,
    render: h => h(App)
});
