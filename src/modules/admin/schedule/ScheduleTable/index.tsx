import { FunctionComponent } from "react";
import { isEmpty } from "lodash";
import TableWrapper from "@/components/reusable/Table/TableWrapper";
import TableHead from "@/components/reusable/Table/TableHead";
import TableBody from "@/components/reusable/Table/TableBody";
import TableNotFound from "@/components/reusable/Table/TableNotFound";
import PatientTableSkeleton from "./ScheduleTableSkeleton";
import ScheduleTableItem from "./ScheduleTableItem";
import useGetAllSchedule from "@/services/global/schedule/hooks/useGetAllSchedule";
// import useGetAllPatient from "@/services/admin/patient/hooks/useGetAllPatient";

const ScheduleTable: FunctionComponent = () => {
  const { schedules, loading } = useGetAllSchedule();

  return (
    <div>
      <div className="flex flex-col">
        <TableWrapper>
          <TableHead>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center w-10"
            >
              No
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Hari
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Waktu
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Tanggal Libur
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Keterangan
            </th>
          </TableHead>
          <TableBody>
            {loading || !schedules ? (
              <PatientTableSkeleton />
            ) : isEmpty(schedules) ? (
              <TableNotFound />
            ) : (
              schedules?.map((schedule, idx) => {
                return (
                  <ScheduleTableItem
                    key={`schedule-table-item-${idx}`}
                    number={idx + 1}
                    schedule={schedule}
                  />
                );
              })
            )}
          </TableBody>
        </TableWrapper>
      </div>
    </div>
  );
};
export default ScheduleTable;
