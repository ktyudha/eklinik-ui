import {
  UilAccessibleIconAlt,
  UilSetting,
  UilSilence,
  UilBed,
  UilMedkit,
  UilCapsule,
  UilInvoice,
  UilFileMedicalAlt,
  UilSchedule,
  UilClinicMedical,
} from "@iconscout/react-unicons";

const sidebarSubAgencyMenus = [
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
    url: "/admin/surveys",
    hasSubmenu: true,
    submenuLinks: [
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Master Tahun Pelajaran",
        forceShow: true,
      },
    ],
  },
  {
    icon: UilSchedule,
    name: "Jadwal Bidan",
    isDropdown: true,
    url: "/admin/surveys",
    hasSubmenu: true,
    submenuLinks: [
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Master Tahun Pelajaran",
        forceShow: true,
      },
    ],
  },
  {
    icon: UilSilence,
    name: "Pasien",
    isDropdown: false,
    url: "/admin/patient",
  },
  {
    icon: UilAccessibleIconAlt,
    name: "Rawat Jalan",
    isDropdown: true,
    url: "/admin/surveys",
    hasSubmenu: true,
    submenuLinks: [
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Booking",
        forceShow: true,
      },
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Rgistrasi",
        forceShow: true,
      },
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Antrian",
        forceShow: true,
      },
    ],
  },
  {
    icon: UilBed,
    name: "Rawat Inap",
    isDropdown: true,
    url: "/admin/surveys",
    hasSubmenu: true,
    submenuLinks: [
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Booking",
        forceShow: true,
      },
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Rgistrasi",
        forceShow: true,
      },
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Antrian",
        forceShow: true,
      },
    ],
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
    isDropdown: false,
    url: "/admin/farmacy",
  },
  {
    icon: UilInvoice,
    name: "Pembayaran",
    isDropdown: false,
    url: "/admin/invoice",
  },
  {
    icon: UilFileMedicalAlt,
    name: "Laporan",
    isDropdown: true,
    url: "/admin/surveys",
    hasSubmenu: true,
    submenuLinks: [
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Booking",
        forceShow: true,
      },
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Rgistrasi",
        forceShow: true,
      },
      {
        subUrl: "/admin/surveys/academic-year",
        label: "Antrian",
        forceShow: true,
      },
    ],
  },
];

export default sidebarSubAgencyMenus;
