<!-- PhoneInput.vue -->
<template>
  <VueTelInput
    v-model="internalValue"
    :mode="mode"
    :inputOptions="inputOptions"
  />
</template>

<script setup>
import { ref, watch, defineAsyncComponent } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'international'
  },
  inputOptions: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

watch(() => props.modelValue, val => {
  if (val !== internalValue.value) {
    internalValue.value = val;
  }
});

watch(internalValue, val => {
  if (val !== props.modelValue) {
    emit('update:modelValue', val);
  }
});

const VueTelInput = defineAsyncComponent(() =>
  Promise.all([
    import('vue-tel-input'),
    import('vue-tel-input/vue-tel-input.css'),
  ]).then(([{ VueTelInput }]) => VueTelInput)
);
</script>