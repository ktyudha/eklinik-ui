import { FunctionComponent } from "react";
import { format as dateFormat } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Medicine } from "@/services/admin/medicine/interfaces/get-all-medicine.types";
import MedicineTableItemMenu from "./MedicineTableItemMenu";

interface Props {
  number: number;
  medicine: Medicine;
}

const MedicineTableItem: FunctionComponent<Props> = ({ number, medicine }) => {
  const formattedExpiredDate = medicine.expired_date
    ? dateFormat(new Date(medicine.expired_date), "eeee, dd MMMM yyyy", {
        locale: localeId,
      })
    : "";

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(medicine.price);

  return (
    <tr>
      <td className="mx-auto text-center">{number}</td>
      <td className="px-6 text-nowrap">{medicine.name}</td>
      <td className="px-6 capitalize text-nowrap">{formattedExpiredDate}</td>
      <td className="px-6 capitalize text-nowrap">{formattedPrice}</td>
      <td className="px-6 capitalize text-nowrap">
        {medicine.stock} {medicine.unit}
      </td>
      <td className="flex flex-row gap-3">
        <MedicineTableItemMenu medicine={medicine} />
      </td>
    </tr>
  );
};

export default MedicineTableItem;
