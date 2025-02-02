import { FunctionComponent } from "react";
import { Queue } from "@/services/admin/queue/interfaces/get-all-queue.types";
import { formattedDateTime2 } from "@/helpers/date";
import QueueTableItemMenu from "./QueueTableItemMenu";

interface Props {
  number: number;
  appointment: Queue;
}

const QueueTableItem: FunctionComponent<Props> = ({ number, appointment }) => {
  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className=" text-nowrap text-center font-semibold">
        {appointment.queue_number}
      </td>
      <td className="px-6 uppercase text-center">
        {appointment.status && appointment.status == "finished" ? (
          <span className="rounded-full bg-[#4bb43a] text-white px-3 py-1">
            Finished
          </span>
        ) : appointment.status == "cancel" ? (
          <span className="rounded-full bg-red-500 text-white px-3 py-1">
            Cancel
          </span>
        ) : (
          <span className="rounded-full bg-[#762a26] text-white px-3 py-1">
            Waiting
          </span>
        )}
      </td>
      <td className="px-6 uppercase text-nowrap text-center">
        {appointment.patient.name}
      </td>
      <td className="px-6 capitalize text-nowrap truncate max-w-xs text-center">
        <div dangerouslySetInnerHTML={{ __html: appointment.description }} />
      </td>
      <td className="px-6 text-center text-nowrap">
        {formattedDateTime2(appointment.queue_date)}
      </td>
      <td className="flex flex-row gap-3">
        <QueueTableItemMenu appointment={appointment} />
      </td>
    </tr>
  );
};

export default QueueTableItem;
