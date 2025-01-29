import { FunctionComponent } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  icon: React.ElementType;
  name: string;
  url: string;
}

const BottombarItem: FunctionComponent<Props> = ({ icon: Icon, name, url }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveMenu = location.pathname === url;
  return (
    <button
      className={`${isActiveMenu ? "active" : ""}`}
      onClick={() => navigate(url)}
    >
      <Icon size={20} loading={"lazy"} />
      <span className="btm-nav-label">{name}</span>
    </button>
  );
};

export default BottombarItem;
