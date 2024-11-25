import axios from "axios";
import appconst from "./appconst";
import { useToast } from 'tailvue'
let $toast = null
if(process.client){
  $toast = useToast()
}
const ajax = axios.create({
  baseURL: appconst.remoteServiceBaseUrl,
  timeout: 30000,
});
ajax.interceptors.request.use(
  function (config) {
    if (!!window.abp.auth.getToken()) {
      config.headers.common["Authorization"] =
        "Bearer " + window.abp.auth.getToken();
    }
    config.headers.common[".AspNetCore.Culture"] =
    window.abp.utils.getCookieValue("Abp.Localization.CultureName");
    config.headers.common["Abp.TenantId"] =
    window.abp.multiTenancy.getTenantIdCookie();
    return config;
  },
  function (error) {
    
    return error;
  }
);
ajax.interceptors.response.use(
  (respon) => {
    return respon;
  },
  (error) => {
    $toast?.show({message: error.response.data.error.message, type: "danger"});
    return error.response.data;
  }
);
export default ajax;
