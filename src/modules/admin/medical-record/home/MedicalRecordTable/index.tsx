import { FunctionComponent, useEffect } from "react";
import { isEmpty } from "lodash";
import usePagination from "@/hooks/usePagination";
import TableWrapper from "@/components/reusable/Table/TableWrapper";
import TableHead from "@/components/reusable/Table/TableHead";
import TableBody from "@/components/reusable/Table/TableBody";
import TableNotFound from "@/components/reusable/Table/TableNotFound";
import PatientTableSkeleton from "./PatientTableSkeleton";
import TablePagination from "@/components/reusable/Table/TablePagination";
import MedicalRecordTableItem from "./MedicalRecordTableItem";
import PatientTableHeader from "./MedicalRecordTableHeader";

import useGetAllMedical from "@/services/admin/medical/hooks/useGetAllMedical";
const MedicalRecordTable: FunctionComponent = () => {
  const {
    medicals,
    loading,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setName,
  } = useGetAllMedical();

  const { currentPage, goNextPage, goPrevPage } = usePagination(
    pagination?.last_page || 1
  );

  useEffect(() => {
    setPageNum(currentPage);
  }, [currentPage]);

  return (
    <div>
      <PatientTableHeader setNameCallback={(e) => setName(e)} />
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
              Tanggal Kunjungan
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Kategori
            </th>
            {/* <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
            Pendidikan
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
            Pekerjaan
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
            Alamat
          </th> */}
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Action
            </th>
          </TableHead>
          <TableBody>
            {loading || !medicals ? (
              <PatientTableSkeleton />
            ) : isEmpty(medicals) ? (
              <TableNotFound />
            ) : (
              medicals?.map((medical, idx) => {
                const number = idx + pagination?.from!;

                return (
                  <MedicalRecordTableItem
                    key={`patient-table-item-${idx}`}
                    number={number}
                    medical={medical}
                  />
                );
              })
            )}
          </TableBody>
        </TableWrapper>
        <TablePagination
          goNextPage={goNextPage}
          goPrevPage={goPrevPage}
          perPage={pagination?.per_page ?? 10}
          total={pagination?.total ?? 10}
          pageLimit={pageLimit}
          setPageLimit={(limit) => setPageLimit(limit)}
          currentPage={currentPage}
          lastPage={pagination?.last_page || 1}
        />
      </div>
    </div>
  );
};
export default MedicalRecordTable;
