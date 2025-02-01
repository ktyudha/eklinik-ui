import { FunctionComponent } from "react";
import Skeleton from "react-loading-skeleton";

const QueueSkeleton: FunctionComponent = () => {
  return (
    <>
      <Skeleton className="w-full h-32 mb-2" />
      <Skeleton className="w-full h-96" />
    </>
  );
};

export default QueueSkeleton;
