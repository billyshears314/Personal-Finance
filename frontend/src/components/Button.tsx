type ButtonTypes = "primary" | "secondary";

interface ButtonProps {
  type?: ButtonTypes;
  text: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "primary",
  fullWidth,
  onClick,
}) => {
  const classNames = {
    primary: "bg-gray-900 text-white",
    secondary: "bg-beige-100 text-gray-900 font-bold",
  };

  return (
    <button
      className={`px-3 py-3 rounded ${classNames[type]} ${
        fullWidth ? "w-full" : "w-auto"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
