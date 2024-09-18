import homeIcon from "@/assets/icons/home.svg";
import usersIcon from "@/assets/icons/users.svg";
import universityIcon from "@/assets/icons/university.svg";
import chartIcon from "@/assets/icons/chart-pie-alt.svg";
import progressIcon from "@/assets/icons/chart-line.svg";

const sidebarSchoolMenus = [
  {
    icon: homeIcon,
    name: "Dashboard",
    isDropdown: false,
    url: "/school/dashboard",
  },
  {
    icon: universityIcon,
    name: "Satuan Pendidikan",
    isDropdown: false,
    url: "/school/education-units",
  },
  {
    icon: usersIcon,
    name: "Biodata Alumni",
    isDropdown: false,
    url: "/school/students",
  },
  {
    icon: progressIcon,
    name: "Progress Tracer",
    isDropdown: false,
    url: "/school/progress",
  },
  {
    icon: chartIcon,
    name: "Report Tracer",
    isDropdown: false,
    url: "/school/reports",
  },
  {
    icon: chartIcon,
    name: "Indeks Alumni [SNBP]",
    isDropdown: false,
    url: "/school/alumni-snbp",
  },
];

export default sidebarSchoolMenus;
