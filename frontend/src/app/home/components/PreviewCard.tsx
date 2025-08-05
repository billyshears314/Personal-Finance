import { ReactNode } from "react";
import DetailsLink from "../../../components/DetailsLink";

interface PreviewCardProps {
  title: string;
  detailsLink: string;
  detailsLinkText?: string;
  children: ReactNode;
}

const PreviewCard: React.FC<PreviewCardProps> = ({
  title,
  detailsLink,
  detailsLinkText,
  children,
}) => {
  return (
    <div className="container p-6 bg-white rounded-xl">
      <div className="flex items-center mb-4">
        <div className="text-lg font-bold">{title}</div>
        <div className="ml-auto">
          <DetailsLink text={detailsLinkText} link={detailsLink} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default PreviewCard;
