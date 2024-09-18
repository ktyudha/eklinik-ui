import { FunctionComponent, useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import "react-datepicker/dist/react-datepicker.css"
import './custom.css'

interface Props {
  questionId: string
  onSetStudentAnswersCallback: (questionType: string, questionId: string, questionAnswerId?: string | null, extraAnswer?: string) => void
}

const StepItemInputDate: FunctionComponent<Props> = ({
  questionId,
  onSetStudentAnswersCallback,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const onChangeDate = (date: Date) => {
    setSelectedDate(date)
    const formatted = format(date, 'MM-yyyy')
    onSetStudentAnswersCallback('date', questionId, '', formatted)
  }

  return (
    <div className='hover:border-green-500 border-2 py-2 px-3 rounded-lg w-[50%]'>
      <div className="flex items-center w-full">
        <DatePicker
          className='outline-none w-full'
          showMonthYearPicker
          locale={id}
          selected={selectedDate}
          placeholderText='Pilih Bulan dan Tahun'
          onChange={(date: Date) => onChangeDate(date)}
          dateFormat='MMMM yyyy'
          focusSelectedMonth
          maxDate={new Date()}
          required
        />
      </div>
    </div>
  )
}

export default StepItemInputDate