import { FunctionComponent, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { isEmpty } from "lodash";
import usePagination from "@hooks/usePagination";
import TableWrapper from "@components/reusable/Table/TableWrapper";
import TableBody from "@components/reusable/Table/TableBody";
import TableNotFound from "@components/reusable/Table/TableNotFound";
import TablePagination from "@components/reusable/Table/TablePagination";
import useGetDepartment from "@services/global/study/departement/hooks/useGetDepartment";
import useSchoolStore from "@modules/school/_store/useSchoolStore";
import useGetDetailRecapDomesticDepartment from "@services/school/alumni-snbp/hooks/useGetDetailRecapDomesticDepartment";
import DomestictDepartmentTableItem from "./DomesticDepartmentTableItem";
import DomesticDepartmentTableSkeleton from "./DomesticDepartmentTableSkeleton";

const DomesticDepartmentTable: FunctionComponent = () => {
  const { filterDepartment, snbpFilterYear } = useSchoolStore((state) => ({
    filterDepartment: state.filterDepartment,
    snbpFilterYear: state.snbpFilterYear,
  }));

  const { department, loading: loadingDepartment } = useGetDepartment(
    filterDepartment?.value as string
  );

  const {
    recapitulations,
    loading: loadingRecapitulation,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setYear,
  } = useGetDetailRecapDomesticDepartment(filterDepartment?.value as string);
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
        <div className="w-full overflow-auto h-auto p-3 border border-[#E2E8F0] rounded-md mb-1">
          <div className="flex flex-wrap items-center justify-between gap-2 md:gap-0">
            {!filterDepartment || filterDepartment.value === '' ? (
              <div>
                <h1 className="text-lg font-medium">
                  Program Studi: <span className="text-red-500">Anda Belum Memilih Program Studi</span>
                </h1>
              </div>
            ) : (
              <>
                {loadingDepartment || !department ? (
                  <Skeleton width={300} height={20} />
                ) : (
                  <div>
                    <h1 className="text-lg font-medium">
                      Program Studi: {department.name}
                    </h1>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-60">
                      <input
                        className="border-2 rounded-lg px-2 py-1.5 font-normal text-md w-full focus:outline-none"
                        type="text"
                        placeholder="Cari..."
                      />
                    </div>
                  </div>
                </div>
              </>
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
                {!filterDepartment || filterDepartment.value === '' ? (
                  <TableNotFound />
                ) : (
                  <>
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
                  </>
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
