<template>
    <component
      :is="icon"
      :size="size"
      :color="color"
      :class="class"
      :stroke-width="strokeWidth"
    />
  </template>
  
  <script setup lang="ts">
  import * as icons from "lucide-vue-next";
  
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    size: Number,
    color: String,
    class: String,
    strokeWidth: String,
  });
  const icon = computed(() => icons[props.name as keyof typeof icons]);
  </script>
  