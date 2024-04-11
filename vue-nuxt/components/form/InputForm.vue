<template>
    <label for="validation-form-1" class="form-label w-full flex flex-col sm:flex-row">
        Username
    </label>
    <input id="userName" @change="$bus.$emit('clickEvent', createUser)" type="text" name="userName" class="form-control"
        placeholder="John Legend">
</template>

<script setup lang="ts">
const props = defineProps({
    classLabel: String,
    id: String,
    type: String,
    name: String,
    classInput: String,
    placeholder: String
});
const { $bus } = useNuxtApp() as unknown as NuxtBus
</script>