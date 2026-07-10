import "./Toast.css";

export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

export default function ToastComponent({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: (id: string) => void;
}) {
  function getToastClasses() {
    if (toast.type === "success") return "toast toast-success";
    else if (toast.type === "error") return "toast toast-error";
    else if (toast.type === "info") return "toast toast-info";
    return "toast";
  }

  if (toast.type === "success") {
  }

  return (
    <div className={getToastClasses()}>
      {toast.message}
      <button onClick={() => onClose(toast.id)}>X</button>
    </div>
  );
}
