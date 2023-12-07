<script setup>
defineProps({
  records: {
    type: Array,
    required: true,
  },
  handleUpdateRecord: {
    type: Function,
    required: true,
  },
  isPaid: {
    type: Function,
    required: true,
  },
  isDisabled: {
    type: Function,
    required: true,
  },
  formatDate: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="ListForm w-full">
    <ul
      class="w-full h-[750px] backdrop-blur-sm bg-white/30 border rounded-2xl pt-4 px-3 overflow-y-scroll flex flex-col space-y-4 mt-5"
    >
      <li
        class="px-3 py-4 bg-white rounded-xl flex"
        v-for="record in records"
        :key="record.id"
      >
        <div class="flex justify-around items-center w-full">
          <p class="border-r-2 border-black px-4 w-[10%]">{{ record.store }}</p>
          <p class="border-r-2 border-black px-4">記帳編號：{{ record.record_number }}</p>

          <p class="border-r-2 border-black px-4">
            日期：{{ formatDate(record.purchase_date) }}
          </p>

          <p class="border-r-2 border-black px-4">主餐－{{ record.main }}</p>
          <p class="border-r-2 border-black px-4">附餐－ {{ record.side }}</p>
          <p class="border-r-2 border-black px-4">飲料－ {{ record.drink }}</p>

          <p class="border-r-2 border-black px-4">總金額：$ {{ record.total_price }}</p>

          <p class="border-r-2 border-black px-4">狀態：{{ isPaid(record.status) }}</p>
          <button
            :disabled="isDisabled(record.status)"
            @click="handleUpdateRecord(record.id)"
            class="bg-black text-white rounded-md p-2 hover:bg-gray-700 ml-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            付款
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
