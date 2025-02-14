import { FunctionComponent, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { formatToInputDate } from "@/helpers/date";
import Spinner from "@/components/reusable/Spinner";
import Input from "@/components/reusable/Form/Input";
import SelectTwo from "@/components/reusable/Form/SelectTwo";
import useMapInputOptions from "@/hooks/useMapInputOptions";
import useUpdateMedical from "@/services/admin/medical/hooks/useUpdateMedical";
import { ICreateOrUpdateMedicalPayload } from "@/services/admin/medical/interfaces/create-or-update-medical.types";

import useGetAllClassification from "@/services/admin/classification/hooks/useGetAllClassification";
import useGetClassification from "@/services/admin/classification/hooks/useGetClassification";
import useGetAllPatient from "@/services/admin/patient/hooks/useGetAllPatient";
import useGetMedical from "@/services/admin/medical/hooks/useGetMedical";

type FormFields = ICreateOrUpdateMedicalPayload;

const MedicalRecordCreateContent: FunctionComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { medical, loading: LoadingMedical } = useGetMedical(id as string);
  const [selectedClassification, setSelectedClassification] = useState<
    string | null
  >(null);

  const { patients } = useGetAllPatient();
  const { classifications } = useGetAllClassification();
  const { classification, loading } = useGetClassification(
    selectedClassification as string
  );

  const patientOptions = useMapInputOptions(patients);
  const classificationOptions = useMapInputOptions(classifications);

  const methods = useForm<FormFields>({ mode: "onChange" });

  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  useEffect(() => {
    const classificationData = methods.getValues("classification_id");
    if (classificationData && classificationData !== selectedClassification) {
      setSelectedClassification(classificationData);
    }
  }, [methods.watch("classification_id")]);

  useEffect(() => {
    setSelectedClassification(medical?.classification.id as string);
  }, [medical]);

  const { updateMedical } = useUpdateMedical(id as string);

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const submenuData =
      classification?.menus.flatMap((menu) =>
        menu.submenus.map((submenu) => ({
          id: submenu.id,
          name: submenu.name,
          value: (state as Record<string, any>)[submenu.id] || "",
        }))
      ) || [];

    const { error, response } = await updateMedical({
      ...state,
      submenu: submenuData,
    });
    if (error || response) {
      if (error) {
        console.log(error);
        console.log(state);
        toast.error("Gagal Mengubah Rekam Medis", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Mengubah Rekam Medis", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/admin/medical-record");

        methods.reset();
      }
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="mt-5 rounded-lg p-5 border col-span-12 border-[#E2E8F0] bg-white">
        <FormProvider {...methods}>
          <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
            {LoadingMedical ? (
              <div>...Loading</div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                <SelectTwo
                  label="Pasien"
                  name="patient_id"
                  isSearchable
                  isRequired
                  selectTwoOptions={patientOptions}
                  defaultValue={patientOptions.find(
                    (opt) => opt.value === medical?.patient.id
                  )}
                />

                <SelectTwo
                  label="Kategori"
                  name="classification_id"
                  isSearchable
                  isRequired
                  selectTwoOptions={classificationOptions}
                  defaultValue={classificationOptions.find(
                    (opt) => opt.value === medical?.classification.id
                  )}
                />

                <Input
                  label="Tanggal Pemeriksaan"
                  type="datetime-local"
                  placeholder="xxx"
                  name="checkup_date"
                  isRequired
                  defaultValue={formatToInputDate(
                    medical?.checkup_date as string
                  )}
                />
              </div>
            )}

            {loading || !classification ? (
              <div className="my-4 mx-auto text-center">
                <div className="sweet-loading">
                  <BeatLoader color="#1c2674" />
                  <h3 className="font-semibold text-lg">Loading</h3>
                </div>
              </div>
            ) : isEmpty(classification) ? (
              <div>KOSONG</div>
            ) : (
              classification?.menus
                .filter((menu) => menu.is_active)
                .map((menu, idx) => {
                  return (
                    <>
                      <div key={idx}>
                        <h3 className="my-3 font-semibold uppercase">
                          {menu.name}
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
                          {menu.submenus
                            .filter((submenu) => submenu.is_active)
                            .map((submenu) => {
                              const matchedSubmenu = medical?.submenu?.find(
                                (opt) => opt.id === submenu.id
                              );

                              return (
                                <>
                                  <Input
                                    label={submenu.name.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    )}
                                    type="text"
                                    placeholder={submenu.name.replace(
                                      /<\/?[^>]+(>|$)/g,
                                      ""
                                    )}
                                    name={submenu.id}
                                    isRequired
                                    defaultValue={
                                      matchedSubmenu ? matchedSubmenu.value : ""
                                    }
                                  />
                                </>
                              );
                            })}
                        </div>
                      </div>
                    </>
                  );
                })
            )}

            {selectedClassification && (
              <div className="flex flex-col justify-end w-full gap-3 mt-5 md:flex-row">
                <button
                  type="button"
                  className="px-20 py-3 text-base font-medium leading-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                  onClick={() => navigate("/admin/medical-record")}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className={`rounded-lg px-20 py-3 font-medium text-base leading-4 text-white ${
                    !isValid || isSubmitting
                      ? "bg-[#9fe194] cursor-not-allowed focus:outline-none disabled:opacity-100"
                      : "bg-[#4bb43a] hover:bg-[#379029]"
                  }`}
                  disabled={!isValid || isSubmitting}
                >
                  {!isSubmitting ? "Submit" : <Spinner />}
                </button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default MedicalRecordCreateContent;
