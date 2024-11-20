<script setup lang="ts">
defineProps({
  id: String,
});
</script>

<template>
  <div
    class="fixed top-0 left-0 z-[100] w-full h-full flex items-center justify-center"
  >
    <div class="relative z-10">
      <VimeoVideo :id="id" class="z-10"></VimeoVideo>
      <div
        @click="$emit('close-me')"
        class="font-bold text-2xl w-[4rem] h-[4rem] bg-blue rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer text-white"
      >
        x
      </div>
    </div>
    <div
      class="backdrop inset-0 absolute bg-black opacity-50"
      @click="$emit('close-me')"
    ></div>
  </div>
</template>

<style scoped></style>
