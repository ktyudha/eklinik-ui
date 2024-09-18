import { FunctionComponent } from "react";
// import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";

const FooterSection: FunctionComponent = () => {
  const year = new Date().getFullYear();
  // const navigate = useNavigate();

  return (
    <>
      <footer className="footer footer-center p-4">
        <aside>
          <p>© {year} Kurniawan Try Yudha</p>
        </aside>
      </footer>
    </>
  );
};

export default FooterSection;
