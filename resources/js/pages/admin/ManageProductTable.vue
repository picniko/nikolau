<template>
  <div>
    <table class="shadow-lg bg-white pt-4" style="width: 100%">
      <tr>
        <th class="bg-blue-100 border text-center px-4 py-1">ID</th>
        <th class="bg-blue-100 border text-left px-4 py-1">Продукт</th>
        <th class="bg-blue-100 border text-left px-4 py-1">Категория</th>
        <th class="bg-blue-100 border text-center px-4 py-1">Цена</th>
      </tr>
      <tr v-for="product in products" :key="product.id">
        <td class="border px-3 py-2 font-bold text-center">
          {{ product.id }}
        </td>
        <td class="border px-3 py-2">{{ product.title }}</td>
        <td class="border px-3 py-2">{{ product.category.title }}</td>
        <td class="border px-3 py-2 text-center">{{ product.price }}₽</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["products"],
};
</script>

<style lang="scss" scoped>
</style>