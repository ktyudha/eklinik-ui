import { FunctionComponent } from 'react'
import _ from 'lodash'
// import { StudentAnswer } from '../..'
import { Question } from '@services/student/group/interfaces/get-all-group.types'
import { StudentFirstStepAnswer } from '@modules/student/_store/slices/answer.slice'
import QuestionItemWithRule from './QuestionItemWithRule'
import useStudentStore from '@modules/student/_store/useStudentStore'
import QuestionItemWithoutRule from './QuestionItemWithoutRule'
// import StepItemInputRadio from './StepItemInputRadio'
// import StepItemInputDate from './StepItemInputDate'
// import StepItemInputText from './StepItemInputText'
// import StepItemInputCheckbox from './StepItemInputCheckbox'

interface Props {
  question: Question
  // studentAnswers: StudentAnswer[]
  // disabledAllWithoutThis: Array<{ questionId: string, questionAnswerId: string }>
  // loadingUniversity: boolean
  // countryOptions: Country[]
  // provinceOptions: Province[]
  // cityOptions: any
  // universityOptions: University[]
  // departementOptions: any
  // selectedUniversity: { label: string, value: string } | null | undefined
  // selectedDepartement: { label: string, value: string } | null | undefined
  // selectedProvince: { label: string, value: string } | null | undefined
  // selectedCity: { label: string, value: string } | null | undefined
  // onSetStudentAnswersCallback: (questionType: string, questionId: string, questionAnswerId?: string | null, extraAnswer?: string) => void
  // onChangeUniversityCallback: (param: any | null) => void
  // onSearchUniversityCallback: (param: string) => void
  // onChangeDepartmentCallback: (param: any | null) => void
  // onSearchDepartmentCallback: (param: string) => void
  // onChangeProvinceCallback: (param: any | null) => void
  // onChangeCityCallback: (param: any | null) => void
  // onSetArrQuestionWithRule: (questionId: string) => void
  // onSetDisabledAllCallback: (val: { questionId: string, questionAnswerId: string }) => void
}

