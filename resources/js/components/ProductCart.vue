<template>
  <div
    class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
    v-if="computedProduct && computedProduct.pivot.quantity > 0"
  >
    <!-- First column -->
    <div class="flex w-2/5">
      <!-- Product image-->
      <div class="w-24">
        <img
          class="h-48 w-full object-contain md:w-48"
          :src="`/storage/img/${product.image}`"
          alt="Man looking at item at a store"
        />
      </div>

      <!-- Product title -->
      <div class="ml-4 w-full align-middle" style="align-self: center;">
        <span class="font-bold text-base">{{ product.title }}</span>
      </div>
    </div>

    <!-- Second column -->
    <div class="flex justify-center w-1/5">
      <!-- Chqnge product quantity -1 -->
      <svg
        class="cursor-pointer fill-current text-red-500 w-3"
        viewBox="0 0 448 512"
        @click="addToCart({ productId: product.id, quantity: -1 })"
      >
        <path
          d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
        />
      </svg>

      <!-- Product quantity -->
      <input
        class="cart-total-input disabled:opacity-50"
        type="text"
        :value="computedProduct.pivot.quantity"
        disabled
      />

      <!-- Chqnge product quantity +1 -->
      <svg
        class="cursor-pointer fill-current w-3 text-green-500"
        viewBox="0 0 448 512"
        @click="addToCart({ productId: product.id, quantity: 1 })"
      >
        <path
          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
        />
      </svg>
    </div>

    <!-- Product price -->
    <span class="text-center w-1/5 font-semibold text-sm">
      ₽{{ computedProduct.price }}
    </span>

    <!-- Product total -->
    <span class="text-center w-1/5 font-semibold text-sm">
      ₽{{ computedProduct.price * computedProduct.pivot.quantity }}
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["product"],

  computed: {
    computedProduct() {
      const product = this.$store.state.cart.cartProducts.find(
        (cartProduct) => {
          return cartProduct.pivot.product_id == this.product.id;
        }
      );
      return product;
    },
  },

  methods: mapActions({
    addToCart: "cart/addToCart",
  }),
};
</script>
