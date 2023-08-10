<script setup lang="ts">
import { useSidebarStore } from "~/store/sidebar";
import SidebarItem from "./SidebarItem.vue";

const sidebarStore = useSidebarStore();
const menuList = ref([]);
onMounted(() => {
  sidebarStore.updateMenuList();
  menuList.value = sidebarStore.menuList
});
</script>

<template>
    <ul>
      <template v-for="sidebar in menuList">
        <SidebarItem :item="sidebar" :level="1" />
      </template>
    </ul>
  </template>