import { ReactNode } from "react";
import Button from "../components/Button";

interface ContentContainerProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
  children: ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  title,
  buttonText,
  onButtonClick,
  children,
}) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="text-gray-900 font-bold text-3xl">{title}</div>
        {buttonText && onButtonClick && (
          <div className="ml-auto">
            <Button text={buttonText} onClick={onButtonClick}></Button>
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ContentContainer;
