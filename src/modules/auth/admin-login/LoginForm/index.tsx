import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useGlobalStore from "@/store/useStore";
import { useAdminLogin } from "@/services/auth/admin-login/hooks/useAdminLogin";
import AuthShell from "../../shared/AuthShell";
import CredentialForm, { Credentials } from "../../shared/CredentialForm";

const AdminLoginForm: FunctionComponent = () => {
  const { setUser, setUserRole } = useGlobalStore((s) => ({ setUser: s.setUser, setUserRole: s.setUserRole }));
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }: Credentials) => {
    const { data, status } = await useAdminLogin(username, password);
    if (data && status === 200) {
      // Semua tenaga kesehatan (dokter, perawat, apoteker, pendaftaran) memakai panel admin;
      // hak akses dibatasi oleh izin role di API.
      setUserRole("admin");
      setUser(data.user);
      Cookies.set("token", data.token);
      navigate("/admin/dashboard");
    } else {
      toast.error("Username atau kata sandi salah", { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <AuthShell title="Masuk Tenaga Kesehatan" subtitle="Gunakan akun klinik Anda untuk melanjutkan."
      footer={<>Pasien? <Link to="/login" className="text-primary font-medium">Masuk di sini</Link></>}>
      <CredentialForm onSubmit={onSubmit} />
    </AuthShell>
  );
};

export default AdminLoginForm;
