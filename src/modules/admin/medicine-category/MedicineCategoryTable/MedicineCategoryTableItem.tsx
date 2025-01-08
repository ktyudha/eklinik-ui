import { FunctionComponent } from "react";
import { MedicineCategory } from "@/services/admin/medicine-category/interfaces/get-all-medicine-category.types";
import MedicineCategoryTableItemMenu from "./MedicineCategoryTableItemMenu";

interface Props {
  number: number;
  medicine_category: MedicineCategory;
}

const MedicineCategoryTableItem: FunctionComponent<Props> = ({
  number,
  medicine_category,
}) => {
  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6 text-nowrap">{medicine_category.name}</td>
      <td className="px-6 capitalize text-nowrap truncate max-w-xs">
        {medicine_category.description}
      </td>
      <td className="flex flex-row gap-3">
        <MedicineCategoryTableItemMenu medicine_category={medicine_category} />
      </td>
    </tr>
  );
};

export default MedicineCategoryTableItem;
