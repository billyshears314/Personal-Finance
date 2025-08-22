import { ReactNode, useRef } from "react";
import ReactDOM from "react-dom";
import { useClickAway } from "@/hooks/useClickAway";

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
  const modalRef = useRef<HTMLDivElement>(null);
  useClickAway(modalRef, onClose);

  // useEffect(() => {
  //   const onKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") onClose();
  //   };
  //   document.addEventListener("keydown", onKeyDown);
  //   return () => document.removeEventListener("keydown", onKeyDown);
  // }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg relative w-[560px]"
      >
        <div className="flex mb-5">
          <div className="text-3xl font-bold">{title}</div>
          <button
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-black"
          >
            <img src="images/icon-close-modal.svg" width={25.5} height={25.5} />
          </button>
        </div>
        {description && (
          <div className="text-gray-500 text-sm my-5 leading-normal">
            {description}
          </div>
        )}
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
