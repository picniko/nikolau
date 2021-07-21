export default {
    namespaced: true,

    state: {
        orders: []
    },

    actions: {
        all({ commit }) {
            return axios.get("/api/orders").then(({ data }) => {
                commit("setOrders", data);
            });
        },
        setGridAction({ commit }, payload) {
            commit("setGrid", payload);
        }
    },

    mutations: {
        setOrders(state, orders) {
            state.orders = orders;
        },
        setGrid(state, payload) {
            localStorage.grid = payload;
            state.grid = payload;
        }
    },

    getters: {
        openOrders(state) {
            return state.orders.filter(order => order.status === 0);
        },
        closedOrders(state) {
            return state.orders.filter(order => order.status === 1);
        }
    }
};
