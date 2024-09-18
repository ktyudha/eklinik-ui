import { FunctionComponent } from "react";
import LoginBillboard from "@/modules/auth/login/LoginBillboard";
import LoginForm from "@/modules/auth/login/LoginForm";

const AdminLoginPage: FunctionComponent = () => (
  <div className="w-full">
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-12 lg:col-span-5">
        <LoginBillboard />
      </div>
      <div className="col-span-12 md:col-span-12 lg:col-span-7">
        <LoginForm />
      </div>
    </div>
  </div>
);

export default AdminLoginPage;
