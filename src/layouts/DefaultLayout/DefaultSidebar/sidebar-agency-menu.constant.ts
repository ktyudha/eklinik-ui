import homeIcon from '@/assets/icons/home.svg'
import chartIcon from '@/assets/icons/chart-pie-alt.svg'
import universityIcon from '@/assets/icons/university.svg'
import usersIcon from '@/assets/icons/users.svg'

const sidebarAgencyMenus = [
  {
    icon: homeIcon,
    name: 'Dashboard',
    isDropdown: false,
    url: '/agency/dashboard',
  },
  {
    icon: universityIcon,
    name: 'Satuan Pendidikan',
    isDropdown: false,
    url: '/agency/education-units',
  },
  {
    icon: usersIcon,
    name: 'Peserta Didik',
    isDropdown: false,
    url: '/agency/student-cities',
  },
  {
    icon: chartIcon,
    name: 'Report Tracer',
    isDropdown: false,
    url: '/agency/reports',
  },
]

export default sidebarAgencyMenus
