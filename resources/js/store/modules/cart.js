export default {
    namespaced: true,

    state: {
        cartProducts: []
    },

    actions: {
        getCartProducts({ commit }) {
            return axios.get("/api/orders/cart").then(({ data }) => {
                commit("setCartProducts", data);
            });
        },
        addToCart({ commit }, payload) {
            const method = payload.quantity > 0 ? "add-item" : "remove-item";
            return axios
                .post("/api/orders/" + method, payload)
                .then(({ data }) => {
                    if (data.pivot.quantity == 0) {
                        commit("deleteCartProduct", data.id);
                    } else {
                        commit("setCartProduct", data);
                    }
                })
                .catch(error => {
                    return error;
                });
        },
        finishOrder({ commit }) {
            axios.get("/api/orders/finish").then(() => {
                commit("clearCartProducts");
            });
        },
        clearCart({ commit }) {
            commit("clearCartProducts");
        }
    },

    mutations: {
        setCartProducts(state, products) {
            state.cartProducts = products;
        },
        setCartProduct(state, product) {
            let a = state.cartProducts.filter(p => p.id === product.id);
            a.length < 1
                ? state.cartProducts.push(product)
                : (state.cartProducts = state.cartProducts.map(x =>
                      x.id === product.id ? product : x
                  ));
        },
        deleteCartProduct(state, product) {
            state.cartProducts = state.cartProducts.filter(
                x => x.id !== product
            );
        },
        clearCartProducts(state) {
            state.cartProducts = [];
        }
    },

    getters: {
        cartProductsQuantity(state) {
            return state.cartProducts.reduce((sum, cartProduct) => {
                return (sum += cartProduct.pivot.quantity);
            }, 0);
        }
    }
};
