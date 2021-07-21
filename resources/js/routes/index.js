import Vue from "vue";
import Router from "vue-router";
import Products from "@/pages/Products";
import CartComponent from "@/pages/Cart";
import ManageProduct from "@/pages/admin/ManageProduct.vue";
import NotFound from "@/pages/errors/404.vue";
import OrderComponent from "@/pages/profile/OrderComponent.vue";
import ProductsLayout from "@/layouts/ProductsLayout";
import AdminLayout from "@/layouts/AdminLayout";
import DefaultLayout from "@/layouts/DefaultLayout";

import store from "@/store";

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "ProductsLayout",
            component: ProductsLayout,
            redirect: { name: "Cpus" },
            children: [
                {
                    path: "/cpus",
                    name: "Cpus",
                    component: Products,
                    meta: { title: "Процессоры" }
                },
                {
                    path: "/video-cards",
                    name: "Vids",
                    component: Products,
                    meta: { title: "Видеокарты" }
                },
                {
                    path: "/mother-boards",
                    name: "MBoards",
                    component: Products,
                    meta: { title: "Материнские платы" }
                },
                {
                    path: "/ram",
                    name: "Ram",
                    component: Products,
                    meta: { title: "Оперативная память" }
                },
                {
                    path: "/power-supplies",
                    name: "PSupplies",
                    component: Products,
                    meta: { title: "Блоки питания" }
                },
                {
                    path: "/cases",
                    name: "Cases",
                    component: Products,
                    meta: { title: "Корпуса" }
                },
                {
                    path: "/storage-device",
                    name: "SDevice",
                    component: Products,
                    meta: { title: "Накопители" }
                }
            ]
        },
        {
            path: "/cart",
            name: "Cart",
            component: DefaultLayout,
            redirect: { name: "CartComponent" },
            children: [
                {
                    path: "basket",
                    name: "CartComponent",
                    component: CartComponent,
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: "/profile",
            name: "Profile",
            component: DefaultLayout,
            redirect: { name: "ProfileComponent" },
            children: [
                {
                    path: "orders",
                    name: "Orders",
                    component: OrderComponent,
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: "/admin",
            name: "Admin",
            component: AdminLayout,
            redirect: { name: "CreateProduct" },
            children: [
                {
                    path: "manage-products",
                    name: "CreateProduct",
                    component: ManageProduct,
                    meta: { requiresAdmin: true }
                }
            ]
        },
        {
            path: "*",
            name: "NotFound",
            component: NotFound
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.auth.user) {
            next();
        } else {
            store.dispatch("auth/getUser").then(res => {
                if (res) next();
                else {
                    router.push("/");
                    store.dispatch("auth/showLogin", true);
                }
            });
        }
        // .then(store.dispatch("cart/getCartProducts"));
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (store.state.auth.user && store.state.auth.user.admin) {
            next();
        } else {
            store.dispatch("auth/getUser").then(res => {
                if (res && store.state.auth.user.admin) next();
                else next({ name: "NotFound" });
            });
        }
    } else {
        next();
    }
});

export default router;
