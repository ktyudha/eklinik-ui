import { FunctionComponent } from "react";
import clsx from "clsx";
import useGlobalStore from "@/store/useStore";

interface Props {
  label: string;
  value: string;
}
const HeroFilterItemSection: FunctionComponent<Props> = ({ label, value }) => {
  const { activeHeroTab, setActiveHeroTab } = useGlobalStore((state) => ({
    activeHeroTab: state.activeHeroTab,
    setActiveHeroTab: state.setActiveHeroTab,
  }));

  const isActive = activeHeroTab === value;

  return (
    <button
      className={clsx([
        "py-1.5 rounded-full my-auto w-full text-center",
        isActive
          ? "bg-[#4bb43a] text-white"
          : "border border-[#4bb43a] text-[#4bb43a] hover:bg-[#4bb43a] hover:text-white",
      ])}
      onClick={() => setActiveHeroTab(value)}
    >
      {label}
    </button>
  );
};

export default HeroFilterItemSection;
