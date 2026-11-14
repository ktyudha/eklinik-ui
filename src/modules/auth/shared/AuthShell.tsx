import { FunctionComponent, ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo/logo-bidan-susenowati.svg";
import LogoWhite from "@/assets/logo/logo-bidan-susenowati-white.svg";

const points = ["Antrian & rekam medis terpadu", "Farmasi dan stok obat real-time", "Pencatatan pemberian obat yang aman"];

/** Layout dua panel: panel brand (desktop) + kartu form. */
const AuthShell: FunctionComponent<{ title: string; subtitle: string; children: ReactNode; footer?: ReactNode }> = ({ title, subtitle, children, footer }) => (
  <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">
    <aside className="hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-to-br from-brand-800 via-brand-600 to-brand-400 relative overflow-hidden">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10" />
      <div className="absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-white/5" />
      <img src={LogoWhite} alt="Bidan Susenowati" className="h-14 w-auto self-start relative" />
      <div className="relative">
        <h2 className="text-4xl font-bold leading-tight">Pelayanan kesehatan yang rapi, cepat, dan aman.</h2>
        <ul className="mt-8 space-y-3 text-white/90">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3"><span className="h-6 w-6 rounded-full bg-white/20 grid place-items-center text-sm">✓</span>{p}</li>
          ))}
        </ul>
      </div>
      <p className="relative text-sm text-white/70">© {new Date().getFullYear()} Klinik Bidan Susenowati, S.ST.</p>
    </aside>

    <main className="flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="lg:hidden flex justify-center mb-8"><img src={Logo} alt="Bidan Susenowati" className="h-14" /></Link>
        <div className="rounded-2xl bg-base-100 border border-base-300 shadow-sm p-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-slate-500 mt-1 mb-6">{subtitle}</p>
          {children}
        </div>
        {footer && <div className="text-center text-sm text-slate-500 mt-5">{footer}</div>}
      </div>
    </main>
  </div>
);

export default AuthShell;
