interface TitleWithDotProps {
  title: string;
  color: string;
}

const TitleWithDot: React.FC<TitleWithDotProps> = ({ title, color }) => {
  return (
    <div className="flex items-center">
      <div
        className={`h-4 w-4 rounded-full`}
        style={{ backgroundColor: color }}
      ></div>
      <div className="ml-3 text-lg font-bold text-gray-900">{title}</div>
    </div>
  );
};

export default TitleWithDot;
