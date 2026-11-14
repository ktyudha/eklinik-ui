import { FunctionComponent } from "react";

const DashboardHeader: FunctionComponent<{ name?: string }> = ({ name }) => {
  const h = new Date().getHours();
  const greet = h < 11 ? "Selamat pagi" : h < 15 ? "Selamat siang" : h < 19 ? "Selamat sore" : "Selamat malam";
  const date = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 text-white bg-gradient-to-br from-indigo-500 via-brand-600 to-sky-500 shadow-lift">
      <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
      <div className="absolute right-24 -bottom-20 h-48 w-48 rounded-full bg-white/10" />
      <p className="relative text-sm text-white/80">{date}</p>
      <h1 className="relative text-2xl md:text-3xl font-extrabold mt-1">{greet}{name ? `, ${name}` : ""} 👋</h1>
      <p className="relative text-white/85 mt-1">Ini ringkasan pelayanan klinik hari ini.</p>
    </div>
  );
};

export default DashboardHeader;
