<script setup lang="ts">
defineProps({
  floors: Array,
  activeFloor: Number,
});
</script>

<template>
  <div
    class="bg-blue text-lg xl:text-xl rounded-xl px-4 xl:px-6 py-2 xl:py-4 text-white flex gap-6 items-center"
  >
    <template v-for="floor in floors">
      <div
        class="hover:opacity-75 cursor-pointer transition ease-in-out duration-300 underline-offset-4"
        :class="{
          'opacity-100': floor.floor_number === activeFloor,
          underline: floor.floor_number === activeFloor,
          'opacity-50': floor.floor_number !== activeFloor,
        }"
        @click="$emit('changeFloor', floor.floor_number)"
      >
        {{ floor.floor_number }}. OG
      </div>
    </template>
  </div>
</template>

<style scoped></style>
