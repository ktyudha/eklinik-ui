
import {
  // UilAccessibleIconAlt,
  UilSetting,
  UilSilence,
  UilMedkit,
  UilCapsule,
  UilSchedule,
  UilClinicMedical,
  UilListOl
} from "@iconscout/react-unicons";

const sidebarMenus = [
  {
    icon: UilClinicMedical,
    name: "Beranda",
    isDropdown: false,
    url: "/admin/dashboard",
  },

  {
    icon: UilSetting,
    name: "Pengaturan",
    isDropdown: true,
    url: "/admin/settings",
    hasSubmenu: true,
    submenuLinks: [
      {
        subUrl: "/admin/settings/medical-record",
        label: "Master Rekam Medis",
        forceShow: true,
      },
    ],
  },
  // {
  //   icon: UilSchedule,
  //   name: "Jadwal Bidan",
  //   isDropdown: true,
  //   url: "/admin/surveys",
  //   hasSubmenu: true,
  //   submenuLinks: [
  //     {
  //       subUrl: "/admin/surveys/academic-year",
  //       label: "Master Tahun Pelajaran",
  //       forceShow: true,
  //     },
  //   ],
  // },
  {
    icon: UilSchedule,
    name: "Jadwal Bidan",
    isDropdown: false,
    url: "/admin/schedules",
  },
  {
    icon: UilSilence,
    name: "Pasien",
    isDropdown: false,
    url: "/admin/patient",
  },
  // {
  //   icon: UilAccessibleIconAlt,
  //   name: "Rawat Jalan",
  //   isDropdown: true,
  //   url: "/admin/outpatient",
  //   hasSubmenu: true,
  //   submenuLinks: [
  //     {
  //       subUrl: "/admin/surveys/academic-year",
  //       label: "Booking",
  //       forceShow: true,
  //     },
  //     {
  //       subUrl: "/admin/surveys/academic-year",
  //       label: "Rgistrasi",
  //       forceShow: true,
  //     },
  //     {
  //       subUrl: "/admin/outpatient/appointments",
  //       label: "Antrian",
  //       forceShow: true,
  //     },
  //   ],
  // },
  // {
  //   icon: UilBed,
  //   name: "Rawat Inap",
  //   isDropdown: true,
  //   url: "/admin/surveys",
  //   hasSubmenu: true,
  //   submenuLinks: [
  //     {
  //       subUrl: "/admin/surveys/academic-year",
  //       label: "Booking",
  //       forceShow: true,
  //     },
  //     {
  //       subUrl: "/admin/surveys/academic-year",
  //       label: "Rgistrasi",
  //       forceShow: true,
  //     },
  //     {
  //       subUrl: "/admin/surveys/academic-year",
  //       label: "Antrian",
  //       forceShow: true,
  //     },
  //   ],
  // },
  {
    icon: UilListOl,
    name: "Antrian",
    isDropdown: false,
    url: "/admin/appointments",
  },
  {
    icon: UilMedkit,
    name: "Rekam Medis",
    isDropdown: false,
    url: "/admin/medical-record",
  },
  {
    icon: UilCapsule,
    name: "Farmasi",
    isDropdown: true,
    hasSubmenu: true,
    url: "/admin/medicine",
    submenuLinks: [
      {
        subUrl: "/admin/medicine/category",
        label: "Jenis Obat",
        forceShow: true,
      },
      {
        subUrl: "/admin/medicine/medicines",
        label: "Obat",
        forceShow: true,
      },
      // {
      //   subUrl: "/admin/medicine/recipes",
      //   label: "Resep",
      //   forceShow: true,
      // },
    ],
  },
  // {
  //   icon: UilInvoice,
  //   name: "Pembayaran",
  //   isDropdown: false,
  //   url: "/admin/invoice",
  // },
  // {
  //   icon: UilFileMedicalAlt,
  //   name: "Laporan",
  //   isDropdown: true,
  //   url: "/admin/surveys",
  //   hasSubmenu: true,
  //   submenuLinks: [
  //     {
  //       subUrl: "/admin/surveys/academic-year",
  //       label: "Booking",
  //       forceShow: true,
  //     },
  //     {
  //       subUrl: "/admin/surveys/academic-year",
  //       label: "Rgistrasi",
  //       forceShow: true,
  //     },
  //     {
  //       subUrl: "/admin/surveys/academic-year",
  //       label: "Antrian",
  //       forceShow: true,
  //     },
  //   ],
  // },
];

export default sidebarMenus;
