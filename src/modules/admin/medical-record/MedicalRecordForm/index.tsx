// import { FunctionComponent, useEffect, useMemo, useCallback } from "react";
// import _ from "lodash";
// import * as RCSelect from "react-select";
// import ReactSelect from "react-select";
// import useStudentStore from "@modules/student/_store/useStudentStore";
// import SurveyFormRadio from "./MedicalRecordFormRadio";
// import SurveyFormCheckbox from "./MedicalRecordFormCheckbox";
// import SurveyFormDate from "./MedicalRecordFormDate";
// import SurveyFormInput from "./MedicalRecordFormInput";
// import useGetAllProvince from "@services/global/region/province/hooks/useGetAllProvince";
// import useGetAllCountry from "@services/global/region/country/hooks/useGetAllCountry";
// import useGetAllUniversity from "@services/global/study/university/hooks/useGetAllUniversity";
// import useGetAllDepartement from "@services/global/study/departement/hooks/useGetAllDepartement";
// import { Question } from "@services/student/group/interfaces/get-all-group.types";
// import { Country } from "@services/global/region/country/interfaces/get-all-country.types";
// import { Province } from "@services/global/region/province/interfaces/get-all-province.types";
// import { University } from "@services/global/study/university/interfaces/get-university.types";
// import { Departement } from "@services/global/study/departement/interfaces/get-detartment.types";
// import useSetStudentAnswer from "@hooks/useSetStudentAnswer";
// import { StudentAnswer } from "@modules/student/_store/slices/answer.slice";

// const selectStyles: RCSelect.StylesConfig = {
//   control: (styles) => ({
//     ...styles,
//     backgroundColor: "white",
//     border: "2px solid #e5e7eb",
//     borderRadius: "8px",
//     paddingLeft: "6px",
//     paddingRight: "6px",
//     paddingTop: "1px",
//     paddingBottom: "1px",
//     boxShadow: "none",
//     ":hover": {
//       border: "2px solid #e5e7eb",
//     },
//   }),
//   option: (styles) => ({
//     ...styles,
//   }),
//   input: (styles) => ({
//     ...styles,
//     fontSize: "15px",
//     fontWeight: 400,
//     lineHeight: "20px",
//     color: "neutral.800",
//   }),
//   placeholder: (styles) => ({
//     ...styles,
//     fontSize: "15px",
//     fontWeight: 400,
//     lineHeight: "20px",
//     color: "#6b7280",
//   }),
//   menu: (provided) => ({
//     ...provided,
//     zIndex: "-10px",
//   }),
//   menuPortal: (provided) => ({
//     ...provided,
//     zIndex: "-10px",
//   }),
// };

// interface Props {
//   question: Question;
// }

// const MedicalRecordForm: FunctionComponent<Props> = ({ question }) => {
//   const {
//     studentAnswers,
//     arrQuestionWithRule,
//     selectedProvince,
//     selectedCity,
//     selectedUniversity,
//     selectedDepartment,
//     disabledAllOptionWithoutThis,
//     setStudentAnswers,
//     setSelectedProvince,
//     setSelectedCity,
//     setSelectedUniversity,
//     setSelectedDepartment,
//     setDisabledAllOptionWithoutThis,
//   } = useStudentStore((state) => ({
//     arrQuestionWithRule: state.arrQuestionWithRule,
//     studentAnswers: state.studentAnswers,
//     selectedProvince: state.selectedProvince,
//     selectedCity: state.selectedCity,
//     selectedUniversity: state.selectedUniversity,
//     selectedDepartment: state.selectedDepartment,
//     disabledAllOptionWithoutThis: state.disabledAllOptionWithoutThis,
//     setStudentAnswers: state.setStudentAnswers,
//     setSelectedProvince: state.setSelectedProvince,
//     setSelectedCity: state.setSelectedCity,
//     setSelectedUniversity: state.setSelectedUniversity,
//     setSelectedDepartment: state.setSelectedDepartment,
//     setDisabledAllOptionWithoutThis: state.setDisabledAllOptionWithoutThis,
//   }));

//   const { setStudentAnswer } = useSetStudentAnswer({
//     arr: studentAnswers,
//     setArray: setStudentAnswers,
//     listQuestionIdWithRule: arrQuestionWithRule,
//   });

//   const isSelectCountry = question.question.includes("**select-country**");
//   const isSelectProvince = question.question.includes("**select-province**");
//   const isSelectCity = question.question.includes("**select-city**");
//   const isSelectUniversity = question.question.includes(
//     "**select-university**"
//   );
//   const isSelectDepartement = question.question.includes(
//     "**select-department**"
//   );

//   const { countries, loading: loadingCountry } = useGetAllCountry();
//   const {
//     universities,
//     loading: loadingUniversity,
//     setName: setUniversityName,
//   } = useGetAllUniversity();
//   const {
//     departments,
//     loading: loadingDepartment,
//     setName: setDepartmentName,
//     setUniversityId,
//   } = useGetAllDepartement();
//   const { provinces, loading: loadingProvince } = useGetAllProvince();

