import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import usePagination from "@hooks/usePagination";
import Skeleton from "react-loading-skeleton";
import TableWrapper from "@components/reusable/Table/TableWrapper";
import TableBody from "@components/reusable/Table/TableBody";
import TablePagination from "@components/reusable/Table/TablePagination";
import TableNotFound from "@components/reusable/Table/TableNotFound";
import useGetUniversity from "@services/global/study/university/hooks/useGetUniversity";
import useGetDetailRecapDomesticUniversity from "@services/school/alumni-snbp/hooks/useGetDetailRecapDomesticUniversity";
import DomestictUniversityTableItem from "./DomesticUniversityTableItem";
import DomesticUniversityTableSkeleton from "./DomesticUniversityTableSkeleton";
import useSchoolStore from "@modules/school/_store/useSchoolStore";

const DomesticUniversityTable: FunctionComponent = () => {
  const { recapitulationId } = useParams();
  const { snbpFilterYear } = useSchoolStore((state) => ({
    snbpFilterYear: state.snbpFilterYear,
  }))

  const { university, loading: loadingUniversity } = useGetUniversity(
    recapitulationId as string
  );

  const {
    recapitulations,
    loading: loadingRecapitulation,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setYear
  } = useGetDetailRecapDomesticUniversity(recapitulationId as string);
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
            {loadingUniversity || !university ? (
              <Skeleton width={300} height={20} />
            ) : (
              <div>
                <h1 className="text-lg font-medium">
                  Perguruan Tinggi: {university.name}
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
                {/* <tr>
                  <th className="p-1 text-sm font-medium text-center border-e-2 w-5">
                    SNBP
                  </th>
                  <th className="p-1 text-sm font-medium text-center border-e-2 w-5">
                    SNBT
                  </th>
                  <th className="p-1 text-sm font-medium text-center border-e-2 w-5">
                    Mandiri
                  </th>
                  <th className="p-1 text-sm font-medium text-center border-e-2 w-40">
                    Lainnya
                  </th>
                </tr> */}
              </thead>
              <TableBody>
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
                {/* <DomestictUniversityTableItem /> */}
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
