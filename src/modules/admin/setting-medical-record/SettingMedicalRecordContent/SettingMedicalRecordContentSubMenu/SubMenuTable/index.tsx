import { FunctionComponent, useEffect } from "react";
import { isEmpty } from "lodash";
import usePagination from "@/hooks/usePagination";
import TableWrapper from "@/components/reusable/Table/TableWrapper";
import TableHead from "@/components/reusable/Table/TableHead";
import TableBody from "@/components/reusable/Table/TableBody";
import TableNotFound from "@/components/reusable/Table/TableNotFound";
import SubMenuTableSkeleton from "./SubMenuMenuTableSkeleton";
import TablePagination from "@/components/reusable/Table/TablePagination";
import SubMenuTableItem from "./SubMenuTableItem";
import MenuTableHeader from "./SubMenuTableHeader";

import useGetAllSubMenu from "@/services/admin/menu/hooks/useGetAllSubMenu";

const SubMenuTable: FunctionComponent = () => {
  const {
    sub_menus,
    loading,
    pagination,
    pageLimit,
    setPageLimit,
    setPageNum,
    setName,
  } = useGetAllSubMenu();

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
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Tipe Form
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-center"
            >
              Action
            </th>
          </TableHead>
          <TableBody>
            {loading || !sub_menus ? (
              <SubMenuTableSkeleton />
            ) : isEmpty(sub_menus) ? (
              <TableNotFound />
            ) : (
              sub_menus?.map((sub_menu, idx) => {
                const number = idx + 1;

                return (
                  <SubMenuTableItem
                    key={`menu-table-item-${idx}`}
                    number={number}
                    sub_menu={sub_menu}
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
export default SubMenuTable;
