import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import axiosInstance from "@/lib/axios-instance";

interface Schedule { id: string; day: string; start_time: string | null; end_time: string | null; specific_date: string | null; information: string | null; is_active: boolean | number }

const DAYS = [["Monday", "Senin"], ["Tuesday", "Selasa"], ["Wednesday", "Rabu"], ["Thursday", "Kamis"], ["Friday", "Jumat"], ["Saturday", "Sabtu"], ["Sunday", "Minggu"]];
const hhmm = (t: string | null) => (t ? t.slice(0, 5) : "");
const EN_DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const services = [
  { icon: "🤰", title: "Pemeriksaan Kehamilan", text: "ANC rutin, USG, dan pemantauan tumbuh kembang janin." },
  { icon: "👶", title: "Persalinan", text: "Pendampingan persalinan normal oleh bidan berpengalaman." },
  { icon: "💉", title: "KB & Imunisasi", text: "Pilihan KB, imunisasi bayi dan anak sesuai jadwal." },
  { icon: "🩺", title: "Pemeriksaan Umum", text: "Konsultasi dan pengobatan keluhan ringan keluarga." },
  { icon: "🧒", title: "Kesehatan Anak", text: "Pemantauan berat badan, gizi, dan tumbuh kembang." },
  { icon: "📋", title: "Medical Check Up", text: "Pemeriksaan kesehatan berkala yang praktis." },
];
const steps = [
  { n: "1", title: "Masuk akun", text: "Login sebagai pasien dengan username Anda." },
  { n: "2", title: "Ambil antrian", text: "Pilih keluhan, nomor antrian langsung terbit." },
  { n: "3", title: "Datang sesuai nomor", text: "Pantau antrian dari ponsel, tanpa menunggu lama." },
];

function useSchedules() {
  const { data } = useSWR<{ schedules: Schedule[] }>("/schedules", (u: string) => axiosInstance({ withToken: false }).get(u).then((r) => r.data));
  return (data?.schedules ?? []).filter((s) => s.is_active && !s.specific_date);
}

const LandingHome: FunctionComponent = () => {
  const schedules = useSchedules();
  const todayKey = EN_DAY[new Date().getDay()];
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const today = schedules.filter((s) => s.day === todayKey);
  const open = today.some((s) => {
    const [a, b] = [hhmm(s.start_time), hhmm(s.end_time)].map((t) => (t ? Number(t.slice(0, 2)) * 60 + Number(t.slice(3)) : NaN));
    return nowMin >= a && nowMin <= b;
  });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
              <span className={`h-2 w-2 rounded-full ${open ? "bg-success-500" : "bg-gray-300"}`} />
              {open ? "Praktik sedang buka" : "Praktik sedang tutup"}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              Perawatan yang <span className="bg-gradient-to-r from-brand-600 to-sky-500 bg-clip-text text-transparent">hangat</span>, antrian yang <span className="bg-gradient-to-r from-brand-600 to-sky-500 bg-clip-text text-transparent">mudah</span>.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-gray-500">Klinik Bidan Susenowati, S.ST. mendampingi ibu, bayi, dan keluarga. Daftar antrian dari rumah, datang tepat waktu.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/queue" className="btn btn-primary h-12 px-7 text-base">Ambil antrian</Link>
              <a href="#jadwal" className="btn btn-outline btn-primary h-12 px-7 text-base">Lihat jadwal</a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 text-center sm:text-left">
              {[["6", "Layanan"], ["Senin–Sabtu", "Hari praktik"], ["Online", "Antrian"]].map(([v, l]) => (
                <div key={l}><dt className="text-xl font-bold text-gray-900">{v}</dt><dd className="text-sm text-gray-400">{l}</dd></div>
              ))}
            </dl>
          </div>

          <div className="surface p-6 shadow-xl md:p-8">
            <p className="text-sm font-medium text-gray-400">Praktik hari ini</p>
            {today.length ? today.map((s) => (
              <p key={s.id} className="mt-1 text-3xl font-bold text-gray-900">{hhmm(s.start_time)} – {hhmm(s.end_time)}</p>
            )) : <p className="mt-1 text-3xl font-bold text-gray-300">Libur</p>}
            <p className="mt-1 text-sm text-gray-500">{today[0]?.information ?? "Silakan cek jadwal hari lain di bawah."}</p>
            <hr className="my-5 border-gray-100" />
            <ul className="space-y-2.5 text-sm">
              {["Nomor antrian langsung dari ponsel", "Riwayat pemeriksaan tersimpan rapi", "Data pasien aman dan terjaga"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-gray-600"><span className="grid h-5 w-5 place-items-center rounded-full bg-success-50 text-xs text-success-600">✓</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section id="layanan" className="scroll-mt-20 bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">Layanan kami</h2>
            <p className="mt-3 text-gray-500">Pelayanan kesehatan ibu dan anak yang lengkap dalam satu tempat.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="surface surface-hover p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-2xl">{s.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-1.5 text-sm text-gray-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARA DAFTAR */}
      <section id="cara-daftar" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">Cara mendaftar</h2>
            <p className="mt-3 text-gray-500">Tiga langkah singkat, tanpa antre di tempat.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-3xl border border-gray-200 p-7">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-bold text-white shadow-lift">{s.n}</span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-1.5 text-sm text-gray-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JADWAL */}
      <section id="jadwal" className="scroll-mt-20 bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Jadwal praktik</h2>
            <p className="mt-3 text-gray-500">Jadwal dapat berubah, perhatikan keterangan di tiap hari.</p>
          </div>
          <div className="surface mt-10 divide-y divide-gray-100 overflow-hidden">
            {DAYS.map(([key, label]) => {
              const items = schedules.filter((s) => s.day === key);
              const isToday = key === todayKey;
              return (
                <div key={key} className={`flex items-center justify-between gap-4 px-6 py-4 ${isToday ? "bg-brand-50/60" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">{label}</span>
                    {isToday && <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-semibold text-white">Hari ini</span>}
                  </div>
                  <div className="text-right text-sm">
                    {items.length ? items.map((s) => (
                      <p key={s.id}><span className="font-semibold text-gray-900">{hhmm(s.start_time)} – {hhmm(s.end_time)}</span>{s.information && <span className="ml-2 text-gray-400">{s.information}</span>}</p>
                    )) : <span className="text-gray-300">Libur</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOKASI */}
      <section id="lokasi" className="scroll-mt-20 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Kunjungi kami</h2>
            <p className="mt-3 text-gray-500">Jl. Nasional 24, Buluresik, Manduro MG, Kec. Ngoro, Kabupaten Mojokerto, Jawa Timur 61385</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn btn-primary" target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send/?phone=6285745635740&text=Halo Klinik, Saya ingin konsultasi.&app_sent=0">Chat WhatsApp</a>
              <a className="btn btn-outline btn-primary" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Bidan+Susenowati+SST">Buka peta</a>
            </div>
          </div>
          <div className="surface overflow-hidden">
            <iframe title="Lokasi klinik" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.1049110986764!2d112.64256957588357!3d-7.563539674698328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7dfc2774a6e4d%3A0xa2f875d1662bab4c!2sBidan%20Susenowati%20SST!5e0!3m2!1sen!2sid!4v1737297236075!5m2!1sen!2sid" />
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Klinik Bidan Susenowati, S.ST. · Seluruh hak dilindungi.
      </footer>
    </>
  );
};

export default LandingHome;
