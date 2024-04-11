<template>
  <label :for="id" class="form-label w-full flex flex-col sm:flex-row">
    {{ labelName }}
  </label>
  <input :id="id" @input="$emit('update:modelValue', (<HTMLInputElement>$event?.target).value)" @change="changeInput"
    type="text" :name="name" class="form-control" :placeholder="placeholder">
</template>

<script setup lang="ts">
const props = defineProps({
  classLabel: String,
  labelName: String,
  id: String,
  type: String,
  name: String,
  classInput: String,
  placeholder: String,
  entity: Object,
  modelValue: String
});
const { $bus } = useNuxtApp() as unknown as NuxtBus

const emits = defineEmits(['update:modelValue']);

const changeInput = () => {
  $bus.$emit("changeInput", props.entity)
}
</script>