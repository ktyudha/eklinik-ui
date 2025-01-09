import { FunctionComponent } from "react";
import { Classification } from "@/services/admin/classification/interfaces/get-all-classification.types";
import ClassificationTableItemMenu from "./ClassificationTableItemMenu";

interface Props {
  number: number;
  classification: Classification;
}

const ClassificationTableItem: FunctionComponent<Props> = ({
  number,
  classification,
}) => {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(classification.price);

  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6 text-nowrap">{classification.name}</td>
      <td className="px-6 capitalize text-nowrap">
        {classification.description}
      </td>
      <td className="px-6 capitalize text-nowrap">{formattedPrice}</td>
      <td className="px-6">
        <div className="flex max-w-xs truncate gap-3">
          {classification.menus?.map((menu, idx) => {
            return (
              <span
                key={idx}
                className="border border-[#7e2e9d] text-[#7e2e9d] px-1.5 py-0.5 rounded hover:bg-[#7e2e9d] hover:text-white cursor-pointer transition-colors ease-in-out duration-300"
              >
                {menu.name}
              </span>
            );
          })}
        </div>
      </td>
      <td className="flex flex-row gap-3">
        <ClassificationTableItemMenu classification={classification} />
      </td>
    </tr>
  );
};

export default ClassificationTableItem;
