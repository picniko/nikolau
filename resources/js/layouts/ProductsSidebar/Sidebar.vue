<template>
  <div class="relative pt-3" style="max-width: 220px; z-index: 1">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div
      class="
        fixed
        flex flex-col flex-grow
        border-r border-gray-200
        bg-white
        shadow-lg
        p-3
      "
    >
      <!-- This example requires Tailwind CSS v2.0+ -->
      <nav class="space-y-1 w-full" aria-label="Sidebar">
        <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
        <Processors />

        <video-card />

        <m-plate />

        <RAM />

        <Bp />

        <Case />

        <Ssd />
      </nav>
    </div>

    <div
      class="
        fixed
        flex flex-col
        border-r border-gray-200
        bg-white
        shadow-lg
        p-3
      "
      style="margin-top: 350px; width: 220px"
    >
      <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
      <div class="bg-white px-1 py-3 border-gray-200" style="transform: scale(0.9); transform-origin: 0 0">
        <div
          class="
            flex
            justify-between
            items-center
            flex-wrap
            align-middle
          "
        >
          <span class="text-lg font-bold ml-2 text-gray-600"> Вид </span>
          <div class="ml-4 mt-4 flex-shrink-0 flex mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2 font-bold cursor-pointer"
              :class="{
                'bg-gray-100 text-cyan-700 ': grid === 'cards',
                'text-gray-600 hover:bg-gray-50 hover:text-gray-900':
                  grid !== 'cards',
              }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              @click="setGridAction('cards')"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 font-bold cursor-pointer"
              :class="{
                'bg-gray-100 text-cyan-700 ': grid === 'list',
                'text-gray-600 hover:bg-gray-50 hover:text-gray-900':
                  grid !== 'list',
              }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              @click="setGridAction('list')"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Processors, VideoCard, MPlate, RAM, Bp, Case, Ssd } from "./index.js";

export default {
  components: { Processors, VideoCard, MPlate, RAM, Bp, Case, Ssd },
  computed: mapState("product", ["grid"]),
  methods: mapActions("product", ["setGridAction"]),
};
</script>

<style scoped>
@import "@/styles/sidebar.css";
</style>
