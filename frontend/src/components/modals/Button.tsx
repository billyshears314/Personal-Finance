type ButtonTypes = "primary" | "confirm" | "cancel";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: ButtonTypes;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "primary" }) => {
  const classNames = {
    primary: "bg-gray-900 text-white",
    confirm: "bg-beige-100 text-gray-900 font-bold",
    cancel: "bg-beige-100 text-gray-900 font-bold",
  };

  return (
    <button
      className={`px-3 py-3 rounded ${classNames[type]} w-full`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
