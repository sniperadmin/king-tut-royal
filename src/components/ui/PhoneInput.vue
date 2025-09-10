<!-- your-component.vue-->
<template>
  <vue-tel-input
    v-model="internalValue"
    :mode="mode"
    :inputOptions="inputOptions"
  ></vue-tel-input>
</template>
<script>
  import { defineAsyncComponent } from 'vue';

  const VueTelInput = defineAsyncComponent(() =>
    Promise.all([
      import('vue-tel-input'),
      import('vue-tel-input/vue-tel-input.css'),
    ]).then(([{ VueTelInput }]) => VueTelInput)
  );

  export default {
    components: {
      VueTelInput,
    },
    props: {
      modelValue: String,
      mode: { type: String, default: 'international' },
      inputOptions: { type: Object, default: () => ({}) }
    },
    data() {
      return {
        internalValue: this.modelValue
      }
    },
    watch: {
      modelValue(newValue) {
        this.internalValue = newValue;
      },
      internalValue(newValue) {
        this.$emit('update:modelValue', newValue);
      }
    }
  };
</script>