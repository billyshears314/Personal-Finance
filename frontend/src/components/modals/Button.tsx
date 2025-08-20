type ButtonTypes = "primary" | "confirm" | "cancel";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: ButtonTypes;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "primary" }) => {
  const classNames = {
    primary: "bg-gray-900 text-white",
    confirm: "bg-[#C94736] text-white opacity-80 py-5",
    cancel: "bg-white-100 text-gray-900 py-5",
  };

  return (
    <button
      className={`px-3 py-3 rounded-lg ${classNames[type]} w-full`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
