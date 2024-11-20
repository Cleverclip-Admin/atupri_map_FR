<script setup lang="ts">
const props = defineProps({
  data: Object,
  color: String,
  scale: Number,
});

const loaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 200);
});

function updateActiveRoom(id: string, color: string) {
  if (id) {
    emit("update-active-room", { id: id, color: color });
  } else {
    emit("update-active-room", { id: "", color: "" });
  }
}

const emit = defineEmits(["update-active-room"]);
</script>

<template>
  <!--  for whatever reason the icons on the right side of the map are bugged and won't go to full size, that's why there's a workaround via min-width and for one specific case, if anyone finds out, I'd love to know why - Sam-->
  <div
    class="min-w-[5rem] origin-bottom hover:min-w-[12rem] hover:z-50 z-10 group cursor-pointer rounded-xl absolute text-white"
    :class="[
      loaded ? 'opacity-100' : 'opacity-0',
      `bg-${color ? color : 'blue'}`,
      data.room_name === 'Rosengarten' ? 'special' : '',
      data.room_name.includes('Risikomanagement') ? 'special' : '',
      data.room_name.includes('Marketingkommunikation') ? 'special' : '',
      data.room_name.includes('Angebotsmanagement') ? 'special' : '',
      data.room_name.includes('Marzili') ? 'small-special' : '',
    ]"
    :style="{
      transform: 'translate(-50%, -100%) scale(' + scale + ')',
      left: data.x + '%',
      top: data.y + '%',
    }"
    @mouseenter="updateActiveRoom(data.room_svg_id, color)"
    @mouseleave="updateActiveRoom('')"
  >
    <div class="flex gap-4 items-center pointer-events-none px-4 py-2">
      <img class="w-12 h-12 z-10 shrink-0" :src="data.icon" alt="" />
      <div
        class="text-xl leading-none relative z-20 max-w-[33vw] hidden group-hover:flex py-2"
      >
        {{ data.room_name }}
      </div>
      <div
        v-if="data.room_space"
        class="flex gap-2 whitespace-nowrap items-center relative z-20 pl-8 hidden group-hover:flex"
      >
        <svg
          class="w-6 aspect-square"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.88269 25C5.09238 25 1 24.2955 1 21.4724C1 18.6492 5.06629 16.1053 9.88269 16.1053C14.673 16.1053 18.7641 18.6251 18.7641 21.447C18.7641 24.2688 14.6991 25 9.88269 25Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.88353 12.0793C13.0275 12.0793 15.5766 9.59889 15.5766 6.53965C15.5766 3.4804 13.0275 1 9.88353 1C6.73956 1 4.19047 3.4804 4.19047 6.53965C4.17873 9.58874 6.71086 12.0692 9.84309 12.0793H9.88353Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.3318 10.5577C21.1621 10.0817 22.511 8.45813 22.511 6.5261C22.5123 4.5103 21.0421 2.82708 19.0879 2.43738"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.1914 15.0953C22.7849 15.0953 25 16.8065 25 18.3336C25 19.2336 24.2368 20.1577 23.0758 20.423"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="text-2xl">
          {{ data.room_space }}
        </div>
      </div>
    </div>
    <div
      class="absolute pointer-events-none bottom-0 rotate-45 bg-[inherit] w-4 h-4 translate-y-1/2 left-1/2 -translate-x-1/2 shrink-0"
    ></div>
  </div>
</template>

<style scoped>
.small-special:hover {
  width: 17rem;
}

.special:hover {
  width: 22rem;
}
</style>
