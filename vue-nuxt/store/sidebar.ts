import { defineStore } from 'pinia';
import sidebarItem from './data/sidebarItem';
import { abpBase } from '~/lib/abpbase';
const sidebar:any = sidebarItem
const filterMenuByPermission = (menuList:any) => {
  const { hasPermission } = abpBase();
  const filteredMenu = menuList.filter((item:any) => {
    // Kiểm tra quyền truy cập cho từng mục menu dựa trên item.permission (nếu có)
    if (item.permission) {
      return hasPermission(item.permission);
    }

    // Nếu mục menu không có quyền (item.permission không được định nghĩa), cho phép truy cập
    return true;
  });

  // Đệ quy để lọc menu con
  filteredMenu.forEach((item:any) => {
    if (item.submenu) {
      item.submenu = filterMenuByPermission(item.submenu);
    }
  });
console.log(filteredMenu)
  return filteredMenu;
};

export const useSidebarStore = defineStore('sidebar', {
  state() {
    // Khởi tạo state của store
    return {
      menuList: reactive(sidebar)
    };
  },

  actions: {
    // Tạo một action để cập nhật danh sách menu
    updateMenuList() {
      // Gọi hàm filterMenuByPermission và cập nhật giá trị của state.menuList
      this.menuList = filterMenuByPermission(sidebarItem);
    }
  }
});