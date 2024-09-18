const navbarMenus = [
  {
    name: "Beranda",
    isDropdown: false,
    url: "/",
  },
  {
    name: "FAQ",
    isDropdown: false,
    url: "/faq",
  },
  {
    name: "Panduan",
    isDropdown: true,
    url: "/panduan",
    hasSubmenu: true,
    submenuLinks: [
      {
        subUrl: "/panduan/alumni/panduan-alumni-smk",
        label: "Panduan Alumni SMK",
        forceShow: true,
      },
      {
        subUrl: "/panduan/alumni/video-panduan-alumni-smk",
        label: "Video Panduan Alumni SMK",
        forceShow: true,
      },
      {
        subUrl: "/panduan/alumni/panduan-alumni-sma",
        label: "Panduan Alumni SMA",
        forceShow: true,
      },
      {
        subUrl: "/panduan/alumni/video-panduan-alumni-sma",
        label: "Video Panduan Alumni SMA",
        forceShow: true,
      },
    ],
  },
  {
    name: "Regulasi",
    isDropdown: false,
    url: "/regulasi",
  },
  {
    name: "Kontak Bantuan",
    isDropdown: false,
    url: "/kontak-bantuan",
  },
];

export default navbarMenus;
