import { FunctionComponent } from "react";
import Logo from "@/assets/logo/siloam.png";
import useGlobalStore from "@/store/useStore";
import { useNavigate, NavLink } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/reusable/Form/Input";
import Spinner from "@/components/reusable/Spinner";
import clsx from "clsx";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useLogin } from "@/services/auth/login/hooks/useLogin";
interface CredentialPayload {
  username: string;
  password: string;
}
type FormFields = CredentialPayload;

const LoginForm: FunctionComponent = () => {
  const { setUser, setUserRole } = useGlobalStore((state) => ({
    setUser: state.setUser,
    setUserRole: state.setUserRole,
  }));
  const navigate = useNavigate();
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting, isValid } = methods.formState;

  const onHandleLogin: SubmitHandler<FormFields> = async (state) => {
    const { data, status } = await useLogin(state.username, state.password);

    if (data && status === 200) {
      setUserRole(data.role);
      setUser(data.user);
      if (data.role === "patient") {
        Cookies.set("token-patient", data.token);
        navigate("/history");
      }
    } else {
      toast.error("Login Gagal", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="w-full min-h-screen max-w-full md:flex justify-center mx-auto bg-[#F1F5F9]">
      {/* <Icon name="spiral-3d" size={359}></Icon> */}
      <div className="h-4/5 md:h-fit bg-white w-full md:max-w-sm rounded-t-[20px] md:rounded-b-[20px] absolute top-[20%]">
        <NavLink to="/" className="flex pt-[43px] mx-auto justify-center mb-6">
          <img src={Logo} alt="logo-edubook" className="mr-3  h-[38px]" />
          {/* <span className="font-bold text-2xl my-auto">Edubook</span> */}
        </NavLink>

        <div className="text-center mx-6">
          <h3 className="text-[#020617] font-bold text-[32px] leading-8 mb-2">
            Masuk/Daftar
          </h3>
          <p className="text-base text-[#334155] font-normal">
            Masuk Akun dengan Username dan Kata Sandi
          </p>
        </div>

        <div className="p-5 bg-white rounded-b-xl">
          <FormProvider {...methods}>
            <form
              className="p-6 w-full"
              onSubmit={methods.handleSubmit(onHandleLogin)}
            >
              <div className="flex flex-col gap-3">
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  isRequired
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  withShowPasswordButton
                  isRequired
                />
              </div>

              <button
                type="submit"
                className={clsx([
                  "block w-full py-2 mt-4 rounded-xl font-semibold mb-2 cursor-pointer",
                  isValid
                    ? "bg-[#4bb43a] hover:bg-[#4bb43a] text-white"
                    : "bg-neutral-200 text-neutral-400",
                ])}
                disabled={isSubmitting || !isValid}
              >
                <span>{isSubmitting ? <Spinner /> : "Masuk"}</span>
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
