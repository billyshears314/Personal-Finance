import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({
  title,
  description,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative min-w-[300px] max-w-[450px]">
        <div className="text-2xl font-bold mb-4">{title}</div>
        {description && (
          <div className="text-gray-500 text-xs my-4">{description}</div>
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