//   const countryOptions = useMemo(() => {
//     if (!loadingCountry && countries) {
//       return countries;
//     }
//     return [];
//   }, [loadingCountry]);

//   const provinceOptions = useMemo(() => {
//     if (!loadingProvince && provinces) {
//       return provinces;
//     }
//     return [];
//   }, [loadingProvince]);

//   const cityOptions =
//     !loadingProvince && provinces
//       ? provinces?.find((province) => province.id === selectedProvince?.value)
//           ?.cities
//       : [];

//   const universityOptions =
//     !loadingUniversity && universities ? universities : [];
//   const departementOptions =
//     !loadingDepartment && departments && selectedUniversity?.value !== undefined
//       ? departments
//       : [];

//   const onChangeStudentAnswerCallback = useCallback(
//     (param: StudentAnswer) => {
//       setStudentAnswer(param);
//     },
//     [setStudentAnswer]
//   );

//   const onChangeCountry = (param: string) => {
//     setStudentAnswer({
//       questionType: "**select-country**",
//       questionId: question.id,
//       questionAnswerId: null,
//       extraAnswer: param,
//     });
//   };

//   const onChangeUniversity = (param: any) => {
//     if (param !== null) {
//       // set callback data to array student_answers
//       setStudentAnswer({
//         questionType: "**select-university**",
//         questionId: question.id,
//         questionAnswerId: null,
//         extraAnswer: param.value.toLowerCase(),
//       });
//       // set callback data to state
//       setSelectedUniversity(param);
//     } else {
//       // remove callback data from array student_answers
//       setStudentAnswer({
//         questionType: "**select-university**",
//         questionId: question.id,
//         questionAnswerId: null,
//         extraAnswer: "",
//       });
//       // reset callback data from state
//       setSelectedUniversity(null);
//       setSelectedDepartment(null);
//     }
//   };

//   const onHandleSearchUniversity = (val: string) => {
//     if (val !== "") {
//       setUniversityName(val);
//     } else {
//       setUniversityName("");
//     }
//   };

//   const onChangeDepartement = (param: any) => {
//     if (param !== null) {
//       // set callback data to array student_answers
//       setStudentAnswer({
//         questionType: "**select-department**",
//         questionId: question.id,
//         questionAnswerId: null,
//         extraAnswer: param.value.toLowerCase(),
//       });
//       // set callback data to state
//       setSelectedDepartment(param);
//     } else {
//       // remove callback data from array student_answers
//       setStudentAnswer({
//         questionType: "**select-department**",
//         questionId: question.id,
//         questionAnswerId: null,
//         extraAnswer: "",
//       });
//       // reset callback data from state
//       setSelectedDepartment(null);
//     }
//   };

//   const onChangeProvince = (param: any) => {
//     if (param !== null) {
//       // set callback data to array student_answers
//       setStudentAnswer({
//         questionType: "**select-province**",
//         questionId: question.id,
//         questionAnswerId: null,
//         extraAnswer: param.value.toLowerCase(),
//       });
//       // set callback data to state
//       setSelectedProvince(param);
//     } else {
//       // remove callback data from array student_answers
//       setStudentAnswer({
//         questionType: "**select-province**",
//         questionId: question.id,
//         questionAnswerId: null,
//         extraAnswer: "",
//       });
//       // reset callback data from state
//       setSelectedProvince(null);
//       setSelectedCity(null);
//     }
//   };

//   const onChangeCity = (param: any) => {
//     if (param !== null) {
//       // set callback data to array student_answers
//       setStudentAnswer({
//         questionType: "**select-city**",
//         questionId: question.id,
//         questionAnswerId: null,
//         extraAnswer: param.value.toLowerCase(),
//       });
//       // set callback data to state
//       setSelectedCity(param);
//     } else {
//       // remove callback data from array student_answers
//       setStudentAnswer({
//         questionType: "**select-city**",
//         questionId: question.id,
//         questionAnswerId: null,
//         extraAnswer: "",
//       });
//       // reset callback data from state
//       setSelectedCity(null);
//     }
//   };

//   const onHandleSearchDepartment = (val: string) => {
//     if (val !== "") {
//       setDepartmentName(val);
//     } else {
//       setDepartmentName("");
//     }
//   };

//   useEffect(() => {
//     setUniversityId(selectedUniversity?.value as string);
//   }, [selectedUniversity]);

