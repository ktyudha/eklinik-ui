// import { FunctionComponent, useState } from "react";
// import DatePicker from "react-datepicker";
// import { format } from "date-fns";
// import { id } from "date-fns/locale";
// import "react-datepicker/dist/react-datepicker.css";
// import "./custom.css";
// import { StudentAnswer } from "@modules/student/_store/slices/answer.slice";

// interface Props {
//   questionId: string;
//   setAnswerCallback: (param: StudentAnswer) => void;
// }

// const MedicalRecordFormDate: FunctionComponent<Props> = ({
//   questionId,
//   setAnswerCallback,
// }) => {
//   const [selectedDate, setSelectedDate] = useState<Date>();

//   const onChangeDate = (date: Date) => {
//     setSelectedDate(date);
//     const formattedDate = format(date, "MM-yyyy");
//     setAnswerCallback({
//       questionType: "**select-university**",
//       questionId: questionId,
//       questionAnswerId: null,
//       extraAnswer: formattedDate,
//     });
//   };

//   return (
//     <div className="hover:border-green-500 border-2 py-2 px-3 rounded-lg w-[50%]">
//       <div className="flex items-center w-full">
//         <DatePicker
//           className="outline-none w-full"
//           showMonthYearPicker
//           locale={id}
//           selected={selectedDate}
//           placeholderText="Pilih Bulan dan Tahun"
//           onChange={(date: Date) => onChangeDate(date)}
//           dateFormat="MMMM yyyy"
//           focusSelectedMonth
//           maxDate={new Date()}
//           required
//         />
//       </div>
//     </div>
//   );
// };

// export default MedicalRecordFormDate;
