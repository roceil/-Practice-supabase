<script setup>
defineProps({
  monthOptions: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateSelectedMonth = (value) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="MonthSelector">
    <div class="flex items-center space-x-2 h-full">
      <select
        class="border border-black rounded-md p-2 h-full"
        :value="modelValue"
        @change="updateSelectedMonth($event.target.value)"
      >
        <option v-for="option in monthOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
