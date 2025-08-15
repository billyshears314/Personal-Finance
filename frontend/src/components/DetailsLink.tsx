import React from "react";
import Link from "next/link";

interface DetailsLinkProps {
  text?: string;
  link: string;
}

const DetailsLink: React.FC<DetailsLinkProps> = ({
  text = "See Details",
  link,
}) => {
  return (
    <Link href={{ pathname: link }} className="flex">
      <div className="mr-3 text-base text-gray-500">{text}</div>
      <img src="/images/icon-caret-right.svg" width="5" height="auto" />
    </Link>
  );
};

export default DetailsLink;
