import { FunctionComponent } from "react";
// import AdminLoginBillboard from "@/modules/auth/admin-login/LoginBillboard";
import AdminLoginForm from "@/modules/auth/admin-login/LoginForm";
import ToggleThemeNavbar from "../../modules/auth/ToggleThemeNavbar";

const AdminLoginPage: FunctionComponent = () => (
  <div className="w-full">
    <AdminLoginForm />
  </div>
);

export default AdminLoginPage;
