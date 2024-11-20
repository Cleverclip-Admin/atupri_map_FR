<script setup lang="ts">
const supabase = useSupabaseClient();
const videos = ref([]);

async function getVideos() {
  const { data, error } = await supabase.from("videos").select();
  if (error) {
    console.error("Supabase:", error);
  } else {
    videos.value = data;
  }
}
onMounted(() => {
  getVideos();
});

const open = ref(false);
</script>

<template>
  <div class="text-xl text-white relative">
    <div
      @click="open = !open"
      class="rounded-xl bg-blue px-4 py-2 flex justify-center items-center h-full cursor-pointer transition ease-in-out duration-300 hover:bg-black"
    >
      <p class="">How to office</p>
    </div>
    <div
      class="absolute -bottom-2 right-0 translate-y-full flex flex-col gap-4 rounded-xl bg-blue px-6 py-4"
      v-if="open"
    >
      <!--      <p class="text-base min-w-[12rem]">-->
      <!--        Hier geht's zu den Videos die dir das Büro erklären:-->
      <!--      </p>-->
      <div class="flex flex-col gap-2">
        <template v-for="video in videos">
          <NuxtLink
            external
            :to="video.url"
            target="_blank"
            class="opacity-75 hover:opacity-100 hover:underline underline-offset-4 whitespace-nowrap"
          >
            {{ video.name }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
