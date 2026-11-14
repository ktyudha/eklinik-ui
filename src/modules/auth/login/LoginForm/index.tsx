import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useGlobalStore from "@/store/useStore";
import { useLogin } from "@/services/auth/login/hooks/useLogin";
import AuthShell from "../../shared/AuthShell";
import CredentialForm, { Credentials } from "../../shared/CredentialForm";

const LoginForm: FunctionComponent = () => {
  const { setUser, setUserRole } = useGlobalStore((s) => ({ setUser: s.setUser, setUserRole: s.setUserRole }));
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }: Credentials) => {
    const { data, status } = await useLogin(username, password);
    if (data && status === 200 && data.role === "patient") {
      setUserRole(data.role);
      setUser(data.user);
      Cookies.set("token-patient", data.token);
      navigate("/history");
    } else {
      toast.error("Username atau kata sandi salah", { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <AuthShell title="Masuk Pasien" subtitle="Lihat antrian dan riwayat pemeriksaan Anda."
      footer={<>Tenaga kesehatan? <Link to="/admin/login" className="text-primary font-medium">Masuk di sini</Link></>}>
      <CredentialForm onSubmit={onSubmit} />
    </AuthShell>
  );
};

export default LoginForm;
