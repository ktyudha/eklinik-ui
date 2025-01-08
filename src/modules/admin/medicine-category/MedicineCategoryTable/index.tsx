import { FunctionComponent } from "react";
import { isEmpty } from "lodash";
// import usePagination from "@/hooks/usePagination";
import TableWrapper from "@/components/reusable/Table/TableWrapper";
import TableHead from "@/components/reusable/Table/TableHead";
import TableBody from "@/components/reusable/Table/TableBody";
import TableNotFound from "@/components/reusable/Table/TableNotFound";
import MedicineCategoryTableSkeleton from "./MedicineCategoryTableSkeleton";
// import TablePagination from "@/components/reusable/Table/TablePagination";
import MedicineCategoryTableItem from "./MedicineCategoryTableItem";
import MedicineCategoryTableHeader from "./MedicineCategoryTableHeader";

import useGetAllMedicineCategory from "@/services/admin/medicine-category/hooks/useGetAllMedicineCategory";

const MedicineCategoryTable: FunctionComponent = () => {
  const {
    medicine_categories,
    loading,
    // pagination,
    // pageLimit,
    // setPageLimit,
    // setPageNum,
    // setName,
  } = useGetAllMedicineCategory();

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
              Deskripsi
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
            {loading || !medicine_categories ? (
              <MedicineCategoryTableSkeleton />
            ) : isEmpty(medicine_categories) ? (
              <TableNotFound />
            ) : (
              medicine_categories?.map((medicine_category, idx) => {
                const number = idx + 1;

                return (
                  <MedicineCategoryTableItem
                    key={`medicine-category-table-item-${idx}`}
                    number={number}
                    medicine_category={medicine_category}
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
export default MedicineCategoryTable;
