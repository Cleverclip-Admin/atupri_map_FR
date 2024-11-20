<script setup>
const supabase = useSupabaseClient();

const scale = ref(1);

const optimalWidth = 1440;

const openVideoOverlay = ref(false);
const videoId = ref(false);

const rooms = ref([]);
const floors = ref([]);

const activeRoom = ref({ id: "", color: "" });

const loaded = ref(false);

async function getRooms() {
  const { data, error } = await supabase.from("rooms").select();
  if (error) {
    console.error("Supabase:", error);
  } else {
    rooms.value = data;
  }
}

async function getFloors() {
  const { data, error } = await supabase
    .from("floors")
    .select()
    .order("floor_number");
  if (error) {
    console.error("Supabase:", error);
  } else {
    floors.value = data;
  }
}

const videos = ref([]);

async function getVideos() {
  const { data, error } = await supabase.from("videos").select().order("id");
  if (error) {
    console.error("Supabase:", error);
  } else {
    videos.value = data;
  }
}

const map = ref(null);

function calculateMapScale() {
  if (map.value) {
    scale.value = map.value.$el.offsetWidth / optimalWidth;
  }
}

onMounted(() => {
  getRooms();
  getFloors();
  getVideos();
  setTimeout(() => {
    calculateMapScale();
  }, 200);
  window.addEventListener("resize", () => {
    calculateMapScale();
  });
  setTimeout(() => {
    loaded.value = true;
  }, 300);
});

const activeFloor = ref(2);
</script>

<template>
  <div class="w-[100vw] h-[100vh] fixed top-0 left-0 overflow-hidden">
    <Loader v-if="!loaded" />
    <div
      class="flex w-full h-full lg:gap-6 gap-4 lg:px-12 lg:py-8 py-4 px-8 justify-stretch items-center relative duration-500 ease-in-out transition-all"
      :class="loaded ? 'opacity-100 scale-[1]' : 'opacity-0 scale-[0.8]'"
    >
      <ReservationInfo class="max-w-[20vw]" />
      <div
        class="flex-grow grow-1 h-full shrink-0 flex flex-col justify-center items-center gap-12 relative -top-[1rem]"
      >
        <FloorSwitcher
          :activeFloor="activeFloor"
          @changeFloor="activeFloor = $event"
          :floors="floors"
          class=""
        />
        <div
          class="map-container w-full aspect-video max-w-[calc((100vh-12rem)/9*16)] relative top-0 left-0"
        >
          <Map
            :active-floor="activeFloor"
            :floors="floors"
            ref="map"
            @ready="calculateMapScale"
            :active-room="activeRoom"
          />
          <template v-for="room in rooms" :key="room.id">
            <Room
              :scale="scale"
              :data="room"
              class="z-100"
              :color="room.color ? room.color : 'blue'"
              v-if="room.floor === activeFloor"
              @update-active-room="activeRoom = $event"
            />
          </template>
        </div>
      </div>
      <div
        class="h-full max-w-[10vw] w-[16rem] grow-0 flex shrink-0 flex-col justify-center gap-6"
      >
        <template v-for="video in videos" :key="video.id">
          <div class="font-bold flex flex-col gap-2">
            <div
              class="w-full aspect-video relative group"
              @click="
                openVideoOverlay = true;
                videoId = video.vimeo_id;
              "
            >
              <img
                :src="video.placeholder_image"
                alt=""
                class="w-full h-full object-cover rounded-xl border-blue border-2 cursor-pointer"
              />
              <div
                class="absolute pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue group-hover:bg-black group-hover:scale-110 transition duration-300 ease-in-out rounded px-3 py-1"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  class="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 12C19 12.3557 18.8111 12.6846 18.5039 12.8638L6.50387 19.8638C6.19458 20.0442 5.81243 20.0455 5.50194 19.8671C5.19145 19.6888 5 19.3581 5 19L5 5C5 4.64193 5.19145 4.3112 5.50194 4.13286C5.81243 3.95452 6.19458 3.9558 6.50387 4.13622L18.5039 11.1362C18.8111 11.3154 19 11.6443 19 12Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div class="text-blue mb-4 leading-none">
              {{ video.name }}
            </div>
          </div>
        </template>
      </div>
      <VideoOverlay
        :id="videoId"
        v-if="openVideoOverlay"
        @close-me="openVideoOverlay = false"
      />
    </div>
  </div>
</template>

<style scoped></style>
