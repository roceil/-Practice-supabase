<script setup>
import { watch, ref, onMounted } from "vue";
import dayjs from "dayjs";
import ListForm from "@/containers/ListForm.vue";

import ButtonGroup from "@/components/ButtonGroup.vue";
import MonthSelector from "@/components/MonthSelector.vue";

import currentMonthFilter from "@/libs/orders/currentMonthFilter";
import getRecords from "@/supabase/orders/getRecords";
import updateRecord from "@/supabase/orders/updateRecord";
import filterRecordsByStatus from "@/libs/orders/filterRecordsByStatus";
import filterRecordsByMonth from "@/libs/orders/filterRecordsByMonth";

import getUserId from "@/libs/getUserId";
import { monthOptions } from "@/constants";
import formatDate from "@/libs/formatDate";
import isPaid from "@/libs/isPaid";
import isDisabled from "@/libs/isDisabled";

// 初始化渲染資料
const records = ref([]);
const originalRecords = ref([]);

// 初始化列表狀態
const buttonStatus = ref("all");

// 更改列表狀態
const changeButtonStatus = (status) => {
  buttonStatus.value = status;
};

// 取得 localStorage 的 userId
const userId = getUserId();

// 取得當前月份
const currentMonth = dayjs().format("MM");
const selectedMonth = ref(currentMonth);

// 更改記帳記錄狀態
const handleUpdateRecord = async (recordId) => {
  await updateRecord(recordId);
  const res = await getRecords(userId);
  const filterData = filterRecordsByStatus(buttonStatus.value, res);
  originalRecords.value = res;
  records.value = currentMonthFilter(filterData, currentMonth);
};

// 狀態篩選器
watch(buttonStatus, (status) => {
  const filterData = filterRecordsByStatus(status, originalRecords.value);
  const result = currentMonthFilter(filterData, currentMonth);
  records.value = result;
});

// 月份篩選器
watch(selectedMonth, (month) => {
  records.value = filterRecordsByMonth(originalRecords.value, month);
});

// 初始化記帳記錄
onMounted(async () => {
  const res = await getRecords(userId);
  originalRecords.value = res;
  records.value = currentMonthFilter(res, currentMonth);
});
</script>

<template>
  <div class="OrdersView h-[calc(100vh-60px)] pb-5">
    <div class="container h-full flex flex-col justify-end items-center">
      <!-- 按鈕列表 -->
      <div class="flex justify-start items-center space-x-4 w-full">
        <!-- 狀態篩選 -->
        <ButtonGroup
          :buttonStatus="buttonStatus"
          @change-button-status="changeButtonStatus"
        />
        <!-- 月份篩選 -->
        <MonthSelector :monthOptions="monthOptions" v-model="selectedMonth" />
      </div>

      <!-- 訂單列表 -->
      <ListForm
        :records="records"
        :handleUpdateRecord="handleUpdateRecord"
        :isPaid="isPaid"
        :isDisabled="isDisabled"
        :formatDate="formatDate"
      />
    </div>
  </div>
</template>
