export default {
    namespaced: true,

    state: {
        products: {},
        showModalCreateProduct: false
    },

    actions: {
        all({ commit }, payload) {
            const r_page = payload.page ?? 1;
            return axios
                .get("/api/admin/products", {
                    params: { page: r_page }
                })
                .then(({ data }) => {
                    commit("setProducts", data);
                });
        },
        showModalComponent({ commit }, payload) {
            commit("showModal", payload);
        },
        saveProduct({ commit }, payload) {
            return axios
                .post("/api/admin/products", payload)
                .then(({ data }) => {
                    commit("setProduct", data.data);
                    commit("showModal", false);
                })
                .catch(errors => {
                    return errors.response.data.errors;
                });
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        setProduct(state, product) {
            let check = Array.from(state.products.data);
            if (check.reverse()[0].id + 1 === product.id) {
                state.products.data.push(product);
            }
        },
        showModal(state, bool) {
            state.showModalCreateProduct = bool;
        }
    },

    getters: {}
};
