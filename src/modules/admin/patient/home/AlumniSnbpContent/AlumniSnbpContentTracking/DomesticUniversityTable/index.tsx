import { FunctionComponent, useEffect } from "react";
import { isEmpty } from "lodash";
import usePagination from "@hooks/usePagination";
import Skeleton from "react-loading-skeleton";
import TableWrapper from "@components/reusable/Table/TableWrapper";
import TableBody from "@components/reusable/Table/TableBody";
import TablePagination from "@components/reusable/Table/TablePagination";
import TableNotFound from "@components/reusable/Table/TableNotFound";
import useGetDetailRecapDomesticUniversity from "@services/school/alumni-snbp/hooks/useGetDetailRecapDomesticUniversity";
import DomestictUniversityTableItem from "./DomesticUniversityTableItem";
import DomesticUniversityTableSkeleton from "./DomesticUniversityTableSkeleton";
import useGetUniversity from "@services/global/study/university/hooks/useGetUniversity";
import useSchoolStore from "@modules/school/_store/useSchoolStore";

const DomesticUniversityTable: FunctionComponent = () => {
  const { filterUniversity, snbpFilterYear } = useSchoolStore((state) => ({
    filterUniversity: state.filterUniversity,
    snbpFilterYear: state.snbpFilterYear,
  }));

  const { university, loading: loadingUniversity } = useGetUniversity(
    filterUniversity?.value as string
  );

  const {
    recapitulations, loading: loadingRecapitulation,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setYear,
  } = useGetDetailRecapDomesticUniversity(filterUniversity?.value as string);

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
            {!filterUniversity || filterUniversity.value === '' ? (
              <div>
                <h1 className="text-lg font-medium">
                  Perguruan Tinggi: <span className="text-red-500">Anda Belum Memilih Perguruan Tinggi</span>
                </h1>
              </div>
            ) : (
              <>
                {loadingUniversity || !university ? (
                  <Skeleton width={300} height={20} />
                ) : (
                  <div>
                    <h1 className="text-lg font-medium">
                      Perguruan Tinggi: {university.name}
                    </h1>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-60">
                    <input
                      className="border-2 rounded-lg px-2 py-1.5 font-normal text-md w-full focus:outline-none"
                      type="text"
                      placeholder="Cari..."
                    />
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
                    className="w-120 px-6 py-4 text-sm font-medium text-center border-2"
                  >
                    Nama Alumni
                  </th>
                  <th
                    scope="col"
                    rowSpan={2}
                    className="w-120 px-6 py-4 text-sm font-medium text-center border-2"
                  >
                    Program Studi
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
                {!filterUniversity || filterUniversity.value === '' ? (
                  <TableNotFound />
                ) : (
                  <>
                    {loadingRecapitulation || !recapitulations ? (
                      <DomesticUniversityTableSkeleton />
                    ) : isEmpty(recapitulations) ? (
                      <TableNotFound />
                    ) : (
                      recapitulations?.map((recap, idx) => {
                        const number = idx + pagination?.from!;

                        return (
                          <DomestictUniversityTableItem
                            key={`university-table-item-${idx}`}
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

export default DomesticUniversityTable;
