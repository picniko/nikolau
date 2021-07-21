<template>
  <div class="w-full -mt-1 ml-1 sm:pl-56 h-full relative">
    <div class="container mx-auto">
      <!-- Products not found -->
      <template v-if="products.data.length === 0 && loadProductsStatus === 0">
        <div class="text-center">
          <div class="flex mx-auto justify-center">
            <img
              :src="require('@/images/nf.png').default"
              alt=""
              class="object-cover h-80 w-80"
            />
          </div>
          Товары пока не завезли ;(
        </div>
      </template>

      <!-- Else -->
      <template v-else>
        <!-- Card grid -->
        <template v-if="$store.state.product.grid === 'cards'">
          <!-- If data is loaded -->
          <div
            class="flex flex-wrap"
            v-if="products.data && products.data.length"
          >
            <div
              class="product sm:w-1/2 md:w-1/2 xl:w-1/2 p-4"
              v-for="product in products.data"
              :key="product.id"
              style="height: 400px"
            >
              <!-- Product card component -->
              <product-card :product="product" />
            </div>
          </div>

          <!-- If load data -->
          <div v-else class="flex flex-wrap">
            <div
              class="product sm:w-1/2 md:w-1/2 xl:w-1/2 p-4"
              v-for="(n, i) in 4"
              :key="i"
              style="height: 400px"
            >
              <!-- Product card skeleton -->
              <skeleton-product />
            </div>
          </div>
        </template>

        <!-- List grid -->
        <template v-else>
          <div
            class="product"
            v-for="product in products.data"
            :key="product.id"
            style="width: 776px"
          >
            <!-- Product list component -->
            <product-list class="mt-3" :product="product" />
          </div>
        </template>

        <!-- Pagination -->
        <pagination
          class="mt-4"
          v-if="meta"
          :meta="meta"
          module="product"
          :category="category"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard.vue";
import ProductList from "@/components/ProductList.vue";
import SkeletonProduct from "@/components/SkeletonProductCard.vue";

export default {
  name: "Products",

  created() {
    this.fetch({ category: this.category });
    document.title = this.category;
  },

  components: { ProductCard, Pagination, SkeletonProduct, ProductList },

  computed: {
    category() {
      return this.$route.meta.title;
    },
    ...mapState("product", ["products", "loadProductsStatus"]),
    meta() {
      return {
        current_page: this.products.current_page,
        total: this.products.total,
        per_page: this.products.per_page,
      };
    },
  },

  methods: mapActions({
    fetch: "product/all",
  }),

  watch: {
    category: function (val) {
      this.fetch({ category: val });
      document.title = val;
    },
  },
};
</script>