//   if (question.type === "text") {
//     // form input tipe text
//     return (
//       <SurveyFormInput
//         questionId={question.id}
//         setAnswerCallback={(value) => onChangeStudentAnswerCallback(value)}
//       />
//     );
//   } else if (question.type === "date") {
//     // form input tipe tanggal
//     return (
//       <SurveyFormDate
//         questionId={question.id}
//         setAnswerCallback={(value) => onChangeStudentAnswerCallback(value)}
//       />
//     );
//   } else if (question.type === "radio" || question.type === "checkbox") {
//     // form input tipe radio / checkbox
//     return (
//       <>
//         {question.answers.map((answer: any, idx: number) => {
//           const answerData = studentAnswers.find(
//             (answer) => answer.questionId === question.id
//           );
//           const existQuestionOnStudentAnswer = studentAnswers.some(
//             (answer) => answer.questionId === question.id
//           );

//           if (question.type === "radio") {
//             return (
//               <SurveyFormRadio
//                 key={`item-answer-${idx}`}
//                 questionId={question.id}
//                 label={answer.answer}
//                 value={answer.id}
//                 type={question.type}
//                 answerData={answerData}
//                 existQuestionOnStudentAnswer={existQuestionOnStudentAnswer}
//                 setAnswerCallback={(value) =>
//                   onChangeStudentAnswerCallback(value)
//                 }
//               />
//             );
//           }

//           return (
//             <SurveyFormCheckbox
//               key={`item-answer-${idx}`}
//               questionId={question.id}
//               label={answer.answer}
//               value={answer.id}
//               type={question.type}
//               existQuestionOnStudentAnswer={existQuestionOnStudentAnswer}
//               disabledAllWithoutThis={disabledAllOptionWithoutThis}
//               setAnswerCallback={(value) =>
//                 onChangeStudentAnswerCallback(value)
//               }
//               onSetDisabledAllCallback={(e) =>
//                 setDisabledAllOptionWithoutThis([
//                   ...disabledAllOptionWithoutThis,
//                   e,
//                 ])
//               }
//             />
//           );
//         })}
//       </>
//     );
//   } else if (
//     isSelectCountry ||
//     isSelectProvince ||
//     isSelectCity ||
//     isSelectUniversity ||
//     isSelectDepartement
//   ) {
//     // form input tipe select

//     return (
//       <>
//         {isSelectCountry ? (
//           // select country
//           <ReactSelect
//             name="countryCode"
//             className="basic-single"
//             classNamePrefix="select"
//             placeholder="Pilih Negara"
//             options={countryOptions?.map((country: Country) => {
//               return {
//                 label: country.name,
//                 value: country.code,
//               };
//             })}
//             styles={selectStyles}
//             isSearchable
//             isClearable
//             onChange={(e: any) => onChangeCountry(e.value)}
//             required
//           />
//         ) : isSelectProvince ? (
//           // select province
//           <ReactSelect
//             name="provinceId"
//             className="basic-single"
//             classNamePrefix="select"
//             placeholder="Pilih Provinsi"
//             options={provinceOptions?.map((province: Province) => {
//               return {
//                 label: province.name,
//                 value: province.id,
//               };
//             })}
//             styles={selectStyles}
//             isSearchable
//             isClearable
//             value={selectedProvince}
//             onChange={(e: any) => onChangeProvince(e)}
//             required
//           />
//         ) : isSelectCity ? (
//           // select city
//           <ReactSelect
//             name="cityId"
//             className="basic-single"
//             classNamePrefix="select"
//             placeholder="Pilih Kabupaten / Kota"
//             options={cityOptions?.map((city) => {
//               return {
//                 label: city.name,
//                 value: city.id,
//               };
//             })}
//             styles={selectStyles}
//             isSearchable
//             isClearable
//             value={selectedCity}
//             onChange={(e: any) => onChangeCity(e)}
//             required
//           />
//         ) : isSelectUniversity ? (
//           // select university
//           <ReactSelect
//             name="universityId"
//             className="basic-single"
//             classNamePrefix="select"
//             placeholder="Pilih Perguruan Tinggi"
//             options={universityOptions.map((university: University) => {
//               return {
//                 label: university.name,
//                 value: university.id,
//               };
//             })}
//             styles={selectStyles}
//             isSearchable
//             isClearable
//             isLoading={loadingUniversity}
//             value={selectedUniversity}
//             onChange={(e: any) => onChangeUniversity(e)}
//             onInputChange={(val: string) => onHandleSearchUniversity(val)}
//             required
//           />
//         ) : (
//           // select departement
//           <ReactSelect
//             name="departementId"
//             className="basic-single"
//             classNamePrefix="select"
//             placeholder="Pilih Program Studi / Bidang Keahlian"
//             options={departementOptions?.map((depatement: Departement) => {
//               return {
//                 label: depatement.name,
//                 value: depatement.id,
//               };
//             })}
//             styles={selectStyles}
//             isSearchable
//             isClearable
//             value={selectedDepartment}
//             onChange={(e: any) => onChangeDepartement(e)}
//             onInputChange={(val: string) => onHandleSearchDepartment(val)}
//             required
//           />
//         )}
//       </>
//     );
//   }

//   return null;
// };

// export default MedicalRecordForm;
