<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import getUser from "../composable/auth/getUser";
import getUserId from "../libs/getUserId";
import uploadImage from "../composable/user/uploadImage";
import updateImagePath from "../composable/user/updateImagePath";
import generateImagePath from "../composable/user/generateImagePath";

// user 初始值
const user = reactive({
  email: "",
  image_path: "",
});

// 取得 userId
const userId = computed(() => getUserId());

// 取得 user 資料
onMounted(async () => {
  const data = await getUser(userId.value);
  user.email = data[0].email;
  user.image_path = data[0].image_path;
});

// 隱藏的原生 input
const fileInput = ref(null);

// 點擊更換圖片按鈕
const onFileButtonClick = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleUploadImage = async (e) => {
  const file = e.target.files[0];
  const name = `avatar_${user.email}_${Date.now()}`;

  try {
    // 上傳圖片到 supabase
    await uploadImage(file, name);

    // 產生圖片路徑
    const newImageUrl = await generateImagePath(name);

    // 更新圖片路徑到 supabase
    await updateImagePath(newImageUrl, userId.value);

    // 替換圖片路徑
    user.image_path = newImageUrl;

    alert("更換圖片成功");
  } catch (error) {
    alert("更換圖片失敗");
  }
};
</script>

<template>
  <div class="UserForm">
    <div
      class="backdrop-blur-sm bg-white/30 rounded-2xl border border-white flex px-16 py-20 space-x-5 justify-center"
    >
      <!-- 用戶照片 -->
      <div class="">
        <img
          :src="user.image_path"
          :alt="user.email"
          class="w-[400px] h-[400px] bg-pink-200 rounded-2xl object-cover"
        />

        <!-- 隱藏的原生 input -->
        <input
          type="file"
          ref="fileInput"
          @change="handleUploadImage"
          style="display: none"
        />

        <button
          @click="onFileButtonClick"
          class="w-full mt-4 rounded-full py-2 font-bold bg-black text-white hover:bg-gray-700"
        >
          更換圖片
        </button>
      </div>

      <!-- 用戶資料 -->
      <div class="flex flex-col justify-center items-center space-y-4">
        <p class="text-xl font-bold">信箱：{{ user.email }}</p>
        <p class="text-xl font-bold">ID：{{ userId }}</p>
      </div>
    </div>
  </div>
</template>
