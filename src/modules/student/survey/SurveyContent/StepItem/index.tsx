import { FunctionComponent } from 'react'
import * as RCSelect from 'react-select'
import ReactSelect from 'react-select'
import _ from 'lodash'
import { StudentAnswer } from '../..'
import { Question } from '@services/student/group/interfaces/get-all-group.types'
import { City } from '@services/global/region/city/interfaces/get-all-city.types'
import { Country } from '@services/global/region/country/interfaces/get-all-country.types'
import { University } from '@services/global/study/university/interfaces/get-all-university.types'
import { Departement } from '@services/global/study/departement/interfaces/get-all-departement.types'
import { Province } from '@services/global/region/province/interfaces/get-all-province.types'
import StepItemInputRadio from './StepItemInputRadio'
import StepItemInputDate from './StepItemInputDate'
import StepItemInputText from './StepItemInputText'
import StepItemInputCheckbox from './StepItemInputCheckbox'

const selectStyles: RCSelect.StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    paddingLeft: '6px',
    paddingRight: '6px',
    paddingTop: '1px',
    paddingBottom: '1px',
    boxShadow: 'none',
    ":hover": {
      border: '2px solid #e5e7eb'
    }
  }),
  option: (styles) => ({
    ...styles,
  }),
  input: (styles) => ({
    ...styles,
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '20px',
    color: 'neutral.800',
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '20px',
    color: '#6b7280',
  }),
  menu: provided => ({
    ...provided,
    zIndex: '-10px'
  }),
  menuPortal: provided => ({
    ...provided,
    zIndex: '-10px'
  }),
}

interface Props {
  question: Question
  studentAnswers: StudentAnswer[]
  disabledAllWithoutThis: Array<{ questionId: string, questionAnswerId: string }>
  loadingUniversity: boolean
  countryOptions: Country[]
  provinceOptions: Province[]
  cityOptions: any
  universityOptions: University[]
  departementOptions: any
  selectedUniversity: { label: string, value: string } | null | undefined
  selectedDepartement: { label: string, value: string } | null | undefined
  selectedProvince: { label: string, value: string } | null | undefined
  selectedCity: { label: string, value: string } | null | undefined
  onSetStudentAnswersCallback: (questionType: string, questionId: string, questionAnswerId?: string | null, extraAnswer?: string) => void
  onChangeUniversityCallback: (param: any | null) => void
  onSearchUniversityCallback: (param: string) => void
  onChangeDepartmentCallback: (param: any | null) => void
  onSearchDepartmentCallback: (param: string) => void
  onChangeProvinceCallback: (param: any | null) => void
  onChangeCityCallback: (param: any | null) => void
  onSetArrQuestionWithRule: (questionId: string) => void
  onSetDisabledAllCallback: (val: { questionId: string, questionAnswerId: string }) => void
}

