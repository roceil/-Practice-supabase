<script setup>
import { reactive, computed } from "vue";
import dayjs from "dayjs";
import addRecord from "@/supabase/record/addRecord";
import RecordItem from "@/components/RecordItem.vue";
import clearOrder from "@/libs/record/clearOrder";
import countTotal from "@/libs/record/countTotal";

// 取得今天日期
const today = dayjs().format("YYYY-MM-DD");

// 計算總金額
const total = computed(() => countTotal(order));

// 訂單資料
const order = reactive({
  date: today,
  store: "測試店家",
  main: {
    name: "漢堡包",
    price: 100,
  },
  side: {
    name: "薯條",
    price: 30,
  },
  drink: {
    name: "可樂",
    price: 30,
  },
});

// 一次記錄10筆資料
const addRecord10times = async () => {
  for (let i = 0; i < 10; i++) {
    await addRecord(order, total.value);
  }
};

// 立即記帳
const onSubmit = async (e) => {
  e.preventDefault();
  if (e.target.value === "") {
    alert("請輸入完整資料");
    return;
  }
  try {
    await addRecord10times(order, total.value);
    alert("記帳成功");
    clearOrder(order);
  } catch (error) {
    alert(error);
  }
};
</script>

<template>
  <div class="RecordForm">
    <form @submit="onSubmit" class="flex flex-col gap-8">
      <!-- 日期 -->
      <RecordItem v-model="order.date" itemName="日期" type="date" />

      <!-- 店名 -->
      <RecordItem v-model="order.store" itemName="店名" type="text" tag="store" />

      <!-- 主餐 -->
      <div class="flex space-x-3">
        <RecordItem v-model="order.main.name" itemName="主餐" type="text" tag="name" />
        <RecordItem
          v-model="order.main.price"
          itemName="價格"
          type="number"
          tag="price"
        />
      </div>

      <!-- 附餐 -->
      <div class="flex space-x-3">
        <RecordItem v-model="order.side.name" itemName="附餐" type="text" tag="name" />
        <RecordItem
          v-model="order.side.price"
          itemName="價格"
          type="number"
          tag="price"
        />
      </div>

      <!-- 飲料 -->
      <div class="flex space-x-3">
        <RecordItem v-model="order.drink.name" itemName="飲料" type="text" tag="name" />
        <RecordItem
          v-model="order.drink.price"
          itemName="價格"
          type="number"
          tag="price"
        />
      </div>

      <!-- 總金額 -->
      <div>
        <p class="text-right font-bold">總金額：NT$：{{ total }}</p>
      </div>

      <!-- 立即記帳 -->
      <button
        type="submit"
        class="w-full py-2 bg-black text-white rounded-xl font-bold hover:bg-gray-700"
      >
        立即記帳
      </button>
    </form>
  </div>
</template>
