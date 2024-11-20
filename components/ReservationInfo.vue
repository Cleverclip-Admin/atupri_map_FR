<script setup lang="ts"></script>

<template>
  <div
    class="bg-white z-20 relative border-2 border-blue p-6 rounded-xl text-black flex flex-col gap-4 text-sm xl:text-base"
  >
    <div class="">
      <h3 class="text-xl font-bold text-blue mb-2">Reservationen</h3>
      <div class="w-full bg-blue h-0.5"></div>
    </div>
    <div class="flex items-center gap-4">
      <div class="rounded-full bg-red w-4 h-4 shrink-0"></div>
      <p><b>Sitzungszimmer:</b> Outlook</p>
    </div>
    <div class="flex items-center gap-4">
      <div class="rounded-full bg-blue w-4 h-4 shrink-0"></div>
      <p><b>Sitzungszimmer:</b> myRoomz</p>
    </div>
    <div class="flex items-center gap-4">
      <div class="rounded-full bg-green w-4 h-4 shrink-0"></div>
      <p><b>Flexi-Nische:</b> Nicht reservierbar</p>
    </div>
    <p>Alle Reservationen sind in myRoomz ersichtlich, jene der Sitzungszimmer zusätzlich in Outlook.</p>
  </div>
</template>

<style scoped></style>
