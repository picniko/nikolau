<template>
  <div>
    <div
      class="flex flex-wrap"
      style="transform: scale(0.9); transform-origin: 0 0"
    >
      <div class="p-4" style="width: 100%">
        <div class="w-full">
          <div class="sm:flex items-center justify-between mb-5 mt-4">
            <p
              tabindex="0"
              class="text-xl font-bold leading-normal text-gray-800"
            >
              Продукты
            </p>
            <div>
              <button class="new-product-btn" @click="showModalComponent(true)">
                <p class="text-sm font-medium leading-none text-white">
                  Новый продукт
                </p>
              </button>
            </div>
          </div>

          <!-- Table -->
          <product-table
            v-if="products.data && products.data.length"
            :products="products.data"
          />
        </div>

        <!-- Pagination -->
        <pagination
          class="mt-4"
          v-if="products.meta"
          :meta="products.meta"
          module="admin"
        />
      </div>
    </div>

    <!-- Show create product dialog -->
    <create-product v-if="showModalCreateProduct" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CreateProduct from "./CreateProduct";
import ProductTable from "./ManageProductTable";
import Pagination from "@/components/Pagination";

export default {
  created() {
    this.all({ page: 1 });
  },

  computed: mapState("admin", ["products", "showModalCreateProduct"]),

  components: { CreateProduct, Pagination, ProductTable },

  methods: {
    ...mapActions({
      showModalComponent: "admin/showModalComponent",
      all: "admin/all",
    }),
  },
};
</script>