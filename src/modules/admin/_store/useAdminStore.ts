import { create } from "zustand";
import createSurveySlice, { type SurveyState } from "./slices/survey.slice";
import createQuestionSlice, {
  type QuestionState,
} from "./slices/question.slice";
import createGroupSlice, { type GroupState } from "./slices/group.slice";
import createStudentSlice, { type StudentState } from "./slices/student.slice";
import createDashboardTabSlice, {
  type DashboardTabState,
} from "./slices/dashboard-tab.slice";
import createSchoolSlice, { type SchoolState } from "./slices/school.slice";
import createReportSlice, { type ReportState } from "./slices/report.slice";
import createAgencySlice, { type AgencyState } from "./slices/agency.slice";
import createSubAgencySlice, {
  type SubAgencyState,
} from "./slices/sub-agency.slice";
import createProfileTracerSlice, {
  type ProfileTracerState,
} from "./slices/profile-tracer.slice";

type BoundSliceTypes = { default: null } & SurveyState &
  QuestionState &
  GroupState &
  StudentState &
  DashboardTabState &
  SchoolState &
  ReportState &
  AgencyState &
  SubAgencyState &
  ProfileTracerState;

const useAdminStore = create<BoundSliceTypes>()((...setter) => ({
  default: null,
  ...createSurveySlice(...setter),
  ...createQuestionSlice(...setter),
  ...createGroupSlice(...setter),
  ...createStudentSlice(...setter),
  ...createDashboardTabSlice(...setter),
  ...createSchoolSlice(...setter),
  ...createReportSlice(...setter),
  ...createAgencySlice(...setter),
  ...createSubAgencySlice(...setter),
  ...createProfileTracerSlice(...setter),
}));

export default useAdminStore;
