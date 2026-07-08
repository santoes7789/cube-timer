import "./Toast.css";

export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: string;
  message: string;
};

export default function ToastComponent({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: (id: string) => void;
}) {
  return (
    <div className="toast">
      {toast.message}
      <button onClick={() => onClose(toast.id)}>X</button>
    </div>
  );
}
