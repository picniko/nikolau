<template>
  <div>
    <div class="mx-auto mt-10">
      <div class="flex shadow-lg justify-center" style="width: 910px">
        <div class="border-b border-gray-200" style="width: 100%">
          <nav class="-mb-px mx-5 flex space-x-8 justify-center">
            <a
              v-for="tab in tabs"
              :key="tab.name"
              @click="selectTab(tab)"
              class="cursor-pointer"
              :class="[
                tab.current
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
              :aria-current="tab.current ? 'page' : undefined"
            >
              {{ tab.name }}
            </a>
          </nav>

          <div class="mx-5" style="min-height: 500px">
            <template v-if="tabs[0].current">
              <ul v-for="order in orders" :key="order.id">
                <template v-if="order.status === 0">
                  <h2 class="text-xl font-bold">Номер заказа {{ order.id }}</h2>
                  <pre></pre>
                  <li v-for="product in order.products" :key="product.id">
                    {{ product.title }} {{ product.price }}
                  </li>

                  <h2 class="text-xl font-bold">
                    Сумма заказа:
                    {{
                      order.products.reduce((sum, cartProduct) => {
                        return (sum +=
                          cartProduct.pivot.quantity * cartProduct.price);
                      }, 0)
                    }}
                  </h2>
                </template>
              </ul>
              <pre></pre>
            </template>
            <template v-else>
              <ul v-for="order in orders" :key="order.id">
                <template v-if="order.status === 1">
                  <h2 class="text-xl font-bold">Номер заказа {{ order.id }}</h2>
                  <pre></pre>
                  <li v-for="product in order.products" :key="product.id">
                    {{ product.title }} {{ product.price }}
                  </li>

                  <h2 class="text-xl font-bold">
                    Сумма заказа:
                    {{
                      order.products.reduce((sum, cartProduct) => {
                        return (sum +=
                          cartProduct.pivot.quantity * cartProduct.price);
                      }, 0)
                    }}
                  </h2>
                </template>
              </ul>
            </template>
            <div class="text-xl" v-if="orders.length < 1">
              Заказы не найдены
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Orders",
  
  created() {
    this.$store.dispatch("order/all");
  },

  computed: {
    openOrders() {
      return this.$store.getters["order/openOrders"];
    },
    closedOrders() {
      return this.$store.getters["order/closedOrders"];
    },
    orders() {
      return this.$store.state.order.orders;
    },
  },

  data() {
    return {
      tabs: [
        { name: "Открытые заказы", current: true },
        { name: "Завершенные", current: false },
      ],
    };
  },

  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.current = tab.name == selectedTab.name;
      });
    },
  },
};
</script>

