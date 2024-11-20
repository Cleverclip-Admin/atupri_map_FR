<script setup lang="ts">
const props = defineProps({
  floors: Array,
  activeFloor: Number,
  activeRoom: {},
});

watch(() => props.activeRoom, highlightRoom);

function highlightRoom() {
  const highlightedPaths = document.getElementsByClassName("highlighted-room");
  for (let i = 0; i < highlightedPaths.length; i++) {
    highlightedPaths[i].classList.remove("highlighted-room", 'active');
  }
  if (props.activeRoom) {
    const path = document.getElementById(props.activeRoom.id);
    if (path) {
      path.classList.add("highlighted-room", props.activeRoom.color);
      path.animate({ opacity: [0, 0.5] }, { duration: 300, fill: "forwards" });
    }
  }
}
</script>

<template>
  <div class="w-full h-full absolute top-0 left-0" id="map">
    <template v-for="floor in floors" :key="floor.id">
      <div
        class="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_path]:transition [&_path]:duration-300 [&_path]:ease-in-out"
        v-show="floor.floor_number === activeFloor"
        v-html="floor.map_code"
      ></div>
    </template>
  </div>
</template>

<style>
.highlighted-room.purple {
  @apply fill-purple;
}

.highlighted-room.green {
  @apply fill-green;
}

.highlighted-room.red {
  @apply fill-red;
}

.highlighted-room.blue {
  @apply fill-blue;
}

.highlighted-room.light_blue {
  @apply fill-light_blue;
}


</style>
