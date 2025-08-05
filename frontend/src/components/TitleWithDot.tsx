interface TitleWithDotProps {
  title: string;
  theme: string;
}

const TitleWithDot: React.FC<TitleWithDotProps> = ({ title, theme }) => {
  return (
    <div className="flex items-center">
      <div className={`h-4 w-4 bg-category-${theme} rounded-full`}></div>
      <div className="ml-3 text-lg font-bold text-gray-900">{title}</div>
    </div>
  );
};

export default TitleWithDot;
