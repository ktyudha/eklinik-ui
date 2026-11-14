import { useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "./Modal";

interface Opts { title: string; message?: string; confirmLabel?: string; danger?: boolean }

function Sheet({ title, message, confirmLabel = "Ya", danger, done }: Opts & { done: (ok: boolean) => void }) {
  const [busy] = useState(false);
  return (
    <Modal onOpen title={title} modalSize="sm" onClose={() => done(false)}>
      {message && <p className="text-sm text-gray-500">{message}</p>}
      <div className="mt-2 grid gap-2.5">
        <button disabled={busy} onClick={() => done(true)}
          className={`h-11 rounded-xl font-semibold text-white transition-colors ${danger ? "bg-error-500 hover:bg-error-600" : "bg-primary hover:bg-brand-dark"}`}>
          {confirmLabel}
        </button>
        <button onClick={() => done(false)} className="h-11 rounded-xl font-semibold text-gray-600 hover:bg-gray-100">Batal</button>
      </div>
    </Modal>
  );
}

/** Konfirmasi lewat bottom sheet: `if (!(await ask({...}))) return;` */
export function ask(opts: Opts): Promise<boolean> {
  return new Promise((resolve) => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);
    const done = (ok: boolean) => { root.unmount(); host.remove(); resolve(ok); };
    root.render(<Sheet {...opts} done={done} />);
  });
}
