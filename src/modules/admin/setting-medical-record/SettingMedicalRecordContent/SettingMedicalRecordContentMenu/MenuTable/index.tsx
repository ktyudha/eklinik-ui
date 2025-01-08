import { FunctionComponent, useEffect } from "react";
import { isEmpty } from "lodash";
import usePagination from "@/hooks/usePagination";
import TableWrapper from "@/components/reusable/Table/TableWrapper";
import TableHead from "@/components/reusable/Table/TableHead";
import TableBody from "@/components/reusable/Table/TableBody";
import TableNotFound from "@/components/reusable/Table/TableNotFound";
import MenuTableSkeleton from "./MenuTableSkeleton";
import TablePagination from "@/components/reusable/Table/TablePagination";
import MenuTableItem from "./MenuTableItem";
import MenuTableHeader from "./MenuTableHeader";

import useGetAllMenu from "@/services/admin/menu/hooks/useGetAllMenu";

const MedicineTable: FunctionComponent = () => {
  const {
    menus,
    loading,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setName,
  } = useGetAllMenu();

  const { currentPage, goNextPage, goPrevPage } = usePagination(
    pagination?.last_page || 1
  );

  useEffect(() => {
    setPageNum(currentPage);
  }, [currentPage]);

  return (
    <div>
      <MenuTableHeader setNameCallback={(e) => setName(e)} />
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
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-medium text-left">
              Klasifikasi
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Jumlah Pertanyaan
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Action
            </th>
          </TableHead>
          <TableBody>
            {loading || !menus ? (
              <MenuTableSkeleton />
            ) : isEmpty(menus) ? (
              <TableNotFound />
            ) : (
              menus?.map((menu, idx) => {
                const number = idx + 1;

                return (
                  <MenuTableItem
                    key={`menu-table-item-${idx}`}
                    number={number}
                    menu={menu}
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
export default MedicineTable;
