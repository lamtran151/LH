import { defineStore } from "pinia";
import Util from "../../lib/util";
import ajax from "../../lib/ajax";
import appconst from "../../lib/appconst";
import Role from '../entities/roles/role'
import CreateUser from "../entities/users/CreateUser";
import ResResult from "../entities/res-result";
import User from "../entities/users/user";

export const useUserStore = defineStore("user", {
    state: () => ({
        res: new ResResult,
        roles: new Array<Role>()
    }),
    actions: {
      async createUser(payload: any) {
        // useFetch from nuxt 3
        
        let res: any = await ajax.post('/api/User/Create',payload);
        this.res = res.data
      },
      async getRoles() {
        // useFetch from nuxt 3
        let res = await ajax.get('/api/User/GetRoles');
        this.roles = res.data.result.items as Role[];
      },
      async getUserById(id: bigint) {
        // useFetch from nuxt 3
        let res = await ajax.get('/api/User/GetById', {
          params: {
            id: id
          }
        });
        
        this.res = res.data;
      },
    },
  });