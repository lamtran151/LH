export default [
  {
    name: "System Management",
    url: "",
    icon: "Home",
    submenu: [
      {
        name: "Users",
        url: "/system/users",
        permission: "Pages.Users",
        icon: "Activity",
        submenu: [],
      },
      {
        name: "Roles",
        url: "/system/roles",
        permission: "Pages.Roles",
        icon: "Activity",
        submenu: [],
      },
      {
        name: "Tenants",
        url: "/system/tenants",
        permission: "Pages.Tenants",
        icon: "Activity",
        submenu: [],
      },
    ],
  }
];
