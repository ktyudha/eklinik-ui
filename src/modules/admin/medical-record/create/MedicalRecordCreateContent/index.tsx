// import { FunctionComponent } from "react";
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import Spinner from "@/components/reusable/Spinner";

// type FormFields = ICreateOrUpdateSubMenuPayload;

// const QuestionCreateContent: FunctionComponent = () => {
//   const navigate = useNavigate();

//   const methods = useForm<FormFields>({ mode: "onChange" });
//   const { isSubmitting } = methods.formState;
//   const isValid = methods.formState.isValid;
//   const { createSubMenu } = useCreateSubMenu();
//   const onSubmit: SubmitHandler<FormFields> = async (state) => {
//     const { error, response } = await createSubMenu({ ...state });
//     if (error || response) {
//       if (error) {
//         toast.error("Gagal Menambahkan Pertanyaan", {
//           position: toast.POSITION.TOP_CENTER,
//         });
//       } else {
//         toast.success("Sukses Menambahkan Pertanyaan", {
//           position: toast.POSITION.TOP_CENTER,
//         });

//         methods.reset();
//       }
//     }
//   };

//   return (
//     <div className="grid grid-cols-12">
//       <div className="mt-5 rounded-lg p-5 border col-span-12 border-[#E2E8F0]">
//         <FormProvider {...methods}>
//           <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
//             <div className="flex flex-col justify-end w-full gap-3 mt-5 md:flex-row">
//               <button
//                 type="button"
//                 className="px-20 py-3 text-base font-medium leading-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
//                 onClick={() => navigate("/admin/medical-record")}
//               >
//                 Kembali
//               </button>
//               <button
//                 type="submit"
//                 className={`rounded-lg px-20 py-3 font-medium text-base leading-4 text-white ${
//                   !isValid || isSubmitting
//                     ? "bg-[#9fe194] cursor-not-allowed focus:outline-none disabled:opacity-100"
//                     : "bg-[#4bb43a] hover:bg-[#379029]"
//                 }`}
//                 disabled={!isValid || isSubmitting}
//               >
//                 {!isSubmitting ? "Submit" : <Spinner />}
//               </button>
//             </div>
//           </form>
//         </FormProvider>
//       </div>
//     </div>
//   );
// };

// export default QuestionCreateContent;
