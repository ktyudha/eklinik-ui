// import homeIcon from '@/assets/icons/home.svg'
// import usersIcon from '@/assets/icons/users.svg'
import homeIcon from '@/assets/icons/home.svg'
import usersIcon from '@/assets/icons/users.svg'
import otherIcon from '@/assets/icons/other.svg'
import universityIcon from '@/assets/icons/university.svg'
import chartIcon from '@/assets/icons/chart-pie-alt.svg'
// import progressIcon from '@/assets/icons/chart-line.svg'

const sidebarMenus = [
  {
    icon: homeIcon,
    name: 'Dashboard',
    isDropdown: false,
    url: '/admin/dashboard',
  },
  {
    icon: homeIcon,
    name: 'Manajemen Dinas',
    isDropdown: false,
    url: '/admin/agencies',
  },
  {
    icon: universityIcon,
    name: 'Satuan Pendidikan',
    isDropdown: false,
    url: '/admin/education-units',
  },
  {
    icon: usersIcon,
    name: 'Peserta Didik',
    isDropdown: false,
    url: '/admin/student-cities',
  },
  {
    icon: otherIcon,
    name: 'Manajemen Survei',
    isDropdown: true,
    url: '/admin/surveys',
    hasSubmenu: true,
    submenuLinks: [
      {
        subUrl: '/admin/surveys/academic-year',
        label: 'Master Tahun Pelajaran',
        forceShow: true,
      },
      {
        subUrl: '/admin/surveys/package',
        label: 'Master Paket',
        forceShow: true,
      },
      {
        subUrl: '/admin/surveys/group',
        label: 'Master Grup',
        forceShow: true,
      },
      {
        subUrl: '/admin/surveys/question',
        label: 'Master Pertanyaan',
        forceShow: true,
      },
      {
        subUrl: '/admin/surveys/profile-survey',
        label: 'Profil Survei',
        forceShow: true,
      },
      {
        subUrl: '/admin/surveys/participant-survey',
        label: 'Peserta Survei',
        forceShow: true,
      },
      {
        subUrl: '/admin/surveys/schedule-survey',
        label: 'Penjadwalan Survei',
        forceShow: true,
      },
    ],
  },
  {
    icon: chartIcon,
    name: 'Report Tracer',
    isDropdown: false,
    url: '/admin/reports',
  },
]

export default sidebarMenus
