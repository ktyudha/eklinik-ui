import { FunctionComponent } from "react";
import useGlobalStore from "@/store/useStore";
import { formattedDate } from "@/helpers/date";

const Item: FunctionComponent<{ label: string; value?: string | null; wide?: boolean }> = ({ label, value, wide }) => (
  <div className={wide ? "col-span-2" : ""}>
    <dt className="text-xs text-gray-400">{label}</dt>
    <dd className="mt-0.5 font-medium text-gray-800">{value || "-"}</dd>
  </div>
);

const LandingAccount: FunctionComponent = () => {
  const user = useGlobalStore((s) => s.user) as any;
  const address = [user?.additional_address, user?.village?.name, user?.sub_district?.name, user?.city?.name, user?.province?.name].filter(Boolean).join(", ");

  return (
    <section className="mx-auto min-h-[80vh] max-w-2xl px-4 py-8">
      <div className="surface overflow-hidden">
        <div className="bg-gradient-to-br from-brand-700 via-brand-600 to-sky-500 px-6 py-8 text-center text-white">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/20 text-xl font-bold ring-4 ring-white/30">{user?.name?.slice(0, 2).toUpperCase()}</span>
          <h1 className="mt-3 text-xl font-bold">{user?.name}</h1>
          <p className="text-sm text-white/80">{user?.email || user?.username}</p>
          {user?.medical_record_number && <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium">No. RM {user.medical_record_number}</span>}
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 p-6 text-sm">
          <Item label="NIK" value={user?.nik} />
          <Item label="Username" value={user?.username} />
          <Item label="Tempat lahir" value={user?.birth_place} />
          <Item label="Tanggal lahir" value={user?.birth_date ? formattedDate(user.birth_date) : null} />
          <Item label="Jenis kelamin" value={user?.gender} />
          <Item label="Agama" value={user?.religion} />
          <Item label="Status" value={user?.marital_status} />
          <Item label="Pendidikan" value={user?.education} />
          <Item label="Pekerjaan" value={user?.job} />
          <Item label="No. HP" value={user?.phone_number} />
          <Item label="Alamat" value={address} wide />
        </dl>
      </div>
    </section>
  );
};

export default LandingAccount;
