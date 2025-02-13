import { FunctionComponent } from "react";
import useGetAllSchedule from "@/services/global/schedules/hooks/useGetAllSchedule";
import { isEmpty } from "lodash";

const HeroJadwalSection: FunctionComponent = () => {
  // const [currentDateTime, setCurrentDateTime] = useState("");

  const { schedules, loading } = useGetAllSchedule();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  const today = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date()
  );
  //     const formattedDateTime = `${new Intl.DateTimeFormat("id-ID", {
  //       weekday: "long",
  //       day: "2-digit",
  //       month: "long",
  //       year: "numeric",
  //     }).format(now)} ${now.toLocaleTimeString("id-ID", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     })} WIB`;

  //     setCurrentDateTime(formattedDateTime);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);
  return (
    <>
      {/* <p className="text-sm my-3">
        {currentDateTime && (
          <>
            {currentDateTime} - <span className="font-bold">BUKA</span>
          </>
        )}
      </p> */}
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
            {loading || !schedules ? (
              <div>..Loading</div>
            ) : isEmpty(schedules) ? (
              <div>KOSONG</div>
            ) : (
              schedules?.map((schedule, idx) => {
                const isToday = schedule.day === today;
                return (
                  <tr
                    key={idx}
                    className={isToday ? "font-bold" : "font-medium"}
                  >
                    <td>{schedule.day}</td>
                    <td>
                      <p>
                        {schedule.start_time} - {schedule.end_time} WIB
                      </p>
                    </td>
                  </tr>
                );
              })
            )}
            {/* <tr>
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
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HeroJadwalSection;
