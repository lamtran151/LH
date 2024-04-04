import Ajax from "~/lib/ajax";
import Util from "~/lib/util";
export default defineNuxtPlugin(() => {
  Ajax.get("/AbpUserConfiguration/GetAll").then((data) => {
    // window.abp = Util.extend(true, window.abp, data.data.result);
  });
});
