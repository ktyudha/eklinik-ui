import { FunctionComponent, useEffect } from "react";
import { isEmpty } from "lodash";
import usePagination from "@/hooks/usePagination";
import TableWrapper from "@/components/reusable/Table/TableWrapper";
import TableHead from "@/components/reusable/Table/TableHead";
import TableBody from "@/components/reusable/Table/TableBody";
import TableNotFound from "@/components/reusable/Table/TableNotFound";
import QueueTableSkeleton from "./QueueTableSkeleton";
import TablePagination from "@/components/reusable/Table/TablePagination";
import MedicineCategoryTableItem from "./QueueTableItem";
import QueueTableHeader from "./QueueTableHeader";
import useGetAllQueue from "@/services/admin/queue/hooks/useGetAllQueue";

const QueueTable: FunctionComponent = () => {
  const {
    appointments,
    loading,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setPatientName,
  } = useGetAllQueue();

  const {
    currentPage,
    goNextPage,
    goPrevPage,
    setPageNum: setCurrentPage,
  } = usePagination(pagination?.last_page || 1);

  useEffect(() => {
    setPageNum(currentPage);
  }, [currentPage]);

  return (
    <div>
      <QueueTableHeader setPatientNameCallback={(e) => setPatientName(e)} />
      <div className="flex flex-col">
        <TableWrapper>
          <TableHead>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center w-4"
            >
              No
            </th>
            <th
              scope="col"
              className="py-3 text-sm font-medium text-center w-4"
            >
              Antrian
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
              Nama
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Keluhan
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Tanggal
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Action
            </th>
          </TableHead>
          <TableBody>
            {loading || !appointments ? (
              <QueueTableSkeleton />
            ) : isEmpty(appointments) ? (
              <TableNotFound />
            ) : (
              appointments?.map((appointment, idx) => {
                const number = idx + 1;

                return (
                  <MedicineCategoryTableItem
                    key={`medicine-category-table-item-${idx}`}
                    number={number}
                    appointment={appointment}
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
          setPageNum={(limit) => setPageNum(limit)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          lastPage={pagination?.last_page || 1}
        />
      </div>
    </div>
  );
};
export default QueueTable;
