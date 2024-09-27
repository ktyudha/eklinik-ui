import { FunctionComponent, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";
import usePagination from "@hooks/usePagination";
import TableWrapper from "@components/reusable/Table/TableWrapper";
import TableBody from "@components/reusable/Table/TableBody";
import TableNotFound from "@components/reusable/Table/TableNotFound";
import TablePagination from "@components/reusable/Table/TablePagination";
import useGetDepartment from "@services/global/study/departement/hooks/useGetDepartment";
import useGetDetailRecapDomesticDepartment from "@services/school/alumni-snbp/hooks/useGetDetailRecapDomesticDepartment";
import DomestictDepartmentTableItem from "./DomesticDepartmentTableItem";
import DomesticDepartmentTableSkeleton from "./DomesticDepartmentTableSkeleton";
import useSchoolStore from "@modules/school/_store/useSchoolStore";

const DomesticDepartmentTable: FunctionComponent = () => {
  const { recapitulationId } = useParams();
  const { snbpFilterYear } = useSchoolStore((state) => ({
    snbpFilterYear: state.snbpFilterYear,
  }));

  const { department, loading: loadingDepartment } = useGetDepartment(
    recapitulationId as string
  );

  const {
    recapitulations,
    loading: loadingRecapitulation,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setYear,
  } = useGetDetailRecapDomesticDepartment(recapitulationId as string);
  const { currentPage, goNextPage, goPrevPage } = usePagination(
    pagination?.last_page || 1
  );

  useEffect(() => {
    setYear(snbpFilterYear);
    setPageNum(currentPage);
  }, [currentPage, snbpFilterYear]);

  return (
    <div className="grid grid-cols-12">
      <div className="flex flex-col col-span-12 overflow-auto">
        <div className="w-full mt-3 overflow-auto h-auto p-3 border border-[#E2E8F0] rounded-md mb-1">
          <div className="flex flex-wrap items-center justify-between gap-2 md:gap-0">
            {loadingDepartment || !department ? (
              <Skeleton width={300} height={20} />
            ) : (
              <div>
                <h1 className="text-lg font-medium">
                  Program Studi: {department.name}
                </h1>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <TableWrapper>
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th
                    scope="col"
                    rowSpan={2}
                    className="w-10 px-6 py-4 text-sm font-medium text-center border-2"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    rowSpan={2}
                    className="w-72 px-6 py-4 text-sm font-medium text-center border-2"
                  >
                    Nama Alumni
                  </th>
                  <th
                    scope="col"
                    rowSpan={2}
                    className="w-120 px-6 py-4 text-sm font-medium text-center border-2"
                  >
                    Perguruan Tinggi
                  </th>
                  <th
                    scope="col"
                    rowSpan={2}
                    className="w-20 px-6 py-4 text-sm font-medium text-center border-2"
                  >
                    Jenjang
                  </th>
                  <th
                    scope="col"
                    colSpan={2}
                    className="w-20 px-6 py-4 text-sm font-medium text-center border-2"
                  >
                    Tahun Lulus
                  </th>
                </tr>
              </thead>
              <TableBody>
                {loadingRecapitulation || !recapitulations ? (
                  <DomesticDepartmentTableSkeleton />
                ) : isEmpty(recapitulations) ? (
                  <TableNotFound />
                ) : (
                  recapitulations?.map((recap, idx) => {
                    const number = idx + pagination?.from!;

                    return (
                      <DomestictDepartmentTableItem
                        key={`department-table-item-${idx}`}
                        number={number}
                        recap={recap}
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
      </div>
    </div>
  );
};

export default DomesticDepartmentTable;
