import { FunctionComponent } from "react";
// import useAdminStore from "../_store/useAdminStore";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleTable from "./ScheduleTable";

const Schedule: FunctionComponent = () => {
  //   const { information, loading } = useGetInformation();
  //   const progress_sma = information?.students_progress.find(
  //     (progress) => progress.grade_name === "SMA"
  //   );
  //   const progress_smk = information?.students_progress.find(
  //     (progress) => progress.grade_name === "SMK"
  //   );

  //   if (loading || !information) return <DashboardSkeleton />;

  return (
    <div className="max-w-full px-3">
      <ScheduleHeader />

      <div className="mt-10">
        <ScheduleTable />
      </div>

      {/* <div className="flex flex-col gap-5"> */}
      {/* <DashboardContentCard information={information} /> */}
      {/* {activeDashboardTab === "dashboard-education-unit" && (
          <>
            <DashboardContentProgress level="SMA" progress={progress_sma!} />
            <DashboardContentProgress level="SMK" progress={progress_smk!} />
          </>
        )} */}
      {/* </div> */}
    </div>
  );
};

export default Schedule;
