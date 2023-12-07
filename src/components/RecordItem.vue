<script setup>
import { defineEmits } from "vue";

defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emits("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="RecordItem">
    <label class="flex w-full justify-center items-center">
      <span class="font-bold shrink-0">{{ itemName }}：</span>
      <input
        :type="type"
        class="px-2 text-lg rounded-xl py-2 w-[95%]"
        :value="modelValue"
        @input="updateValue"
      />
    </label>
  </div>
</template>
