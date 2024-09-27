import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { UilEye } from "@iconscout/react-unicons";
import { Snbp_Recapitulations } from "@services/school/alumni-snbp/interfaces/get-recapitulation-domestic-university.types";

interface Props {
  number: number;
  recap: Snbp_Recapitulations;
}

const UniversityTableItem: FunctionComponent<Props> = ({ number, recap }) => {
  const navigate = useNavigate();
  const onHandleNavigate = () => {
    navigate(
      `/school/alumni-snbp/recapitulation/${recap.university_id.toLowerCase()}`,
      {
        state: {
          location: "domestic",
          type: "university",
        },
      }
    );
  };

  return (
    <tr className="border-b border-[#E2E8F0]">
      <td className="px-6 py-3 text-sm font-medium text-center border-2">
        {number}
      </td>
      <td className="px-6 py-3 text-sm font-medium uppercase border-2">
        <span
          className="cursor-pointer text-blue-500 w-auto"
          onClick={() => onHandleNavigate()}
        >
          {recap.university_name}
        </span>
      </td>
      <td className="px-6 py-3 text-sm font-medium text-center border-2">
        {recap.count} [{recap.percentage}]
      </td>
      <td className="px-6 py-3 text-sm font-medium text-center border-2">
        <button
          type="button"
          className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-700 border border-blue-500 rounded-md w-full py-1 px-3"
          onClick={() => onHandleNavigate()}
        >
          <UilEye size="20" color="white" />
          <span className="text-white">Lihat Detail</span>
        </button>
      </td>
    </tr>
  );
};

export default UniversityTableItem;