const QuestionItem: FunctionComponent<Props> = ({
  question,
  // studentAnswers,
  // disabledAllWithoutThis,
  // loadingUniversity,
  // countryOptions,
  // provinceOptions,
  // cityOptions,
  // universityOptions,
  // departementOptions,
  // selectedUniversity,
  // selectedDepartement,
  // selectedProvince,
  // selectedCity,
  // onSetStudentAnswersCallback,
  // onChangeUniversityCallback,
  // onSearchUniversityCallback,
  // onChangeDepartmentCallback,
  // onSearchDepartmentCallback,
  // onChangeProvinceCallback,
  // onChangeCityCallback,
  // onSetArrQuestionWithRule,
  // onSetDisabledAllCallback
}) => {
  const {
    studentFirstStepAnswers
  } = useStudentStore((state) => ({
    studentFirstStepAnswers: state.studentFirstStepAnswers,
  }))

  const rules = question.rules
  // const onChangeCountry = (param: string) => {
  //   return onSetStudentAnswersCallback('**select-country**', question.id, null, param)
  // }

  // const onChangeUniversity = (param: any) => {
  //   if (param !== null) {
  //     // set callback data to array student_answers
  //     onSetStudentAnswersCallback('**select-university**', question.id, null, param.value.toLowerCase())
  //     // set callback data to state
  //     onChangeUniversityCallback(param)
  //   } else {
  //     // remove callback data from array student_answers
  //     onSetStudentAnswersCallback('**select-university**', question.id, null, '')
  //     // reset callback data from state
  //     onChangeUniversityCallback(null)
  //     onChangeDepartmentCallback(null)
  //   }
  // }

  // const onHandleSearchUniversity = (val: string) => {
  //   if (val !== '') {
  //     onSearchUniversityCallback(val)
  //   } else {
  //     onSearchUniversityCallback('')
  //   }
  // }

  // const onChangeDepartement = (param: any) => {
  //   if (param !== null) {
  //     // set callback data to array student_answers
  //     onSetStudentAnswersCallback('**select-departement**', question.id, null, param.value.toLowerCase())
  //     // set callback data to state
  //     onChangeDepartmentCallback(param)
  //   } else {
  //     // remove callback data from array student_answers
  //     onSetStudentAnswersCallback('**select-departement**', question.id, null, '')
  //     // reset callback data from state
  //     onChangeDepartmentCallback(null)
  //   }
  // }

  // const onChangeProvince = (param: any) => {
  //   if (param !== null) {
  //     // set callback data to array student_answers
  //     onSetStudentAnswersCallback('**select-province**', question.id, null, param.value.toLowerCase())
  //     // set callback data to state
  //     onChangeProvinceCallback(param)
  //   } else {
  //     // remove callback data from array student_answers
  //     onSetStudentAnswersCallback('**select-province**', question.id, null, '')
  //     // reset callback data from state
  //     onChangeProvinceCallback(null)
  //     onChangeCityCallback(null)
  //   }
  // }

  // const onChangeCity = (param: any) => {
  //   if (param !== null) {
  //     // set callback data to array student_answers
  //     onSetStudentAnswersCallback('**select-city**', question.id, null, param.value.toLowerCase())
  //     // set callback data to state
  //     onChangeCityCallback(param)
  //   } else {
  //     // remove callback data from array student_answers
  //     onSetStudentAnswersCallback('**select-city**', question.id, null, '')
  //     // reset callback data from state
  //     onChangeCityCallback(null)
  //   }
  // }

  // const onHandleSearchDepartment = (val: string) => {
  //   if (val !== '') {
  //     onSearchDepartmentCallback(val)
  //   } else {
  //     onSearchDepartmentCallback('')
  //   }
  // }

  // grouping rule by group number
  const groupRules = _.groupBy(rules, 'group_number')
  // check rule filled
  const arrFilledCondition: any = []
  Object.values(groupRules).map((rules: any) => {
    let arr: any = []
    rules.map((rule: any) => {
      const isFilledQuestionCondition = studentFirstStepAnswers.some((answer: StudentFirstStepAnswer) => (answer.questionId === rule.question_id) && (answer.questionAnswerId === rule.question_answer_id))
      if (isFilledQuestionCondition) {
        arr.push(isFilledQuestionCondition)
      }
    })

    if (rules.length === arr.length) {
      const fix = arr.some((data: any) => data !== false)
      arrFilledCondition.push(fix)
    }
  })

  return (
    <>
      {/* check rule exist */}
      {rules.length > 0 ? (
        <>
          {/* jika terdapat rule */}
          {arrFilledCondition.some((val: any) => val === true) && Array.from({ length: 1 }).map((_) => {
            // onSetArrQuestionWithRule(question.id)

            return (
              <>
                {/* jika kondisi rule terpenuhi */}
                <QuestionItemWithRule question={question} />
                {/* <div className='flex flex-col gap-2 border-b pb-5'>
                  <div className='flex flex-col'>
                    <h3 dangerouslySetInnerHTML={{ __html: formatQuestion(question.question) }} />
                    <span className='italic text-sm'>{question.note}</span>
                  </div>
                  <div className='flex flex-col gap-3'>
                    {(isSelectCountry || isSelectProvince || isSelectCity || isSelectUniversity || isSelectDepartement) ? (
                      <>
                        {isSelectCountry ? (
                          // select country
                          <ReactSelect
                            name='countryCode'
                            className='basic-single'
                            classNamePrefix='select'
                            placeholder='Pilih Negara'
                            options={countryOptions?.map((country: Country) => {
                              return {
                                label: country.name,
                                value: country.code
                              }
                            })}
                            styles={selectStyles}
                            isSearchable
                            isClearable
                            onChange={(e: any) => onChangeCountry(e.value)}
                            required
                          />
                        ) : isSelectProvince ? (
                          // select province
                          <ReactSelect
                            name='provinceId'
                            className='basic-single'
                            classNamePrefix='select'
                            placeholder='Pilih Provinsi'
                            options={provinceOptions?.map((province: Province) => {
                              return {
                                label: province.name,
                                value: province.id
                              }
                            })}
                            styles={selectStyles}
                            isSearchable
                            isClearable
                            value={selectedProvince}
                            onChange={(e: any) => onChangeProvince(e)}
                            required
                          />
                        ) : isSelectCity ? (
                          // select city
                          <ReactSelect
                            name='cityId'
                            className='basic-single'
                            classNamePrefix='select'
                            placeholder='Pilih Kabupaten / Kota'
                            options={cityOptions?.map((city: City) => {
                              return {
                                label: city.name,
                                value: city.id
                              }
                            })}
                            styles={selectStyles}
                            isSearchable
                            isClearable
                            value={selectedCity}
                            onChange={(e: any) => onChangeCity(e)}
                            required
                          />
                        ) : isSelectUniversity ? (
                          // select university
                          <ReactSelect
                            name='universityId'
                            className='basic-single'
                            classNamePrefix='select'
                            placeholder='Pilih Perguruan Tinggi'
                            options={universityOptions.map((university: University) => {
                              return {
                                label: university.name,
                                value: university.id
                              }
                            })}
                            styles={selectStyles}
                            isSearchable
                            isClearable
                            isLoading={loadingUniversity}
                            value={selectedUniversity}
                            onChange={(e: any) => onChangeUniversity(e)}
                            onInputChange={(val: string) => onHandleSearchUniversity(val)}
                            required
                          />
                        ) : (
                          // select departement
                          <ReactSelect
                            name='departementId'
                            className='basic-single'
                            classNamePrefix='select'
                            placeholder='Pilih Program Studi / Bidang Keahlian'
                            options={departementOptions?.map((depatement: Departement) => {
                              return {
                                label: depatement.name,
                                value: depatement.id
                              }
                            })}
                            styles={selectStyles}
                            isSearchable
                            isClearable
                            value={selectedDepartement}
                            onChange={(e: any) => onChangeDepartement(e)}
                            onInputChange={(val: string) => onHandleSearchDepartment(val)}
                            required
                          />
                        )}
                      </>
                    ) : (question.type === 'radio' || question.type === 'checkbox') ? (
                      <>
                        {question.answers.map((answer: any, idx: number) => {
                          const answerData = studentAnswers.find((answer) => answer.questionId === question.id)
                          const existQuestionOnStudentAnswer = studentAnswers.some((answer) => answer.questionId === question.id)
        
                          if (question.type === 'radio') {
                            return (
                              <StepItemInputRadio
                                key={`item-answer-${idx}`}
                                questionId={question.id}
                                label={answer.answer}
                                value={answer.id}
                                type={question.type}
                                answerData={answerData}
                                existQuestionOnStudentAnswer={existQuestionOnStudentAnswer}
                                onSetStudentAnswersCallback={onSetStudentAnswersCallback}
                              />
                            )
                          }
                          
                          return (
                            <StepItemInputCheckbox
                              key={`item-answer-${idx}`}
                              questionId={question.id}
                              label={answer.answer}
                              value={answer.id}
                              type={question.type}
                              existQuestionOnStudentAnswer={existQuestionOnStudentAnswer}
                              disabledAllWithoutThis={disabledAllWithoutThis}
                              onSetStudentAnswersCallback={onSetStudentAnswersCallback}
                              onSetDisabledAllCallback={onSetDisabledAllCallback}
                            />
                          )
                        })}
                      </>
                    ) : (question.type === 'date') ? (
                      <>
                        <StepItemInputDate
                          questionId={question.id}
                          onSetStudentAnswersCallback={onSetStudentAnswersCallback}
                        />
                      </>
                    ) : (question.type === 'text') && (
                      <StepItemInputText
                        questionId={question.id}
                        onSetStudentAnswersCallback={onSetStudentAnswersCallback}
                      />
                    )}
                  </div>
                </div> */}
              </>
            )
          })}
        </>
      ) : (
        // jika tidak terdapat rule
        <QuestionItemWithoutRule question={question} />
        // <div className='flex flex-col gap-2 border-b pb-5'>
        //   <div className='flex flex-col'>
        //     <h3 dangerouslySetInnerHTML={{ __html: formatQuestion(question.question) }} />
        //     <span className='italic text-sm'>{question.note}</span>
        //   </div>
        //   <div className='flex flex-col gap-3'>
        //     {/* {(isSelectCountry || isSelectProvince || isSelectCity || isSelectUniversity || isSelectDepartement) ? (
        //       <>
        //         {isSelectCountry ? (
        //           // select country
        //           <ReactSelect
        //             name='countryCode'
        //             className='basic-single'
        //             classNamePrefix='select'
        //             placeholder='Pilih Negara'
        //             options={countryOptions?.map((country: Country) => {
        //               return {
        //                 label: country.name,
        //                 value: country.code
        //               }
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
        //             name='provinceId'
        //             className='basic-single'
        //             classNamePrefix='select'
        //             placeholder='Pilih Provinsi'
        //             options={provinceOptions?.map((province: Province) => {
        //               return {
        //                 label: province.name,
        //                 value: province.id
        //               }
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
        //             name='cityId'
        //             className='basic-single'
        //             classNamePrefix='select'
        //             placeholder='Pilih Kabupaten / Kota'
        //             options={cityOptions?.map((city: City) => {
        //               return {
        //                 label: city.name,
        //                 value: city.id
        //               }
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
        //             name='universityId'
        //             className='basic-single'
        //             classNamePrefix='select'
        //             placeholder='Pilih Perguruan Tinggi'
        //             options={universityOptions?.map((university: University) => {
        //               return {
        //                 label: university.name,
        //                 value: university.id
        //               }
        //             })}
        //             styles={selectStyles}
        //             isSearchable
        //             isClearable
        //             isLoading={loadingUniversity}
        //             value={selectedUniversity}
        //             onChange={(e: any) => onChangeUniversity(e)}
        //             onInputChange={(val: string) => onSearchUniversityCallback(val)}
        //             required
        //           />
        //         ) : (
        //           // select departement
        //           <ReactSelect
        //             name='departementId'
        //             className='basic-single'
        //             classNamePrefix='select'
        //             placeholder='Pilih Program Studi / Bidang Keahlian'
        //             options={departementOptions ? departementOptions?.map((depatement: Departement) => {
        //               return {
        //                 label: depatement.name,
        //                 value: depatement.id
        //               }
        //             }) : []}
        //             styles={selectStyles}
        //             isSearchable
        //             isClearable
        //             value={selectedDepartement}
        //             onChange={(e: any) => onChangeDepartement(e)}
        //             onInputChange={(val: string) => onHandleSearchDepartment(val)}
        //             required
        //           />
        //         )}
        //       </>
        //     ) : (question.type === 'radio' || question.type === 'checkbox') ? (
        //       <>
        //         {question.answers.map((answer: any, idx: number) => {
        //           const answerData = studentAnswers.find((answer) => answer.questionId === question.id)
        //           const existQuestionOnStudentAnswer = studentAnswers.some((answer) => answer.questionId === question.id)

        //           if (question.type === 'radio') {
        //             return (
        //               <StepItemInputRadio
        //                 key={`item-answer-${idx}`}
        //                 questionId={question.id}
        //                 label={answer.answer}
        //                 value={answer.id}
        //                 type={question.type}
        //                 answerData={answerData}
        //                 existQuestionOnStudentAnswer={existQuestionOnStudentAnswer}
        //                 onSetStudentAnswersCallback={onSetStudentAnswersCallback}
        //               />
        //             )
        //           }
        //           return (
        //             <StepItemInputCheckbox
        //               key={`item-answer-${idx}`}
        //               questionId={question.id}
        //               label={answer.answer}
        //               value={answer.id}
        //               type={question.type}
        //               existQuestionOnStudentAnswer={existQuestionOnStudentAnswer}
        //               disabledAllWithoutThis={disabledAllWithoutThis}
        //               onSetStudentAnswersCallback={onSetStudentAnswersCallback}
        //               onSetDisabledAllCallback={onSetDisabledAllCallback}
        //             />
        //           )
        //         })}
        //       </>
        //     ) : (question.type === 'date') ? (
        //       <>
        //         <StepItemInputDate
        //           questionId={question.id}
        //           onSetStudentAnswersCallback={onSetStudentAnswersCallback}
        //         />
        //       </>
        //     ) : (question.type === 'text') && (
        //       <StepItemInputText
        //         questionId={question.id}
        //         onSetStudentAnswersCallback={onSetStudentAnswersCallback}
        //       />
        //     )} */}
        //   </div>
        // </div>
      )}
    </>
  )
}

export default QuestionItem