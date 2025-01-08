import { FunctionComponent } from "react";
import { isEmpty } from "lodash";
// import usePagination from "@/hooks/usePagination";
import TableWrapper from "@/components/reusable/Table/TableWrapper";
import TableHead from "@/components/reusable/Table/TableHead";
import TableBody from "@/components/reusable/Table/TableBody";
import TableNotFound from "@/components/reusable/Table/TableNotFound";
import MedicineTableSkeleton from "./MedicineTableSkeleton";
// import TablePagination from "@/components/reusable/Table/TablePagination";
import MedicineTableItem from "./MedicineTableItem";
import MedicineCategoryTableHeader from "./MedicineTableHeader";

import useGetAllMedicine from "@/services/admin/medicine/hooks/useGetAllMedicine";

const MedicineTable: FunctionComponent = () => {
  const {
    medicines,
    loading,
    // pagination,
    // pageLimit,
    // setPageLimit,
    // setPageNum,
    // setName,
  } = useGetAllMedicine();

  // const { currentPage, goNextPage, goPrevPage } = usePagination(
  //   pagination?.last_page || 1
  // );

  // useEffect(() => {
  //   setPageNum(currentPage);
  // }, [currentPage]);

  return (
    <div>
      <MedicineCategoryTableHeader />
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
              Tanggal Kedaluwarsa
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Harga
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Stok
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Action
            </th>
          </TableHead>
          <TableBody>
            {loading || !medicines ? (
              <MedicineTableSkeleton />
            ) : isEmpty(medicines) ? (
              <TableNotFound />
            ) : (
              medicines?.map((medicine, idx) => {
                const number = idx + 1;

                return (
                  <MedicineTableItem
                    key={`medicine-table-item-${idx}`}
                    number={number}
                    medicine={medicine}
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
export default MedicineTable;
