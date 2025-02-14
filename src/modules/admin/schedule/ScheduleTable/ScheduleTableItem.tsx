import { FunctionComponent } from "react";
// import PatientTableItemMenu from "./PatientTableItemMenu";
import { Schedule } from "@/services/admin/schedule/interfaces/get-schedule.types";

interface Props {
  number: number;
  schedule: Schedule;
}

const ScheduleTableItem: FunctionComponent<Props> = ({ number, schedule }) => {
  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6">{schedule.day}</td>
      <td className="px-6 uppercase text-center  text-nowrap">
        {schedule.start_time} - {schedule.end_time} WIB
      </td>
      <td className="px-6 capitalize text-nowrap mx-auto text-center">
        {schedule.is_active ? (
          <span className="rounded-full bg-[#00dfcb] text-white px-3 py-1">
            Active
          </span>
        ) : (
          <span className="rounded-full bg-[#762a26] text-white px-3 py-1">
            Disable
          </span>
        )}
      </td>
      <td className="px-6 text-center">{schedule.specific_date ?? "-"}</td>
      <td className="px-6 text-center">{schedule.information ?? "-"}</td>
    </tr>
  );
};

export default ScheduleTableItem;
