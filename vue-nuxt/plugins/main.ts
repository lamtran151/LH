import Ajax from "~/lib/ajax";
import Util from "~/lib/util";
export default defineNuxtPlugin(async () => {
  await Ajax.get("/api/PASUserConfiguration/GetAll").then((data) => {
    Util.abp = Util.extend(true, Util.abp, data.data.result);
  });
});
