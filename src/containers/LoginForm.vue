<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import login from "@/supabase/auth/login";
import FormInput from "@/components/FormInput.vue";
import setUserId from "@/libs/setUserId";

const emits = defineEmits(["sign-up"]);

// 跳轉到註冊頁面
const toSignUp = () => {
  emits("sign-up");
};

// 跳轉到 orders
const router = useRouter();
const toOrders = () => {
  router.push("/orders");
};

// 各欄位預設值
const form = reactive({
  account: "",
  password: "",
});

// 送出表單
const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await login(form);
    if (!data) return;
    alert("登入成功");
    setUserId(data);
    toOrders();
  } catch (error) {
    alert("登入失敗");
  }
};
</script>

<template>
  <div class="LoginForm">
    <div class="w-[400px] border rounded-2xl backdrop-blur-sm bg-white/30 px-4 py-5">
      <p class="text-center text-2xl font-bold border-b border-black pb-3">登入</p>

      <!-- 帳號密碼表單 -->
      <form class="flex flex-col space-y-4 mt-3" @submit="onSubmit">
        <FormInput v-model="form.account" itemName="帳號" />

        <FormInput v-model="form.password" itemName="密碼" />

        <button
          type="submit"
          class="bg-black text-white rounded-md p-2 hover:bg-gray-700"
        >
          登入
        </button>
        <button
          @click="toSignUp"
          type="button"
          class="bg-black text-white rounded-md p-2 hover:bg-gray-700"
        >
          註冊帳號
        </button>
      </form>
    </div>
  </div>
</template>
