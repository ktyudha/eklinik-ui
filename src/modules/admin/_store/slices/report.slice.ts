import { type StateCreator } from 'zustand'

export declare interface ReportState {
  activeReportTab: string
  activeRecapitulationType: string
  activeRecapitulationStudyType: string
  activeRecapitulationStudyLocation: string
  activeRecapitulationBusinessLocation: string
  reportFilterProvinceId: string
  reportFilterCityId: string
  reportFilterSchoolId: string
  reportFilterGradeId: string
  setActiveReportTab: (param: string) => void
  setActiveRecapitulationType: (param: string) => void
  setActiveRecapitulationStudyType: (param: string) => void
  setActiveRecapitulationStudyLocation: (param: string) => void
  setActiveRecapitulationBusinessLocation: (param: string) => void
  setReportFilterProvinceId: (param: string) => void
  setReportFilterCityId: (param: string) => void
  setReportFilterSchoolId: (param: string) => void
  setReportFilterGradeId: (param: string) => void
}

const createReportSlice: StateCreator<ReportState> = (set) => ({
  activeReportTab: 'report-statistic',
  activeRecapitulationType: 'study',
  activeRecapitulationStudyType: 'university',
  activeRecapitulationStudyLocation: 'domestic',
  activeRecapitulationBusinessLocation: 'domestic',
  reportFilterProvinceId: '',
  reportFilterCityId: '',
  reportFilterSchoolId: '',
  reportFilterGradeId: '',
  setActiveReportTab: (param) => set({ activeReportTab: param }),
  setActiveRecapitulationType: (param) => set({ activeRecapitulationType: param }),
  setActiveRecapitulationStudyType: (param) => set({ activeRecapitulationStudyType: param }),
  setActiveRecapitulationStudyLocation: (param) => set({ activeRecapitulationStudyLocation: param }),
  setActiveRecapitulationBusinessLocation: (param) => set({ activeRecapitulationBusinessLocation: param }),
  setReportFilterProvinceId: (param) => set({ reportFilterProvinceId: param }),
  setReportFilterCityId: (param) => set({ reportFilterCityId: param }),
  setReportFilterSchoolId: (param) => set({ reportFilterSchoolId: param }),
  setReportFilterGradeId: (param) => set({ reportFilterGradeId: param }),
})

export default createReportSlice
