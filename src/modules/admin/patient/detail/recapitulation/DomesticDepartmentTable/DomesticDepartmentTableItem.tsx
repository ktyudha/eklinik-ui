import { FunctionComponent } from "react";
import { Snbp_Recapitulation } from "@services/school/alumni-snbp/interfaces/get-detail-recapitulation-domestic-department.types";

interface Props {
  number: number;
  recap: Snbp_Recapitulation;
}

const DomestictDepartmentTableItem: FunctionComponent<Props> = ({
  number,
  recap,
}) => {
  return (
    <tr className="border-b border-[#E2E8F0]">
      <td className="px-6 py-4 text-sm font-medium text-center border-2">
        {number}
      </td>
      <td className="px-6 py-4 text-sm font-medium border-2">
        {recap.student_name}
      </td>
      <td className="px-6 py-4 text-sm font-medium capitalize text-center border-2">
        {recap.university_name}
      </td>
      <td className="px-6 py-4 text-sm font-medium capitalize text-center border-2">
        {recap.grade}
      </td>
      <td className="px-6 py-4 text-sm font-medium capitalize text-center border-2">
        {recap.graduation_year}
      </td>
    </tr>
  );
};

export default DomestictDepartmentTableItem;
