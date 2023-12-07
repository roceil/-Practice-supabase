<script setup>
defineProps({
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
</script>

<template>
  <div class="FormInput">
    <input
      class="border border-black rounded-md p-2 w-full focus:outline-black"
      :type="itemName === '密碼' || itemName === '確認密碼' ? 'password' : 'text'"
      :id="itemName"
      :value="modelValue"
      :placeholder="itemName"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

