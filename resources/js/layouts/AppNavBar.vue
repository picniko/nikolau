<template>
  <header style="height: 44px">
    <div class="container mx-auto" style="max-width: 1024px">
      <div
        class="flex items-center justify-between h-12"
        style="transform: scale(0.9); transform-origin: 0 0"
      >
        <div class="flex items-center">
          <!-- Logo -->
          <router-link class="logo-brand" to="/">
            <img :src="require('@/images/brand.png').default" alt="" />
          </router-link>

          <!-- Search -->
          <div class="nav-search">
            <div class="relative">
              <input class="nav-search" placeholder="Поиск по сайту" />

              <div class="nav-search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- End Icons Buttons -->
        <div class="end-icons">
          <!-- Compare -->
          <div class="end-icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 text-gray-400 group-hover:text-cyan-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
              />
            </svg>
            <transition name="fade">
              <span v-if="1 == 0" class="el-badge"></span>
            </transition>
          </div>

          <!-- Favorites -->
          <div class="end-icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 text-gray-400 group-hover:text-cyan-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>

          <!-- Notifications -->
          <div class="end-icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 text-gray-400 group-hover:text-cyan-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>

          <!-- Bascket -->
          <router-link class="end-icon-button" :to="{ name: 'Cart' }">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 text-gray-400 group-hover:text-cyan-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <transition name="fade">
                <span v-if="quantity > 0" class="el-badge bg-cyan-500">
                  {{ quantity }}
                </span>
              </transition>
            </div>
          </router-link>

          <!-- User not login -->
          <template v-if="!user">
            <!-- Login -->
            <div
              class="end-icon-button"
              @click="$store.dispatch('auth/showLogin', true)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 text-gray-400 group-hover:text-cyan-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </template>

          <!-- User login -->
          <template v-else>
            <div class="relative inline-block h-full">
              <div
                class="end-icon-button font-bold h-full"
                @click="open = !open"
              >
                {{ user.name }}
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="open"
                  class="user-dropdown"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1" role="none" @click="open = false">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <router-link
                      :to="{ name: 'Orders' }"
                      class="user-dropdown-link"
                      >Заказы</router-link
                    >
                    <template v-if="user.admin">
                      <router-link
                        :to="{ name: 'CreateProduct' }"
                        class="user-dropdown-link"
                        >Админка</router-link
                      >
                    </template>
                    <template v-else> </template>
                    <a class="user-dropdown-link cursor-pointer" @click="exit"
                      >Выход</a
                    >
                  </div>
                </div>
              </transition>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      cart: (state) => state.cart.cartProducts,
    }),
    quantity() {
      return this.$store.getters["cart/cartProductsQuantity"];
    },
  },

  data() {
    return {
      open: false,
    };
  },

  methods: {
    ...mapActions({
      clearCart: "cart/clearCart",
      logout: "auth/logout",
    }),
    exit() {
      this.clearCart();
      this.logout().then((res) => {
        res ? this.$router.push("/") : false;
      });
    },
  },
};
</script>

<style scoped>
@import "../styles/navigation.css";
</style>
