import { FunctionComponent } from "react";
import useAdminStore from "../_store/useAdminStore";
// import useGetInformation from "@/services/admin/information/hooks/useGetInformation";
// import DashboardContentCard from "./DashboardContent/DashboardContentCard";
import DashboardHeader from "./DashboardHeader";
import DashboardTab from "./DashboardContent/DashboardContentTab";
// import DashboardContentProgress from "./DashboardContent/DashboardContentProgress";
// import DashboardSkeleton from "./DashboardSkeleton";

const Dashboard: FunctionComponent = () => {
  const { activeDashboardTab } = useAdminStore((state) => ({
    activeDashboardTab: state.activeDashboardTab,
  }));

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
      <DashboardHeader />
      <div className="flex flex-col gap-5">
        {/* <DashboardContentCard information={information} /> */}
        <DashboardTab />

        {/* {activeDashboardTab === "dashboard-education-unit" && (
          <>
            <DashboardContentProgress level="SMA" progress={progress_sma!} />
            <DashboardContentProgress level="SMK" progress={progress_smk!} />
          </>
        )} */}
      </div>
    </div>
  );
};

export default Dashboard;
