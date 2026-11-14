import { useEffect, useRef, useState } from "react";

/** Garis progres tipis di atas layar selama ada request API berjalan. */
export default function TopProgress() {
  const pending = useRef(0);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const start = () => {
      if (pending.current++ > 0) return;
      setVisible(true);
      setWidth(12);
      clearInterval(timer.current);
      timer.current = setInterval(() => setWidth((w) => (w < 85 ? w + (90 - w) * 0.12 : w)), 200);
    };
    const end = () => {
      if (--pending.current > 0) return;
      pending.current = 0;
      clearInterval(timer.current);
      setWidth(100);
      setTimeout(() => { setVisible(false); setWidth(0); }, 260);
    };
    window.addEventListener("api:start", start);
    window.addEventListener("api:end", end);
    return () => { window.removeEventListener("api:start", start); window.removeEventListener("api:end", end); clearInterval(timer.current); };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]" style={{ opacity: visible ? 1 : 0, transition: "opacity .25s" }}>
      <div className="h-full bg-gradient-to-r from-brand-400 to-brand-600 shadow-[0_0_8px_rgba(79,70,229,.6)]" style={{ width: `${width}%`, transition: "width .25s ease-out" }} />
    </div>
  );
}
