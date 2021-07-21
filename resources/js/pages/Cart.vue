<template>
  <div
    class="mx-auto mt-10"
    style="transform: scale(0.9); transform-origin: 0 0"
  >
    <div class="flex shadow-lg" style="width: 1024px">
      <div class="w-3/4 bg-white px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Корзина</h1>
          <h2 class="font-semibold text-2xl">{{ quantity || 0 }} шт.</h2>
        </div>
        <div class="flex mt-10 mb-5">
          <h3 class="head-table-w-2">Товар</h3>
          <h3 class="head-table-w-1">Кол-во</h3>
          <h3 class="head-table-w-1">Цена</h3>
          <h3 class="head-table-w-1">Итого</h3>
        </div>
        <template>
          <product-cart
            v-for="product in $store.state.cart.cartProducts"
            :key="product.id"
            :product="product"
          />
        </template>

        <a
          @click="$router.go(-1)"
          class="
            flex
            font-semibold
            text-indigo-600 text-sm
            mt-10
            cursor-pointer
          "
        >
          <svg
            class="fill-current mr-2 text-indigo-600 w-4"
            viewBox="0 0 448 512"
          >
            <path
              d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
            />
          </svg>
          Вернуться назад
        </a>
      </div>

      <div id="summary" class="w-1/4 px-8 py-10 bg-gray-100">
        <h1 class="font-semibold text-2xl border-b pb-8">Итог заказа</h1>
        <div class="flex justify-between mt-10 mb-5">
          <span class="font-semibold text-sm uppercase">Кол-во </span>
          <span class="font-semibold text-sm"> {{ quantity || 0 }}</span>
        </div>
        <div class="border-t mt-8">
          <div class="total-sum">
            <span>СТОИМОСТЬ</span>
            <span>{{ orderSum }}₽</span>
          </div>
          <button
            class="total-btn hover:bg-indigo-600"
            @click="$store.dispatch('cart/finishOrder')"
          >
            Оформить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCart from "@/components/ProductCart.vue";

export default {
  name: "Cart",

  components: { ProductCart },

  computed: {
    orderSum() {
      return this.$store.state.cart.cartProducts.reduce((sum, product) => {
        return (sum += product.price * product.pivot.quantity);
      }, 0);
    },
    quantity() {
      return this.$store.getters["cart/cartProductsQuantity"];
    },
  },

  methods: {
    back() {
      this.router.go(-1);
    },
  },
};
</script>

<style lang="css" scoped>
@import "@/styles/cart.css";
</style>
