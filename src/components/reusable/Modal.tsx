import { FunctionComponent, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  onOpen: boolean;
  title: string;
  modalSize?: string;
  modalHeight?: string;
  children: ReactNode;
  onClose: () => void;
}

const widths: Record<string, string> = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-5xl" };

/**
 * Bottom sheet di ponsel, modal di tengah pada desktop (pola dhagrafis): latar redup, panel kaca, handle,
 * geser ke bawah / ketuk latar / Esc untuk menutup. Isi hanya dipasang saat terbuka.
 */
const Modal: FunctionComponent<Props> = ({ onOpen, title, modalSize = "md", children, onClose }) => {
  const [dy, setDy] = useState(0);
  const startY = useRef<number | null>(null);

  // tetap terpasang sebentar agar animasi tutup sempat berjalan
  const [mounted, setMounted] = useState(onOpen);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (onOpen) { setMounted(true); setClosing(false); return; }
    if (!mounted) return;
    setClosing(true);
    const t = setTimeout(() => { setMounted(false); setClosing(false); }, 180);
    return () => clearTimeout(t);
  }, [onOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!onOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onOpen, onClose]);

  if (!mounted) return null;

  return (
    <div id="static-modal" className="fixed inset-0 z-[80] flex items-end justify-center p-2 md:items-center md:p-6">
      <div className={`sheet-backdrop absolute inset-0 bg-black/40 ${closing ? "is-closing" : ""}`} onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ transform: `translateY(${dy}px)`, transition: startY.current === null ? "transform .2s" : "none" }}
        className={`sheet-panel ${closing ? "is-closing" : ""} glass-strong relative flex max-h-[90vh] w-full flex-col rounded-[28px] pb-5 pt-3 text-gray-900 md:rounded-3xl ${widths[modalSize] ?? widths.md}`}
      >
        <div
          className="-mt-3 shrink-0 cursor-grab touch-none py-3 md:hidden"
          onTouchStart={(e) => { startY.current = e.touches[0].clientY; }}
          onTouchMove={(e) => { if (startY.current !== null) setDy(Math.max(0, e.touches[0].clientY - startY.current)); }}
          onTouchEnd={() => { const far = dy > 90; startY.current = null; setDy(0); if (far) onClose(); }}
          onTouchCancel={() => { startY.current = null; setDy(0); }}
        >
          <div className="mx-auto h-[5px] w-9 rounded-full bg-gray-300" aria-hidden />
        </div>

        <div className="flex items-center justify-between gap-3 px-6 pb-3">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button type="button" onClick={onClose} aria-label="Tutup"
            className="grid h-8 w-8 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700">
            <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m1 1 12 12M13 1 1 13" />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
