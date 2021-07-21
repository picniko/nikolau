<template>
  <div class="mx-auto">
    <app-nav />
    <div class="mx-auto" style="max-width: 1024px">
      <router-view />
    </div>
    <login v-if="$store.state.auth.showModalLoginComponent" />
    <register v-if="$store.state.auth.showModalRegisterComponent" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AppNav from "./layouts/AppNavBar.vue";
import Login from "./pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
export default {
  components: {
    AppNav,
    Login,
    Register,
  },

  created() {
    this.user().then((res) => {
      res ? this.cart() : false;
    });
  },

  methods: mapActions({
    user: "auth/getUser",
    cart: "cart/getCartProducts",
  }),
};
</script>
