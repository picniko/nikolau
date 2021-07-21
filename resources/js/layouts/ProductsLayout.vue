<template>
  <div style="transform: scale(0.9); transform-origin: 0 0">
    <products-sidebar class="sticky top-0" />

    <div class="container">
      <router-view />
    </div>
  </div>
</template>


<script>
import ProductsSidebar from "./ProductsSidebar/Sidebar.vue";

export default {
  name: "ProductLayout",
  
  components: { ProductsSidebar }
};
</script>
