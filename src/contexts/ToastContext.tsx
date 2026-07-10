import ToastComponent, { type Toast, type ToastType } from "@/components/Toast";
import { createContext, useContext, useState, type ReactNode } from "react";

type ToastContextType = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
};

const toastTimeout = 5000;

const ToastContext = createContext<ToastContextType>({
  success: () => {},
  error: () => {},
  info: () => {},
});

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("ToastContext missing");
  return ctx;
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((e) => e.id !== id));
    }, toastTimeout);
  };

  const onClose = (id: string) => {
    setToasts((prev) => prev.filter((e) => e.id !== id));
  };

  const value = {
    success: (message: string) => addToast("success", message),
    error: (message: string) => addToast("error", message),
    info: (message: string) => addToast("info", message),
  };

  return (
    <ToastContext value={value}>
      <div className="toast-container">
        {toasts.map((toast) => (
          <ToastComponent toast={toast} onClose={onClose} key={toast.id} />
        ))}
      </div>
      {children}
    </ToastContext>
  );
}
