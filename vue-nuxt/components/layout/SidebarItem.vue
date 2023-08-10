<script setup lang="ts">
import { useSidebarStore } from "~/store/sidebar";
import { abpBase } from "~/lib/abpbase";

interface Item {
  name: string;
  url?: string;
  key?: string;
  icon: string;
  submenu: Array<Item>;
}

interface Props {
  item: Item;
  level: number;
}

const props = defineProps<Props>();
const rfgyhrt = abpBase()
// const { type } = useBreakpoints()
// const animationOpenClose = useAnimationOpenClose()
const sidebarStore = useSidebarStore().$patch;
const route = useRoute();
const isOpen = ref(false);
const isShowMenu = ref(true);
const toggleOpen = (activeMenu: boolean) => {
  if (!isShowMenu.value || !activeMenu) {
    isOpen.value = !isOpen.value;
  }
  isShowMenu.value = false;
};
</script>

<template>
  <li v-if="item.submenu.length === 0">
    <nuxt-link
      :href="item.url"
      class="side-menu"
      :class="route.path == item.url ? 'side-menu--active' : ''"
    >
      <div class="side-menu__icon"><LazyCustomIcon :name="item.icon" /></div>
      <div class="side-menu__title">{{ item.name }}</div>
    </nuxt-link>
  </li>
  <li v-else>
    <nuxt-link
      :to="item.url"
      class="side-menu"
      :class="
        item.submenu.filter((x) => x.url == route.path).length > 0
          ? 'side-menu--active'
          : ''
      "
      @click="
        toggleOpen(item.submenu.filter((x) => x.url == route.path).length > 0)
      "
    >
      <div class="side-menu__icon"><LazyCustomIcon :name="item.icon" /></div>
      <div class="side-menu__title">
        {{ item.name }}
        <div class="side-menu__sub-icon transform rotate-180">
          <LazyCustomIcon
            :name="
              isOpen ||
              item.submenu.filter((x) => x.url == route.path).length > 0
                ? 'ChevronDown'
                : 'ChevronUp'
            "
          />
        </div>
      </div>
    </nuxt-link>
    <ul
      class="side-menu__sub-open"
      v-show="
        isOpen ||
        (item.submenu.filter((x) => x.url == route.path).length > 0 &&
          isShowMenu)
      "
    >
      <template v-for="sub in item.submenu" :key="item.key">
        <SidebarItem :item="sub" :level="level + 1" />
      </template>
    </ul>
  </li>
</template>
