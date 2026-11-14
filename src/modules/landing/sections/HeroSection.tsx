import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import HeroImageMobile from "@assets/images/hero-mobile.png";
import HeroFilterSection from "./hero/HeroTab/HeroFilterSection";
import useGlobalStore from "@/store/useStore";
import { UilListOl, UilHospital, UilFileMedicalAlt, UilStethoscopeAlt, UilAngleRight } from "@iconscout/react-unicons";
import HeroJadwalSection from "./hero/HeroJadwalSection";
import HeroLokasiSection from "./hero/HeroLokasiSection";

const services = [
  { icon: UilListOl, label: "Ambil Antrian", hint: "Daftar tanpa menunggu lama", to: "/queue" },
  { icon: UilStethoscopeAlt, label: "Layanan", hint: "Pemeriksaan & konsultasi", to: "/#home" },
  { icon: UilFileMedicalAlt, label: "Medical Check Up", hint: "Pantau kesehatan rutin", to: "/#home" },
  { icon: UilHospital, label: "Persalinan", hint: "Pendampingan bidan profesional", to: "/#home" },
];

const HeroSection: FunctionComponent = () => {
  const activeHeroTab = useGlobalStore((s) => s.activeHeroTab);

  return (
    <section id="home" className="min-w-full min-h-screen bg-base-200 md:bg-hero-desktop md:bg-center md:bg-cover md:bg-no-repeat md:relative">
      <div className="relative md:hidden">
        <img src={HeroImageMobile} className="w-full" alt="" />
        <div className="absolute bottom-0 left-0 w-full h-[10vh] bg-gradient-to-t from-base-200" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 md:min-h-[85vh] md:relative pb-24">
        <div className="pt-4 md:pt-12 mb-6 md:mb-10">
          <span className="inline-block rounded-full bg-primary/10 text-primary text-xs md:text-sm font-semibold px-3 py-1">
            Klinik Bidan Susenowati, S.ST.
          </span>
          <h1 className="mt-3 text-3xl md:text-6xl font-bold text-slate-800 leading-tight">
            Yang berarti,<br /><span className="text-primary">segera kembali.</span>
          </h1>
          <p className="mt-3 max-w-md text-slate-600 md:text-lg">Daftar antrian, lihat jadwal bidan, dan cek riwayat pemeriksaan Anda dari satu tempat.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/queue" className="btn btn-primary">Ambil Antrian</Link>
            <Link to="/history" className="btn btn-outline btn-primary bg-white/70">Riwayat Saya</Link>
          </div>
        </div>

        <div className="surface p-6 max-w-sm">
          <HeroFilterSection />
          {activeHeroTab === "jadwal" ? <HeroJadwalSection /> : <HeroLokasiSection />}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 md:absolute md:bottom-10 md:left-6 md:right-6">
          {services.map(({ icon: Icon, label, hint, to }) => (
            <Link key={label} to={to} className="group flex items-center gap-3 surface surface-hover p-4 md:p-5">
              <span className="h-11 w-11 shrink-0 rounded-xl bg-primary/10 text-primary grid place-items-center"><Icon size={26} /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-sm md:text-base text-slate-800">{label}</span>
                <span className="hidden md:block text-xs text-slate-500 truncate">{hint}</span>
              </span>
              <UilAngleRight size={20} className="hidden md:block text-slate-300 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
