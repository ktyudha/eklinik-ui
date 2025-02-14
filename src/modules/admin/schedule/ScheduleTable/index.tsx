import { FunctionComponent } from "react";
import { isEmpty } from "lodash";
// import usePagination from "@/hooks/usePagination";
import TableWrapper from "@/components/reusable/Table/TableWrapper";
import TableHead from "@/components/reusable/Table/TableHead";
import TableBody from "@/components/reusable/Table/TableBody";
import TableNotFound from "@/components/reusable/Table/TableNotFound";
import PatientTableSkeleton from "./ScheduleTableSkeleton";
// import TablePagination from "@/components/reusable/Table/TablePagination";
import ScheduleTableItem from "./ScheduleTableItem";
// import PatientTableHeader from "./PatientTableHeader";

// import useGetAllPatient from "@/services/admin/patient/hooks/useGetAllPatient";
import useGetAllSchedule from "@/services/global/schedule/hooks/useGetAllSchedule";

const ScheduleTable: FunctionComponent = () => {
  const { schedules, loading } = useGetAllSchedule();

  return (
    <div>
      {/* <PatientTableHeader setNameCallback={(e) => setName(e)} /> */}
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

            {/* <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Action
            </th> */}
          </TableHead>
          <TableBody>
            {loading || !schedules ? (
              <PatientTableSkeleton />
            ) : isEmpty(schedules) ? (
              <TableNotFound />
            ) : (
              schedules?.map((schedule, idx) => {
                // const number = idx + pagination?.from!;
                const number = idx + 1;

                return (
                  <ScheduleTableItem
                    key={`patient-table-item-${idx}`}
                    number={number}
                    schedule={schedule}
                  />
                );
              })
            )}
          </TableBody>
        </TableWrapper>
        {/* <TablePagination
          goNextPage={goNextPage}
          goPrevPage={goPrevPage}
          perPage={pagination?.per_page ?? 10}
          total={pagination?.total ?? 10}
          pageLimit={pageLimit}
          setPageLimit={(limit) => setPageLimit(limit)}
          currentPage={currentPage}
          lastPage={pagination?.last_page || 1}
        /> */}
      </div>
    </div>
  );
};
export default ScheduleTable;
