import { FunctionComponent, useState, useEffect } from "react";

const HeroJadwalSection: FunctionComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDateTime = `${new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(now)} ${now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })} WIB`;

      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <p className="text-sm my-3">
        {currentDateTime} - <span className="font-bold">BUKA</span>
      </p>
      {/* <span className="text-gray-500 text-xs">Jadwal Praktik Klinik</span> */}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr className="text-slate-900">
              <th>Hari</th>
              <th>Waktu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Senin - Jumat</td>
              <td>
                <p>05:00-07:00 WIB</p>
                <p>16:00-20:00 WIB</p>
              </td>
            </tr>
            <tr>
              <td>Sabtu - Minggu</td>
              <td>
                <p>05:00-06:00 WIB</p>
                <p>17:00-21:00 WIB</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HeroJadwalSection;
