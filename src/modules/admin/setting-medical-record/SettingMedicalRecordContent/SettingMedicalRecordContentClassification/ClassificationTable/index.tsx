import { FunctionComponent, useEffect } from "react";
import { isEmpty } from "lodash";
import usePagination from "@/hooks/usePagination";
import TableWrapper from "@/components/reusable/Table/TableWrapper";
import TableHead from "@/components/reusable/Table/TableHead";
import TableBody from "@/components/reusable/Table/TableBody";
import TableNotFound from "@/components/reusable/Table/TableNotFound";
import ClassificationTableSkeleton from "./ClassificationTableSkeleton";
import TablePagination from "@/components/reusable/Table/TablePagination";
import ClassificationTableItem from "./ClassificationTableItem";
import ClassificationTableHeader from "./ClassificationTableHeader";

import useGetAllClassification from "@/services/admin/classification/hooks/useGetAllClassification";

const ClassificationTable: FunctionComponent = () => {
  const {
    classifications,
    loading,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setName,
  } = useGetAllClassification();

  const { currentPage, goNextPage, goPrevPage } = usePagination(
    pagination?.last_page || 1
  );

  useEffect(() => {
    setPageNum(currentPage);
  }, [currentPage]);

  return (
    <div>
      <ClassificationTableHeader setNameCallback={(e) => setName(e)} />
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
              Nama
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Harga
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Grup Pertanyaan
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Action
            </th>
          </TableHead>
          <TableBody>
            {loading || !classifications ? (
              <ClassificationTableSkeleton />
            ) : isEmpty(classifications) ? (
              <TableNotFound />
            ) : (
              classifications?.map((classification, idx) => {
                const number = idx + 1;

                return (
                  <ClassificationTableItem
                    key={`medicine-table-item-${idx}`}
                    number={number}
                    classification={classification}
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
export default ClassificationTable;
