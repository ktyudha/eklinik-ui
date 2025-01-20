import { UilListOl, UilUser, UilHistory } from "@iconscout/react-unicons";

export const navbarMenus = [
  {
    name: "Antrian",
    isDropdown: false,
    icon: UilListOl,
    url: "/queue",
  },
  {
    name: "Riwayat",
    isDropdown: false,
    icon: UilHistory,
    url: "/history",
  },
  {
    name: "Akun",
    isDropdown: false,
    icon: UilUser,
    url: "/account",
  },
];
