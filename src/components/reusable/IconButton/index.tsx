import clsx from "clsx";
import { FunctionComponent } from "react";
import Icon from "../Icon";

type IconButtonProps = {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

const IconButton: FunctionComponent<IconButtonProps> = ({
  icon,
  size = 40,
  color = "black",
  className = "bg-white border border-neutral-200 focus:outline-none hover:bg-gray-200",
  ariaLabel = "Icon Button",
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx([
        "flex items-center justify-center rounded-lg",
        className,
      ])}
      style={{
        width: size,
        height: size,
        color: color,
      }}
    >
      <Icon name={icon} />
    </button>
  );
};

export default IconButton;
