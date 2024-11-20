<script setup lang="ts">
const props = defineProps({
  id: String,
});

const isLoaded = ref(false);
const isPlaying = ref(false);
const video = ref();
async function play() {
  await video.value.play();
}

const width = ref(720);

onMounted(() => {
  if (window) {
    width.value = ((window.innerHeight - 240) / 9) * 16;
  }
});
</script>

<template>
  <div>
    {{ height }}
    <ScriptVimeoPlayer
      :id="id"
      ref="video"
      class="group width-[72rem]"
      @loaded="isLoaded = true; play()"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      :vimeo-options="{ width: width }"
      :trigger="isLoaded"
    >
      <template #awaitingLoad>
        <div
          class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 group-hover:bg-blue-700 transition rounded px-6 py-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="w-10 h-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12C19 12.3557 18.8111 12.6846 18.5039 12.8638L6.50387 19.8638C6.19458 20.0442 5.81243 20.0455 5.50194 19.8671C5.19145 19.6888 5 19.3581 5 19L5 5C5 4.64193 5.19145 4.3112 5.50194 4.13286C5.81243 3.95452 6.19458 3.9558 6.50387 4.13622L18.5039 11.1362C18.8111 11.3154 19 11.6443 19 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </template>
    </ScriptVimeoPlayer>
  </div>
</template>
