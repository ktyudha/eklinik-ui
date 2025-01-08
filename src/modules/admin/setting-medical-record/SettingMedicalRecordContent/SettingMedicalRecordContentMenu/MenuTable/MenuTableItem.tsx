import { FunctionComponent } from "react";
import { Menu } from "@/services/admin/menu/interfaces/get-all-menu.types";
import MenuTableItemMenu from "./MenuTableItemMenu";

interface Props {
  number: number;
  menu: Menu;
}

const MedicineTableItem: FunctionComponent<Props> = ({ number, menu }) => {
  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6 text-nowrap">{menu.name}</td>
      <td className="px-6 capitalize text-nowrap mx-auto text-center">
        {menu.is_active ? (
          <span className="rounded-full bg-[#00dfcb] text-white px-3 py-1">
            Active
          </span>
        ) : (
          <span className="rounded-full bg-[#762a26] text-white px-3 py-1">
            Disable
          </span>
        )}
      </td>
      <td className="px-6 ">
        <div className="flex max-w-xs truncate gap-3">
          {menu.classifications?.map((classification, idx) => {
            return (
              <span
                key={idx}
                className="border border-[#7e2e9d] text-[#7e2e9d] px-1.5 py-0.5 rounded hover:bg-[#7e2e9d] hover:text-white cursor-pointer transition-colors ease-in-out duration-300"
              >
                {classification.name}
              </span>
            );
          })}
        </div>
      </td>
      <td className="px-6 text-nowrap text-center">{menu.submenus.length}</td>
      <td className="flex flex-row gap-3">
        <MenuTableItemMenu menu={menu} />
      </td>
    </tr>
  );
};

export default MedicineTableItem;
