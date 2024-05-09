<template>
  <input :id="id" class="form-check-input" type="checkbox" @change="changeInput" :checked="isChecked" @blur="updateBlur(internalValue)">
  <label class="form-check-label" :for="id">{{ labelName }}</label>
</template>

<script setup lang="ts">
import { useField, FieldOptions } from 'vee-validate';
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

const updateValue = (value: any) => {
    handleChange(value)
  emits('update:modelValue', value)
}

const { value: internalValue, errorMessage, handleBlur, handleChange } = useField<string>(
      props.name!,
      (value: any) => value,
      props.modelValue as Partial<FieldOptions<string>>
    );

    const updateBlur = (value: any) => {
  handleBlur(value)
  emits('update:modelValue', value)
}
const isChecked = computed(() => {
  console.log(internalValue.value)
  if(props.isMultiple){
    return Array.isArray(props.modelValue) && props.modelValue?.includes(props?.value!.toUpperCase())
  }
  else{
    return props.modelValue
  }
});

watch(() => props?.entity![props?.name!], () => {
  console.log(props?.entity![props?.name!]);
  updateValue(props?.entity![props?.name!]);
});
</script>