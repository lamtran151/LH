import appconst from './appconst'
export const abpBase = () =>{
    const L = (value:string,source?:string,...argus:string[]):string => {
        if(source){
            return window.abp.localization.localize(value,source,argus);
        }else{
            return window.abp.localization.localize(value,appconst.localization.defaultLocalizationSourceName,argus);
        }
        
    }
    const hasPermission = (permissionName:string) => {
        return window.abp.auth.hasPermission(permissionName);
    }
    const hasAnyOfPermissions = (...argus:string[]) => {
        return window.abp.auth.hasAnyOfPermissions(...argus);
    }
    const hasAllOfPermissions = (...argus:string[]) => {
        return window.abp.auth.hasAllOfPermissions(...argus);
    }

    return {
        L,
        hasPermission,
        hasAnyOfPermissions,
        hasAllOfPermissions
      }
}