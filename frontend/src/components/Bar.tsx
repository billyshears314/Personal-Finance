interface BarProps {
  value: number;
  color: string;
}

const Bar: React.FC<BarProps> = ({ value, color }) => {
  return (
    <div className="w-full h-8 bg-beige-100 p-1 rounded">
      <div
        className={`h-full bg-category-${color} rounded`}
        style={{ width: value + "%" }}
      ></div>
    </div>
  );
};

export default Bar;
