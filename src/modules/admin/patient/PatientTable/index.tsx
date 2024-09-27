import { FunctionComponent } from "react";
import { isEmpty } from "lodash";
import TableWrapper from "@/components/reusable/Table/TableWrapper";
import TableHead from "@/components/reusable/Table/TableHead";
import TableBody from "@/components/reusable/Table/TableBody";
import TableNotFound from "@/components/reusable/Table/TableNotFound";
import PatientTableSkeleton from "./PatientTableSkeleton";
// import TablePagination from "@/components/reusable/Table/TablePagination";
import PatientTableItem from "./PatientTableItem";

import useGetAllPatient from "@/services/admin/patient/hooks/useGetAllPatient";

const PatientTable: FunctionComponent = () => {
  const { patients, loading } = useGetAllPatient();

  return (
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
            No. RM
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
            Nama
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
            NIK
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
            Jenis Kelamin
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
            Pendidikan
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
            Pekerjaan
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
            Alamat
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-left w-72"
          >
            Action
          </th>
        </TableHead>
        <TableBody>
          {loading || !patients ? (
            <PatientTableSkeleton />
          ) : isEmpty(patients) ? (
            <TableNotFound />
          ) : (
            patients?.map((patient, idx) => {
              const number = idx + 1;

              return (
                <PatientTableItem
                  key={`university-table-item-${idx}`}
                  number={number}
                  patient={patient}
                />
              );
            })
          )}
        </TableBody>
      </TableWrapper>
    </div>
  );
};
export default PatientTable;
