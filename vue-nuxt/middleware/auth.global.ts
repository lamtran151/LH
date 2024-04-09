import { abpBase } from "~/lib/abpbase";
import sidebarItem from "../store/data/sidebarItem";
import Util from "../lib/util";

function findElementByUrl(url: string, items: any) {
  for (const item of items) {
    if (item.url === url) {
      return item;
    }
    if (item.submenu && item.submenu.length > 0) {
      const found: any = findElementByUrl(url, item.submenu);
      if (found) {
        return found;
      }
    }
  }
  return null;
}
export default defineNuxtRouteMiddleware((to, from) => {
  debugger;
  if (to.matched.length === 0) {
    return navigateTo("/auth/404", { redirectCode: 301 });
  }
  if (to.params.id === "1") {
    return abortNavigation();
  }
  if (process.client) {
    if (
      to.path !== "/auth/login" &&
      to.path !== "/auth/401" &&
      to.path !== "/auth/404"
    ) {
      if (!window?.abp?.auth?.getToken()) return navigateTo("/auth/login");

      let permissionName = findElementByUrl(to.path, sidebarItem)?.permission;

      const { hasPermission } = abpBase();

      const permission = hasPermission(permissionName);

      if (!permission && to.path !== "/401") {
        return navigateTo("/auth/401");
      }
    }

    // if(from.path == '/auth/login'){
    //   if (window?.abp?.auth?.getToken()) return navigateTo(from.path == to.path ? '/' : to.path)
    // }
  }

  // if(!window.abp.auth.getToken() && to.path !== '/auth/login'){
  //   return navigateTo('/auth/login',)
  // }
  // else if(!window.abp.auth.getToken() && to.path !== "/"){
  //   return navigateTo('/')
  // }
  // sidebarItem.filter(x=>!x.submenu).forEach(element => {
  //   if(element.url == to.path){
  //     permissionName = element.submenu
  //   }
  // });
  // sidebarItem.filter(x=>x.submenu).forEach(element => {
  //   if(element.url == to.path){
  //     permissionName.value= element.
  //   }
  // });

  //     const { hasPermission } = abpBase();
  //   const permission = hasPermission(to.permission); // Kết quả kiểm tra quyền (true hoặc false)

  //   if (!hasPermission) {
  //     // Nếu người dùng không có quyền, chuyển hướng đến trang thông báo không có quyền
  //     return redirect('/403'); // Thay '/403' bằng đường dẫn của trang thông báo không có quyền trong ứng dụng của bạn
  //   }
  //     if (to.params.id === '1') {
  //       return abortNavigation()
  //     }
  //     // In a real app you would probably not redirect every route to `/`
  //     // however it is important to check `to.path` before redirecting or you
  //     // might get an infinite redirect loop
  //     if (to.path !== '/') {
  //       return navigateTo('/')
  //     }
});
