<script setup>
import { reactive } from "vue";
import FormInput from "../components/FormInput.vue";
import formValid from "../libs/formValid";
import signUp from "../composable/auth/signUp";
import insertUser from "../composable/user/insertUser";

const emits = defineEmits(["login"]);

// 跳轉到登入頁面
const toLogin = () => {
  emits("login");
};

// 各欄位預設值
const form = reactive({
  account: "",
  password: "",
  confirmPassword: "",
});

// 送出表單
const onSubmit = async (e) => {
  e.preventDefault();
  if (!formValid(form)) return;
  try {
    const res = await signUp(form);
    if (!res) return;
    await insertUser(res);
    alert("註冊成功");
    toLogin();
  } catch (error) {
    alert("註冊失敗");
  }
};
</script>

<template>
  <div class="LoginForm">
    <div class="w-[400px] border rounded-2xl backdrop-blur-sm bg-white/30 px-4 py-5">
      <p class="text-center text-2xl font-bold border-b border-black pb-3">註冊帳號</p>

      <!-- 帳號密碼表單 -->
      <form class="flex flex-col space-y-4 mt-3" @submit="onSubmit">
        <FormInput v-model="form.account" itemName="帳號" />

        <FormInput v-model="form.password" itemName="密碼" />

        <FormInput v-model="form.confirmPassword" itemName="確認密碼" />

        <button
          type="submit"
          class="bg-black text-white rounded-md p-2 hover:bg-gray-700"
        >
          立即註冊
        </button>
        <button
          @click="toLogin"
          type="button"
          class="bg-black text-white rounded-md p-2 hover:bg-gray-700"
        >
          返回登入
        </button>
      </form>
    </div>
  </div>
</template>
