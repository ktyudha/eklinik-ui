import {
  UilSetting,
  UilSilence,
  UilMedkit,
  UilCapsule,
  UilSchedule,
  UilClinicMedical,
  UilListOl,
  UilUsersAlt,
  UilReceipt,
  UilBox,
} from "@iconscout/react-unicons";

export interface SidebarMenu {
  icon: React.ElementType;
  name: string;
  url: string;
  isDropdown: boolean;
  hasSubmenu?: boolean;
  group: string;
  submenuLinks?: { subUrl: string; label: string; forceShow?: boolean }[];
}

/** Dikelompokkan berdasarkan alur kerja tenaga kesehatan. */
const sidebarMenus: SidebarMenu[] = [
  { group: "Utama", icon: UilClinicMedical, name: "Beranda", isDropdown: false, url: "/admin/dashboard" },

  // urutan = alur pasien di klinik
  { group: "Alur Pelayanan", icon: UilListOl, name: "Antrian", isDropdown: false, url: "/admin/appointments" },
  { group: "Alur Pelayanan", icon: UilSilence, name: "Pasien", isDropdown: false, url: "/admin/patient" },
  { group: "Alur Pelayanan", icon: UilMedkit, name: "Pemeriksaan", isDropdown: false, url: "/admin/medical-record" },
  { group: "Alur Pelayanan", icon: UilReceipt, name: "Pembayaran", isDropdown: false, url: "/admin/payments" },
  { group: "Alur Pelayanan", icon: UilCapsule, name: "Resep & Obat", isDropdown: false, url: "/admin/recipes" },

  { group: "Pengelolaan", icon: UilSchedule, name: "Jadwal Bidan", isDropdown: false, url: "/admin/schedules" },
  { group: "Pengelolaan", icon: UilBox, name: "Stok Obat", isDropdown: true, hasSubmenu: true, url: "/admin/medicine",
    submenuLinks: [
      { subUrl: "/admin/medicine/medicines", label: "Daftar obat", forceShow: true },
      { subUrl: "/admin/medicine/purchases", label: "Pembelian & batch", forceShow: true },
      { subUrl: "/admin/medicine/category", label: "Jenis obat", forceShow: true },
    ],
  },

  { group: "Administrasi", icon: UilUsersAlt, name: "Pengguna & Role", isDropdown: false, url: "/admin/users" },
  { group: "Administrasi", icon: UilSetting, name: "Pengaturan", isDropdown: true, hasSubmenu: true, url: "/admin/settings",
    submenuLinks: [{ subUrl: "/admin/settings/medical-record", label: "Form pemeriksaan", forceShow: true }],
  },
];

export default sidebarMenus;
