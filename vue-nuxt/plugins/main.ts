import Ajax from "~/lib/ajax";
import Util from "~/lib/util";
export default defineNuxtPlugin(() => {
  Ajax.get("/AbpUserConfiguration/GetAll").then((data) => {
    Util.abp = Util.extend(true, Util.abp, data.data.result);
  });
});
