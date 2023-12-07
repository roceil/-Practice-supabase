<script setup>
import { reactive, defineEmits } from "vue";
defineProps({
  buttonStatus: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["changeButtonStatus"]);

const handleClick = (status) => {
  emit("changeButtonStatus", status);
};

const buttonData = reactive([
  {
    name: "全部",
    status: "all",
  },
  {
    name: "未結清",
    status: "unpaid",
  },
  {
    name: "已結清",
    status: "paid",
  },
]);

</script>

<template>
  <div class="ButtonGroup">
    <div class="space-x-4">
      <button
        v-for="button in buttonData"
        :key="button.status"
        @click="handleClick(button.status)"
        class="rounded-md p-2"
        :class="
          buttonStatus === button.status
            ? 'bg-white text-black!'
            : 'bg-black text-white hover:bg-gray-700'
        "
      >
        {{ button.name }}
      </button>
    </div>
  </div>
</template>
