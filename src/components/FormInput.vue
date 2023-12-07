<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emits("update:modelValue", value);
};

// 判斷按鈕類型
const InputType = computed(() => {
  if (props.itemName === "密碼" || props.itemName === "確認密碼") {
    return "password";
  }
  return "text";
});
</script>

<template>
  <div class="FormInput">
    <input
      class="border border-black rounded-md p-2 w-full focus:outline-black"
      :type="InputType"
      :id="itemName"
      :value="modelValue"
      :placeholder="itemName"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>
