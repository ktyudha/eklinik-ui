import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import {
  UilListOl, UilCheckCircle, UilSilence, UilExclamationTriangle,
  UilPlus, UilMedkit, UilSchedule,
} from "@iconscout/react-unicons";
import useGlobalStore from "@/store/useStore";
import useDashboardSummary from "@/services/admin/dashboard/useDashboardSummary";
import DashboardHeader from "./DashboardHeader";
import DashboardSkeleton from "./DashboardSkeleton";

const Stat: FunctionComponent<{
  icon: React.ElementType; label: string; value: number | string; tone: string; hint?: string;
}> = ({ icon: Icon, label, value, tone, hint }) => (
  <div className="surface surface-hover p-5 flex items-center gap-4">
    <div className={`h-12 w-12 rounded-xl grid place-items-center ${tone}`}>
      <Icon size={26} />
    </div>
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-3xl font-bold leading-tight">{value}</p>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  </div>
);

const QuickAction: FunctionComponent<{ to: string; icon: React.ElementType; label: string }> = ({ to, icon: Icon, label }) => (
  <Link to={to} className="flex flex-col items-center gap-2 rounded-xl border border-base-300 bg-base-100 p-4 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
    <Icon size={24} />
    {label}
  </Link>
);

const Dashboard: FunctionComponent = () => {
  const user = useGlobalStore((s) => s.user);
  const d = useDashboardSummary();

  if (d.loading) return <DashboardSkeleton />;

  return (
    <div className="max-w-full space-y-6">
      <DashboardHeader name={user?.name} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={UilListOl} label="Antrian menunggu" value={d.waiting.length} tone="bg-amber-100 text-amber-600" hint="hari ini" />
        <Stat icon={UilCheckCircle} label="Selesai dilayani" value={d.finished} tone="bg-emerald-100 text-emerald-600" hint={`${d.cancelled} dibatalkan`} />
        <Stat icon={UilSilence} label="Total pasien" value={d.totalPatients} tone="bg-sky-100 text-sky-600" />
        <Stat icon={UilExclamationTriangle} label="Perlu perhatian obat" value={d.lowStock.length + d.expiring.length} tone="bg-rose-100 text-rose-600" hint={`${d.lowStock.length} stok menipis · ${d.expiring.length} hampir kadaluarsa`} />
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <QuickAction to="/admin/appointments" icon={UilPlus} label="Antrian baru" />
        <QuickAction to="/admin/medical-record/create" icon={UilMedkit} label="Pemeriksaan baru" />
        <QuickAction to="/admin/schedules" icon={UilSchedule} label="Jadwal bidan" />
        <QuickAction to="/admin/patient" icon={UilSilence} label="Cari pasien" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 surface">
          <header className="flex items-center justify-between px-5 py-4 border-b border-base-300">
            <h2 className="font-semibold">Antrian hari ini</h2>
            <Link to="/admin/appointments" className="text-sm text-primary">Lihat semua</Link>
          </header>
          {d.queueToday.length === 0 ? (
            <p className="p-8 text-center text-slate-400">Belum ada antrian hari ini.</p>
          ) : (
            <ul className="divide-y divide-base-300">
              {d.queueToday.slice(0, 8).map((q) => (
                <li key={q.id} className="flex items-center gap-4 px-5 py-3">
                  <span className="h-10 w-10 rounded-lg bg-primary/10 text-primary font-bold grid place-items-center">{q.queue_number}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{q.patient?.name}</p>
                    <p className="text-sm text-slate-500 truncate">{q.description || "-"}</p>
                  </div>
                  <span className={`badge ${q.status === "finished" ? "badge-success" : q.status === "cancel" ? "badge-error" : "badge-warning"} badge-outline`}>
                    {q.status === "finished" ? "Selesai" : q.status === "cancel" ? "Batal" : "Menunggu"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="surface">
          <header className="flex items-center justify-between px-5 py-4 border-b border-base-300">
            <h2 className="font-semibold">Peringatan obat</h2>
            <Link to="/admin/medicine/medicines" className="text-sm text-primary">Kelola</Link>
          </header>
          <ul className="divide-y divide-base-300">
            {[...d.lowStock.map((m) => ({ m, why: `Stok ${m.stock} ${m.unit}`, c: "text-amber-600" })),
              ...d.expiring.map((m) => ({ m, why: `Exp ${String(m.expired_date).slice(0, 10)}`, c: "text-rose-600" }))]
              .slice(0, 8)
              .map(({ m, why, c }, i) => (
                <li key={`${m.id}-${i}`} className="flex justify-between gap-3 px-5 py-3 text-sm">
                  <span className="truncate">{m.name}</span>
                  <span className={`shrink-0 font-medium ${c}`}>{why}</span>
                </li>
              ))}
            {d.lowStock.length + d.expiring.length === 0 && (
              <li className="p-8 text-center text-slate-400 text-sm">Semua stok aman.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
