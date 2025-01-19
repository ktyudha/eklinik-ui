import { FunctionComponent } from "react";
import HeroFilterItemSection from "./HeroFilterItemSection";

const HeroFilterSection: FunctionComponent = () => {
  const tabItems = [
    {
      label: "Jadwal",
      value: "jadwal",
    },
    {
      label: "Lokasi",
      value: "lokasi",
    },
  ];

  return (
    <div className="flex gap-2 mb-4">
      <h3 className="text-gray-400 font-normal mr-2 my-auto">Temukan</h3>
      <div className="grid grid-cols-2 w-full gap-2">
        {tabItems.map((tab) => (
          <HeroFilterItemSection value={tab.value} label={tab.label} />
        ))}
      </div>
    </div>
  );
};

export default HeroFilterSection;
