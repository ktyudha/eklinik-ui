import { FunctionComponent } from "react";
// import PatientTableItemMenu from "./PatientTableItemMenu";
import { Schedule } from "@/services/global/schedule/interfaces/get-all-schedules.types";

interface Props {
  number: number;
  schedule: Schedule;
}

const ScheduleTableItem: FunctionComponent<Props> = ({ number, schedule }) => {
  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6">{schedule.day}</td>
      <td className="px-6 uppercase text-center flex text-nowrap">
        {schedule.start_time} - {schedule.end_time} WIB
      </td>
      <td className="px-6 capitalize text-nowrap mx-auto text-center">
        {schedule.is_active ? (
          <span className="inline-flex rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-600 ring-1 ring-success-100">
            Buka
          </span>
        ) : (
          <span className="rounded-full bg-[#762a26] text-white px-3 py-1">
            Libur
          </span>
        )}
      </td>
      <td className="px-6 text-center">{schedule.specific_date ?? "-"}</td>
      <td className="px-6 text-center">{schedule.information ?? "-"}</td>
    </tr>
  );
};

export default ScheduleTableItem;