const StepItem: FunctionComponent<Props> = ({
  question,
  studentAnswers,
  disabledAllWithoutThis,
  loadingUniversity,
  countryOptions,
  provinceOptions,
  cityOptions,
  universityOptions,
  departementOptions,
  selectedUniversity,
  selectedDepartement,
  selectedProvince,
  selectedCity,
  onSetStudentAnswersCallback,
  onChangeUniversityCallback,
  onSearchUniversityCallback,
  onChangeDepartmentCallback,
  onSearchDepartmentCallback,
  onChangeProvinceCallback,
  onChangeCityCallback,
  onSetArrQuestionWithRule,
  onSetDisabledAllCallback
}) => {
  const rules = question.rules
  const isSelectCountry = question.question.includes('**select-country**')
  const isSelectProvince = question.question.includes('**select-province**')
  const isSelectCity = question.question.includes('**select-city**')
  const isSelectUniversity = question.question.includes('**select-university**')
  const isSelectDepartement = question.question.includes('**select-departement**')

  const formatQuestion = (param: string) => {
    if (param.includes('**select-country**')) {
      return param.replace('**select-country**', '')
    } else if (param.includes('**select-province**')) {
      return param.replace('**select-province**', '')
    } else if (param.includes('**select-city**')) {
      return param.replace('**select-city**', '')
    } else if (param.includes('**select-university**')) {
      return param.replace('**select-university**', '')
    } else if (param.includes('**select-departement**')) {
      return param.replace('**select-departement**', '')
    } else {
      return param
    }
  }

  const onChangeCountry = (param: string) => {
    return onSetStudentAnswersCallback('**select-country**', question.id, null, param)
  }

  const onChangeUniversity = (param: any) => {
    if (param !== null) {
      // set callback data to array student_answers
      onSetStudentAnswersCallback('**select-university**', question.id, null, param.value.toLowerCase())
      // set callback data to state
      onChangeUniversityCallback(param)
    } else {
      // remove callback data from array student_answers
      onSetStudentAnswersCallback('**select-university**', question.id, null, '')
      // reset callback data from state
      onChangeUniversityCallback(null)
      onChangeDepartmentCallback(null)
    }
  }

  const onHandleSearchUniversity = (val: string) => {
    if (val !== '') {
      onSearchUniversityCallback(val)
    } else {
      onSearchUniversityCallback('')
    }
  }

  const onChangeDepartement = (param: any) => {
    if (param !== null) {
      // set callback data to array student_answers
      onSetStudentAnswersCallback('**select-departement**', question.id, null, param.value.toLowerCase())
      // set callback data to state
      onChangeDepartmentCallback(param)
    } else {
      // remove callback data from array student_answers
      onSetStudentAnswersCallback('**select-departement**', question.id, null, '')
      // reset callback data from state
      onChangeDepartmentCallback(null)
    }
  }

  const onChangeProvince = (param: any) => {
    if (param !== null) {
      // set callback data to array student_answers
      onSetStudentAnswersCallback('**select-province**', question.id, null, param.value.toLowerCase())
      // set callback data to state
      onChangeProvinceCallback(param)
    } else {
      // remove callback data from array student_answers
      onSetStudentAnswersCallback('**select-province**', question.id, null, '')
      // reset callback data from state
      onChangeProvinceCallback(null)
      onChangeCityCallback(null)
    }
  }

  const onChangeCity = (param: any) => {
    if (param !== null) {
      // set callback data to array student_answers
      onSetStudentAnswersCallback('**select-city**', question.id, null, param.value.toLowerCase())
      // set callback data to state
      onChangeCityCallback(param)
    } else {
      // remove callback data from array student_answers
      onSetStudentAnswersCallback('**select-city**', question.id, null, '')
      // reset callback data from state
      onChangeCityCallback(null)
    }
  }

  const onHandleSearchDepartment = (val: string) => {
    if (val !== '') {
      onSearchDepartmentCallback(val)
    } else {
      onSearchDepartmentCallback('')
    }
  }

  // grouping rule by group number
  const groupRules = _.groupBy(rules, 'group_number')
  // check rule filled
  const arrFilledCondition: any = []
  Object.values(groupRules).map((rules: any) => {
    let arr: any = []
    rules.map((rule: any) => {
      const isFilledQuestionCondition = studentAnswers.some((answer: StudentAnswer) => (answer.questionId === rule.question_id) && (answer.questionAnswerId === rule.question_answer_id))
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
            onSetArrQuestionWithRule(question.id)

            return (
              <>
                {/* jika kondisi rule terpenuhi */}
                <div className='flex flex-col gap-2 border-b pb-5'>
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
                </div>
              </>
            )
          })}
        </>
      ) : (
        // jika tidak terdapat rule
        <div className='flex flex-col gap-2 border-b pb-5'>
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
                    options={universityOptions?.map((university: University) => {
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
                    onInputChange={(val: string) => onSearchUniversityCallback(val)}
                    required
                  />
                ) : (
                  // select departement
                  <ReactSelect
                    name='departementId'
                    className='basic-single'
                    classNamePrefix='select'
                    placeholder='Pilih Program Studi / Bidang Keahlian'
                    options={departementOptions ? departementOptions?.map((depatement: Departement) => {
                      return {
                        label: depatement.name,
                        value: depatement.id
                      }
                    }) : []}
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
        </div>
      )}
    </>
  )
}

export default StepItem