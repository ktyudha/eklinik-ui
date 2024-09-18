import homeIcon from "@/assets/icons/home.svg";
import chartIcon from "@/assets/icons/chart-pie-alt.svg";
import universityIcon from "@/assets/icons/university.svg";
import usersIcon from "@/assets/icons/users.svg";

const sidebarSubAgencyMenus = [
  {
    icon: homeIcon,
    name: "Dashboard",
    isDropdown: false,
    url: "/sub-agency/dashboard",
  },
  {
    icon: universityIcon,
    name: "Satuan Pendidikan",
    isDropdown: false,
    url: "/sub-agency/education-units",
  },
  {
    icon: usersIcon,
    name: "Peserta Didik",
    isDropdown: false,
    url: "/sub-agency/student-cities",
  },
  {
    icon: chartIcon,
    name: "Report Tracer",
    isDropdown: false,
    url: "/sub-agency/reports",
  },
];

export default sidebarSubAgencyMenus;
