import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Popup({
  isOpen,
  onClose,
  title,
  children,
}: PopupProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div
      onClick={handleOverlayClick}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
    >
      <div className="bg-white rounded-md min-w-[500px] w-auto shadow p-4">
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg lg:text-xl">{title}</h2>}

          <button onClick={onClose}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
