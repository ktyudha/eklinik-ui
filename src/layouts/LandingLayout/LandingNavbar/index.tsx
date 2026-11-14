import { FunctionComponent, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useLogout } from "@/services/auth/login/hooks/useLogout";
import useGlobalStore from "@/store/useStore";
import Logo from "@/assets/logo/logo-bidan-susenowati.svg";

const anchors = [
  { label: "Layanan", href: "/#layanan" },
  { label: "Jadwal", href: "/#jadwal" },
  { label: "Cara daftar", href: "/#cara-daftar" },
  { label: "Lokasi", href: "/#lokasi" },
];
const patientLinks = [{ label: "Antrian", to: "/queue" }, { label: "Riwayat", to: "/history" }, { label: "Akun", to: "/account" }];

const LandingNavbar: FunctionComponent = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { userRole, isLoggedIn, setIsLoggedIn } = useGlobalStore((s) => ({ userRole: s.userRole, isLoggedIn: s.isLoggedIn, setIsLoggedIn: s.setIsLoggedIn }));

  const logout = async () => {
    const { data, error } = await useLogout();
    if (data || error) {
      if (data) {
        if (userRole === "patient") { Cookies.remove("token-patient"); setIsLoggedIn(false); }
        navigate("/", { replace: true });
      } else toast.error("Gagal keluar", { position: toast.POSITION.TOP_CENTER });
    }
  };

  const link = "rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors";

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="shrink-0"><img src={Logo} alt="Bidan Susenowati" className="h-9 md:h-10" /></Link>

        <nav className="hidden items-center gap-1 md:flex">
          {anchors.map((a) => <a key={a.href} href={a.href} className={link}>{a.label}</a>)}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isLoggedIn ? (
            <>
              {patientLinks.map((p) => <NavLink key={p.to} to={p.to} className={({ isActive }) => `${link} ${isActive ? "!text-brand-600 bg-brand-50" : ""}`}>{p.label}</NavLink>)}
              <button onClick={logout} className="btn btn-sm btn-ghost">Keluar</button>
            </>
          ) : (
            <>
              <Link to="/admin/login" className="text-sm font-medium text-gray-500 hover:text-gray-800">Tenaga kesehatan</Link>
              <Link to="/login" className="btn btn-primary btn-sm">Masuk</Link>
            </>
          )}
        </div>

        <button className="grid h-10 w-10 place-items-center rounded-lg hover:bg-gray-100 md:hidden" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          <nav className="flex flex-col py-2">
            {anchors.map((a) => <a key={a.href} href={a.href} onClick={() => setOpen(false)} className={link}>{a.label}</a>)}
          </nav>
          {isLoggedIn ? (
            <button onClick={logout} className="btn btn-outline btn-primary w-full">Keluar</button>
          ) : (
            <div className="grid gap-2"><Link to="/login" className="btn btn-primary">Masuk sebagai pasien</Link><Link to="/admin/login" className="btn btn-ghost">Masuk tenaga kesehatan</Link></div>
          )}
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
