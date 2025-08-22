import { useRef } from "react";
import { useClickAway } from "@/hooks/useClickAway";

interface PopupProps {
  labels: string[];
  onClicks: ((e: React.MouseEvent<HTMLButtonElement>) => void)[];
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ labels, onClicks, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickAway(modalRef, onClose);

  return (
    <div
      ref={modalRef}
      className="absolute top-5 right-0 whitespace-nowrap flex flex-col divide-y bg-white py-2 px-4 border rounded-lg"
    >
      {labels.map((label, index) => {
        return (
          <button
            key={label}
            onClick={onClicks[index]}
            className="text-left py-2"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default Popup;
