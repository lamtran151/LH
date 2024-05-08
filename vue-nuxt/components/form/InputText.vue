<template>
  <label :for="id" class="form-label w-full flex flex-col sm:flex-row">
    {{ labelName }}
  </label>
  <input :id="id" @input="$emit('update:modelValue', (<HTMLInputElement>$event?.target).value)" @change="changeInput"
    type="text" :name="name" class="form-control" :placeholder="placeholder" :value="internalValue" @blur="updateBlur(internalValue)">
    <span class="text-red-500">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
import { useField, FieldOptions } from 'vee-validate';
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

let entityCopy = {...props.entity}
const { $bus } = useNuxtApp() as unknown as NuxtBus

const emits = defineEmits(['update:modelValue']);

const changeInput = () => {
  $bus.$emit("changeInput", props.entity)
}

const { value: internalValue, errorMessage, handleBlur, handleChange } = useField<string>(
      props.name!,
      (value: any) => value,
      props.modelValue as Partial<FieldOptions<string>>
    );
const updateValue = (value: any) => {
    handleChange(value)
  emits('update:modelValue', value)
}

const updateBlur = (value: any) => {
  handleBlur(value)
  emits('update:modelValue', value)
}
watch(() =>props?.entity![props?.name!], () => {
  console.log("entity: "+JSON.stringify(props?.entity))
  if(props?.entity![props?.name!]){
    updateValue(props?.entity![props?.name!]);
  }
})
</script>