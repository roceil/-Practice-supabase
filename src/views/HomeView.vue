<script setup>
import { ref } from "vue";
import LoginForm from "@/containers/LoginForm.vue";
import SignUpForm from "@/containers/SignUpForm.vue";

// 預設表單（登入）
const showLoginForm = ref(true);

// 切換表單
const toggleForm = () => {
  showLoginForm.value = !showLoginForm.value;
};
</script>

<template>
  <div class="HomeView h-[calc(100vh-60px)]">
    <div class="container flex justify-center items-center h-full">
      <LoginForm v-if="showLoginForm" @sign-up="toggleForm" />
      <SignUpForm v-else @login="toggleForm" />
    </div>
  </div>
</template>
