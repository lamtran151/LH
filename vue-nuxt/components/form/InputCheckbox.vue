<template>
  <input :id="id" class="form-check-input" type="checkbox" @change="changeInput" :value="value">
  <label class="form-check-label" :for="id">{{ labelName }}</label>
</template>

<script setup lang="ts">
const props = defineProps({
  classLabel: String,
  labelName: String,
  id: String,
  classInput: String,
  entity: Object,
  name: String,
  value: String,
  isMultiple: Boolean,
  modelValue: [Boolean,Array<String>]
});
const { $bus } = useNuxtApp() as unknown as NuxtBus

const emits = defineEmits(['update:modelValue']);

const changeInput = () => {
  let value
  if(props.isMultiple){
    value = props?.entity?.[props.name!] == undefined ? [(<HTMLInputElement>event?.target).value] : [...props?.entity?.[props.name!], (<HTMLInputElement>event?.target).value]
  }
  else{
    value = (<HTMLInputElement>event?.target).checked
  }
  emits('update:modelValue', value)
  $bus.$emit("changeInput", props.entity)
}
</script>