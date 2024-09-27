import { FunctionComponent, useEffect } from "react";
import { isEmpty } from "lodash";
import useSchoolStore from "@modules/school/_store/useSchoolStore";
import usePagination from "@hooks/usePagination";
import TableWrapper from "@components/reusable/Table/TableWrapper";
import TableHead from "@components/reusable/Table/TableHead";
import TableBody from "@components/reusable/Table/TableBody";
import TableNotFound from "@components/reusable/Table/TableNotFound";
import TablePagination from "@components/reusable/Table/TablePagination";
import useGetRecapDomesticUniversity from "@services/school/alumni-snbp/hooks/useGetRecapDomesticUniversity";
import UniversityTableItem from "./UniversityTableItem";
import UniversityTableSkeleton from "./UniversityTableSkeleton";

const UniversityTable: FunctionComponent = () => {
  const { snbpFilterYear } = useSchoolStore((state) => ({
    snbpFilterYear: state.snbpFilterYear,
  }));
  const {
    recapitulations,
    loading,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setYear,
  } = useGetRecapDomesticUniversity();
  const { currentPage, goNextPage, goPrevPage } = usePagination(
    pagination?.last_page || 1
  );

  useEffect(() => {
    setYear(snbpFilterYear);
    setPageNum(currentPage);
  }, [currentPage, setYear, snbpFilterYear]);

  return (
    <div className="flex flex-col">
      <TableWrapper>
        <TableHead>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-center border-2 w-10"
          >
            No
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-left border-2"
          >
            Perguruan Tinggi
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-center border-2"
          >
            Jumlah Alumni
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-center border-2 w-44"
          >
            Aksi
          </th>
        </TableHead>
        <TableBody>
          {loading || !recapitulations ? (
            <UniversityTableSkeleton />
          ) : isEmpty(recapitulations) ? (
            <TableNotFound />
          ) : (
            recapitulations?.map((recap, idx) => {
              const number = idx + pagination?.from!;

              return (
                <UniversityTableItem
                  key={`university-table-item-${idx}`}
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
  );
};

export default UniversityTable;
