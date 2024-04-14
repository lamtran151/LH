import { defineStore } from "pinia";
import Util from "../../lib/util";
import ajax from "../../lib/ajax";
import appconst from "../../lib/appconst";

interface UserPayloadInterface {
  TenancyName: string;
  UserNameOrEmailAddress: string;
  Password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser(payload: UserPayloadInterface) {
      // useFetch from nuxt 3
      let rep = await ajax.post("/api/TokenAuth/Authenticate", payload);
      window.abp.auth.setToken(
        rep.data.result.accessToken,
        new Date(new Date().getTime() + 1000 * rep.data.result.expireInSeconds)
      );
      window.abp.utils.setCookieValue(
        appconst.authorization.encrptedAuthTokenName,
        rep.data.result.encryptedAccessToken,
        new Date(new Date().getTime() + 1000 * rep.data.result.expireInSeconds),
        window.abp.appPath
      );
      this.authenticated = true;
      if (process.client) {
        await ajax.get("/api/PASUserConfiguration/GetAll").then((data) => {
          Util.abp = Util.extend(true, Util?.abp, data.data.result);
        });
      }
    },
    logUserOut() {
      localStorage.clear();
      sessionStorage.clear();
      window.abp.auth.clearToken();
    },
  },
});
