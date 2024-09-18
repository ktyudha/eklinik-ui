import { FunctionComponent } from "react"
import Logo from "@assets/images/login-cover.jpg"

const LoginBillboard: FunctionComponent = () => (
  <img
    src={Logo}
    alt="Icon"
    className="hidden w-full h-full max-h-screen bg-center bg-cover object-cover lg:inline"
    loading="lazy"
  />
)

export default LoginBillboard
