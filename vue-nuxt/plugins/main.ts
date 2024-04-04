import Ajax from "~/lib/ajax";
import Util from "~/lib/util";
export default defineNuxtPlugin(() => {
  Ajax.get("/api/PASUserConfiguration/GetAll").then((data) => {
    abp = Util.extend(true, abp, data.data.result);
  });
});
