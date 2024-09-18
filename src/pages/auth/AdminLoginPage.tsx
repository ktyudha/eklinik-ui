import { FunctionComponent } from "react";
// import AdminLoginBillboard from "@/modules/auth/admin-login/LoginBillboard";
import AdminLoginForm from "@/modules/auth/admin-login/LoginForm";

const AdminLoginPage: FunctionComponent = () => (
  <div className="w-full">
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-12 lg:col-span-7">
        <AdminLoginForm />
      </div>
    </div>
  </div>
);

export default AdminLoginPage;
