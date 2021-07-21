<template>
  <div class="card hover:shadow-xl w-full">
    <!-- card image  -->
    <div class="relative pb-48">
      <img class="card-img" :src="`/storage/img/${product.image}`" alt="" />
    </div>

    <!-- card title -->
    <div class="p-4">
      <h2 class="mt-2 mb-2 font-bold">
        {{ product.title }}
      </h2>
      <p class="text-sm">[{{ productDescription }} ]</p>
    </div>

    <!-- card bottom info and actions -->
    <div class="card-body md:flex-row">
      <!-- Product price -->
      <p class="font-bold text-xl mb-0">{{ product.price }} ₽</p>

      <div class="flex">
        <!-- compare icon unimplemented code-->
        <div class="card-compare hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 text-orange-600 group-hover:text-cyan-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
            />
          </svg>
        </div>

        <!-- like icon unimplemented code -->
        <div class="card-like hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 text-red-500 group-hover:text-cyan-600"
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

        <!-- Product not in user cart -->
        <template v-if="productQuantity < 1">
          <!-- basket icon -->
          <div
            class="card-basket hover:bg-gray-100"
            @click="add({ productId: product.id, quantity: 1 })"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 text-cyan-600 group-hover:text-cyan-400"
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
          </div>
        </template>

        <!-- Product in user cart -->
        <template v-else>
          <!-- Add product in user cart -->
          <div
            class="card-counter hover:bg-gray-100"
            @click="add({ productId: product.id, quantity: 1 })"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 text-lime-600 group-hover:text-lime-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>

          <!-- Product Quantity in user cart -->
          {{ productQuantity }}

          <!-- Remove product from user cart -->
          <div
            class="card-counter hover:bg-gray-100"
            @click="add({ productId: product.id, quantity: -1 })"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 text-red-600 group-hover:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 12H6"
              />
            </svg>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      default: [],
    },
    category: {
      type: String,
      default: "",
    },
  },

  computed: {
    productQuantity() {
      const product = this.$store.state.cart.cartProducts.find(
        (cartProduct) => {
          return cartProduct.pivot.product_id == this.product.id;
        }
      );
      return product ? product.pivot.quantity : null;
    },
    productDescription() {
      return this.product.description.split(" ").length <= 14
        ? this.product.description.split(" ").slice(0, 14).join(" ")
        : this.product.description.split(" ").slice(0, 14).join(" ") + "...";
    },
  },

  methods: {
    ...mapActions({
      addToCart: "cart/addToCart",
      showLogin: "auth/showLogin",
    }),
    add(payload) {
      this.addToCart(payload).then((res) => {
        res ? this.showLogin(true) : false;
      });
    },
  },
};
</script>

<style lang="css" scoped>
@import "@/styles/cart.css";
</style>
