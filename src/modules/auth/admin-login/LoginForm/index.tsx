import { FunctionComponent } from "react";
import { UilQuestionCircle } from "@iconscout/react-unicons";
import useGlobalStore from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/reusable/Form/Input";
import Spinner from "@/components/reusable/Spinner";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useAdminLogin } from "@/services/auth/admin-login/hooks/useAdminLogin";
import ToggleThemeNavbar from "@/layouts/DefaultLayout/ToggleThemeNavbar";
// import Logo from "@assets/images/logo-tracer.png";
import classNames from "classnames";

interface CredentialPayload {
  username: string;
  password: string;
}
type FormFields = CredentialPayload;

const AdminLoginForm: FunctionComponent = () => {
  const { setUser, setUserRole } = useGlobalStore((state) => ({
    setUser: state.setUser,
    setUserRole: state.setUserRole,
  }));
  const navigate = useNavigate();
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting, isValid } = methods.formState;

  const year = new Date().getFullYear();

  const onOpenWhatsapp = () => window.open("https://wa.me/+628115208925");

  const onHandleLogin: SubmitHandler<FormFields> = async (state) => {
    const { data, status } = await useAdminLogin(
      state.username,
      state.password
    );

    if (data && status === 200) {
      setUserRole(data.role);
      setUser(data.user);
      if (data.role === "admin") {
        Cookies.set("token", data.token);
        navigate("/admin/dashboard");
      }
    } else {
      toast.error("Login Gagal", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="lg:h-screen">
      <div className="relative">
        <div className="absolute top-5 right-5 flex">
          <ToggleThemeNavbar />
          <button
            type="button"
            className="flex items-center justify-center ml-3 gap-1 px-1 py-1 text-black bg-white rounded-full lg:px-2"
            onClick={onOpenWhatsapp}
          >
            <UilQuestionCircle />
            <p className="hidden font-sans text-base font-medium lg:inline">
              Bantuan
            </p>
          </button>
        </div>
      </div>

      <div
        className={`flex flex-col gap-8 items-center justify-center h-[700px] xs:h-[700px] sm:h-[700px] md:h-screen lg:h-screen  px-5`}
      >
        {/* logo */}
        <div className="img-wrapper">
          {/* <img src={Logo} alt="logo" className="w-48" /> */}
        </div>

        {/* form */}
        <div className="flex flex-col w-full sm:w-[400px] md:w-[400px] lg:w-[400px] ">
          <div className="px-6 py-3 flex flex-col items-center justify-center rounded-t-lg bg-base-200 mb-2">
            <h1 className="text-2xl font-semibold leading-9">Login Admin</h1>
          </div>

          <div className="flex items-center justify-center bg-base-200 rounded-b-lg">
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
                  className="block w-full bg-[#a1aebf] hover:bg-slate-500 mt-4 py-2 rounded-xl text-white font-semibold mb-2 cursor-pointer"
                  disabled={isSubmitting || !isValid}
                >
                  {!isSubmitting ? "Masuk" : <Spinner />}
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      {/* <div className="relative">
        <div className="absolute left-0 right-0 bottom-5 sm:bottom-10 md:bottom-10 lg:bottom-15 px-2">
          <section className="text-center text-white">
            <p>Copyright &copy; {year} PT. EDU INOVASI INDONESIA</p>
          </section>
        </div>
      </div> */}
    </div>
  );
};

export default AdminLoginForm;
