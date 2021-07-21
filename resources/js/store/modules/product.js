export default {
    namespaced: true,

    state: {
        products: {
            data: []
        },
        loadProductsStatus: 0,
        grid: localStorage.grid ?? "cards",
        query: {
            page: 1,
            orderBy: "desc"
        }
    },

    actions: {
        all({ commit }, page) {
            commit("loadProductsStatus", 1);
            const r_page = page.page ?? 1;
            return axios
                .get("api/categories?category=" + page.category, {
                    params: { page: r_page }
                })
                .then(({ data }) => {
                    commit("loadProductsStatus", 0);
                    commit("setProducts", data);
                })
                .catch(() => {
                    commit("loadProductsStatus", 0);
                });
        },
        setGridAction({ commit }, payload) {
            commit("setGrid", payload);
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        setGrid(state, payload) {
            localStorage.grid = payload;
            state.grid = payload;
        },
        loadProductsStatus(state, status) {
            state.loadProductsStatus = status;
        }
    },

    getters: {}
};
