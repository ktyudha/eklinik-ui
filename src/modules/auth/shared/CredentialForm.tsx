import { FunctionComponent } from "react";
import clsx from "clsx";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/reusable/Form/Input";
import Spinner from "@/components/reusable/Spinner";

export interface Credentials { username: string; password: string }

const CredentialForm: FunctionComponent<{ onSubmit: SubmitHandler<Credentials> }> = ({ onSubmit }) => {
  const methods = useForm<Credentials>({ mode: "onChange" });
  const { isSubmitting, isValid } = methods.formState;
  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <Input label="Username" name="username" type="text" placeholder="Masukkan username" isRequired />
        <Input label="Kata sandi" name="password" type="password" placeholder="Masukkan kata sandi" withShowPasswordButton isRequired />
        <button type="submit" disabled={isSubmitting || !isValid}
          className={clsx("w-full h-11 rounded-xl font-semibold transition-colors", isValid ? "bg-primary text-white hover:bg-brand-dark" : "bg-slate-200 text-slate-400")}>
          {isSubmitting ? <Spinner /> : "Masuk"}
        </button>
      </form>
    </FormProvider>
  );
};

export default CredentialForm;
