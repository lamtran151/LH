import { abpBase } from '~/lib/abpbase';
import sidebarItem from 'store/data/sidebarItem';
import Util from '../lib/util';

export default defineNuxtRouteMiddleware((to, from) => {
    console.log(from);
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
  })