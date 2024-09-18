import { FunctionComponent, useState, useEffect } from "react";
import useGlobalStore from "@/store/useStore";
import { UilAngleDown, UilAngleUp } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

interface Props {
  icon: string;
  name: string;
  url: string;
  isActiveMenu: boolean;
  isDropdown?: boolean;
  hasSubmenu?: boolean;
  submenuLinks?: {
    id?: string | null;
    subUrl: string;
    label: string;
    forceShow?: boolean;
  }[];
}

const SidebarMenuItem: FunctionComponent<Props> = ({
  icon,
  name,
  url,
  isActiveMenu,
  isDropdown = true,
  hasSubmenu = false,
  submenuLinks,
}) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(false);
  const { isSidebarExpand } = useGlobalStore((state) => ({
    isSidebarExpand: state.isSidebarExpand,
  }));

  const onSidebarClick = () => {
    if (isSidebarExpand && isDropdown) {
      setActiveDropdown(!activeDropdown);
    } else {
      navigate(url);
    }
  };

  useEffect(() => {
    setActiveDropdown(false);
  }, [isActiveMenu]);

  return (
    <div
      className={`${
        isActiveMenu && "bg-base-100 rounded-lg"
      } hover:bg-white hover:text-[#006C1C] cursor-pointer`}
      onClick={onSidebarClick}
    >
      <div
        className={`flex items-center ${
          !isSidebarExpand && "justify-center"
        } py-2 px-1`}
      >
        <div className="flex items-center gap-3 px-3 py-1 text-center">
          <img
            src={icon}
            alt="Icon"
            loading="lazy"
            width={22}
            className="hover:fill-blue-500"
          />

          {isSidebarExpand && (
            <p className="text-base font-medium leading-4 text-left">{name}</p>
          )}
        </div>
        {isSidebarExpand && isDropdown && (
          <div className="flex items-center text-white">
            {!activeDropdown ? (
              <UilAngleDown size={30} />
            ) : (
              <UilAngleUp size={30} />
            )}
          </div>
        )}
      </div>

      {isSidebarExpand && hasSubmenu && (
        <>
          {activeDropdown &&
            submenuLinks?.map((subMenu, idx) => (
              <div
                key={`sub-menu-${idx}`}
                className="hover:bg-[#75ba88] hover:text-white cursor-pointer flex flex-col gap-5 px-5 py-3"
                onClick={() => navigate(subMenu.subUrl)}
              >
                <div className="px-8 font-medium">{subMenu.label}</div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default SidebarMenuItem;
