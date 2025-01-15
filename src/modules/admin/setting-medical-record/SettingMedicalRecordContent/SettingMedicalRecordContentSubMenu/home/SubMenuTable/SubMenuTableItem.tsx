import { FunctionComponent } from "react";
import { SubMenu } from "@/services/admin/menu/interfaces/get-all-sub-menu.types";
import SubMenuTableItemMenu from "./SubMenuTableItemMenu";

interface Props {
  number: number;
  sub_menu: SubMenu;
}

const SubMenuTableItem: FunctionComponent<Props> = ({ number, sub_menu }) => {
  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6 text-nowrap">
        <div dangerouslySetInnerHTML={{ __html: sub_menu.name }} />
      </td>
      <td className="px-6 capitalize text-nowrap mx-auto text-center">
        {sub_menu.is_active ? (
          <span className="rounded-full bg-[#00dfcb] text-white px-3 py-1">
            Active
          </span>
        ) : (
          <span className="rounded-full bg-[#762a26] text-white px-3 py-1">
            Disable
          </span>
        )}
      </td>
      <td className="px-6 text-nowrap text-center capitalize">
        {sub_menu.type}
      </td>
      <td className="flex flex-row gap-3 justify-center">
        <SubMenuTableItemMenu sub_menu={sub_menu} />
      </td>
    </tr>
  );
};

export default SubMenuTableItem;
