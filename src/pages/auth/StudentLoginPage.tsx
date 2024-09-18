import { FunctionComponent } from "react"
import StudentLoginBillboard from "@/modules/auth/student-login/LoginBillboard"
import StudentLoginForm from "@/modules/auth/student-login/LoginForm"

const StudentLoginPage: FunctionComponent = () => (
  <div className="w-full">
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-12 lg:col-span-5">
        <StudentLoginBillboard />
      </div>
      <div className="col-span-12 md:col-span-12 lg:col-span-7">
        <StudentLoginForm />
      </div>
    </div>
  </div>
)

export default StudentLoginPage
