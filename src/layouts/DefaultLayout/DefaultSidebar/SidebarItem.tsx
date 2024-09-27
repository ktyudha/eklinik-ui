import { FunctionComponent, useState, useEffect } from "react";
import useGlobalStore from "@/store/useStore";
import { UilAngleDown } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

interface Props {
  icon: React.ElementType;
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
  icon: Icon,
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
      className={`flex flex-col ${isActiveMenu && "bg-base-200 rounded-lg"}`}
      onClick={onSidebarClick}
    >
      <div className="w-full block">
        <div className="inline-flex items-center gap-2">
          {/* <img
            src={icon}
            alt="Icon"
            loading="lazy"
            width={22}
            className="hover:fill-blue-500"
          /> */}
          <Icon size={30} loading="lazy" />
          <span className="font-semibold text-md">{name}</span>
        </div>
        {isSidebarExpand && isDropdown && (
          <UilAngleDown
            size={30}
            className={` float-right delay-400 duration-500 transition-all ${
              activeDropdown ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {isSidebarExpand && hasSubmenu && (
        <div
          className={`w-full transition-all duration-500 ease-in-out overflow-hidden ${
            !activeDropdown ? "hidden" : "max-h-screen"
          }`}
        >
          <ul className="menu menu-compact">
            {submenuLinks?.map((subMenu, idx) => (
              <li
                key={`sub-menu-${idx}`}
                onClick={() => navigate(subMenu.subUrl)}
              >
                <div className="font-medium">{subMenu.label}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarMenuItem;
