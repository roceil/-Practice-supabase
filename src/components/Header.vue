<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import supabase from "../supabase";

const router = useRouter();

// 跳轉回首頁
const toHome = () => {
  router.push("/");
};

// 跳轉到關於我
const toAbout = () => {
  router.push("/about");
};

// 跳轉到記帳列表
const toOrders = () => {
  router.push("/orders");
};

// 跳轉到增加記帳記錄
const toRecord = () => {
  router.push("/record");
};

// 取得當前路由
const currentRoute = computed(() => router.currentRoute.value.path);

// 清空 localStorage
const clearUserId = () => {
  localStorage.removeItem("userId");
};

// supabase 登出
const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert(error.message);
    return;
  }

  return;
};

// 登出
const handleLogOut = async () => {
  try {
    await logout();
    clearUserId();
    toHome();
  } catch (error) {
    alert("登出失敗");
  }
};
</script>

<template>
  <header class="backdrop-blur-sm bg-white/30 fixed top-0 w-full">
    <div class="container flex justify-between items-center h-[60px]">
      <p class="font-bold">94 愛記帳</p>

      <div class="space-x-4">
        <button
          @click="toOrders"
          v-if="currentRoute !== '/orders'"
          class="border border-black py-2 px-4 rounded-full hover:bg-black hover:text-white font-bold"
        >
          記帳列表
        </button>
        <button
          @click="toRecord"
          v-if="currentRoute !== '/record'"
          class="border border-black py-2 px-4 rounded-full hover:bg-black hover:text-white font-bold"
        >
          立即記帳
        </button>
        <button
          @click="toAbout"
          v-if="currentRoute !== '/about'"
          class="border border-black py-2 px-4 rounded-full hover:bg-black hover:text-white font-bold"
        >
          關於我
        </button>
        <button
          @click="handleLogOut"
          class="border border-black py-2 px-4 rounded-full hover:bg-black hover:text-white font-bold"
        >
          登出
        </button>
      </div>
    </div>
  </header>
  <!-- 佔位格 -->
  <div class="h-[60px]"></div>
</template>
