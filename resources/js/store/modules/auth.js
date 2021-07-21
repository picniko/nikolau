export default {
    namespaced: true,

    state: {
        user: null,
        loadUserStatus: 0,
        userOrders: [],
        showModalLoginComponent: false,
        showModalRegisterComponent: false
    },

    actions: {
        signIn({ commit, dispatch }, form) {
            return axios
                .post("/api/login", form)
                .then(({ data }) => {
                    commit("hideLoginComponent");
                    commit("setUser", data);
                    dispatch("cart/getCartProducts", "", { root: true });
                })
                .catch(error => {
                    return error;
                });
        },
        signUp({ commit, dispatch }, form) {
            return axios
                .post("/api/register", form)
                .then(({ data }) => {
                    commit("hideRegisterComponent");
                    commit("setUser", data);
                })
                .catch(errors => {
                    return errors.response.data.errors;
                });
        },
        getUser({ commit }) {
            commit("loadUserStatus", 1);
            return axios
                .get("/api/user")
                .then(({ data }) => {
                    commit("setUser", data);
                    commit("loadUserStatus", 0);
                    return true;
                })
                .catch(error => {
                    commit("clearUser");
                    commit("loadUserStatus", 0);
                    return false;
                });
        },
        logout({ commit }) {
            return axios
                .post("/api/logout")
                .then(() => {
                    commit("clearUser");
                    return true;
                })
                .catch(() => {
                    commit("clearUser");
                });
        },
        showLogin({ commit }, payload) {
            commit("clearUser");
            commit(payload ? "showLoginComponent" : "hideLoginComponent");
        },
        showRegister({ commit }, payload) {
            commit("clearUser");
            commit(payload ? "showRegisterComponent" : "hideRegisterComponent");
        }
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setUserProductQuantity(state, data) {
            const product = state.userProducts.find(product => {
                return product.id == data.id;
            });
            const idx = state.userProducts.indexOf(product);
            if (idx === -1) {
                state.userProducts.push(data);
            } else {
                state.userProducts[idx].pivot.quantity = data.pivot.quantity;
            }
        },
        deleteUserProduct(state, productId) {
            state.userProducts = state.userProducts.filter(product => {
                return product.id != productId;
            });
        },
        showLoginComponent(state) {
            state.showModalLoginComponent = true;
        },
        hideLoginComponent(state) {
            state.showModalLoginComponent = false;
        },
        showRegisterComponent(state) {
            state.showModalLoginComponent = false;
            state.showModalRegisterComponent = true;
        },
        hideRegisterComponent(state) {
            state.showModalRegisterComponent = false;
        },
        loadUserStatus(state, status) {
            state.loadUserStatus = status;
        },
        clearUser(state) {
            state.user = null;
        },
        setUserOrders(state, order) {
            state.userOrders.push(order);
        }
    },

    getters: {}
};
