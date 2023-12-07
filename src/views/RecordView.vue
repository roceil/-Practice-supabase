<script setup>
import RecordForm from "../containers/RecordForm.vue";
</script>

<template>
  <div class="RecordView h-[calc(100vh-60px)]">
    <div class="container h-full flex justify-center items-center">
      <div class="border backdrop-blur-sm bg-white/30 rounded-2xl px-4 py-5">
        <RecordForm />
      </div>
    </div>
  </div>
</template>
