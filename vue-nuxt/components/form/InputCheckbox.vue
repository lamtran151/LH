<template>
  <input :id="id" class="form-check-input" type="checkbox" @change="changeInput">
  <label class="form-check-label" :for="id">Remember me</label>
</template>

<script setup lang="ts">
const props = defineProps({
  classLabel: String,
  labelName: String,
  id: String,
  classInput: String,
  entity: Object,
  modelValue: Boolean
});
const { $bus } = useNuxtApp() as unknown as NuxtBus

const emits = defineEmits(['update:modelValue']);

const changeInput = () => {
  debugger
  emits('update:modelValue', (<HTMLInputElement>event?.target).checked)
  $bus.$emit("changeInput", props.entity)
}
</script>