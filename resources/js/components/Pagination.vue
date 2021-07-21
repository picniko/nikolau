<template>
  <div class="flex">
    <t-pagination
      class="mt-4"
      :total-items="meta.total"
      :per-page="meta.per_page"
      :limit="5"
      @change="fetch($event)"
      v-model="meta.current_page"
    />
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: {},
    },
    module: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
  },
  
  methods: {
    fetch(page) {
      let params = {};
      if (this.category) {
        params = {
          category: this.category,
          page: page,
        };
      } else {
        params = {
          page: page,
        };
      }
      this.$store.dispatch(this.module + "/all", params);
    },
  },
};
</script>
