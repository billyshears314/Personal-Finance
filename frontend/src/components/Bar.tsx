interface BarProps {
  value: number;
  color: string;
}

const Bar: React.FC<BarProps> = ({ value, color }) => {
  // Don't exceed 100%
  value = Math.min(value, 100);

  return (
    <div className="w-full h-8 bg-beige-100 p-1 rounded">
      <div
        className={`h-full rounded`}
        style={{ width: value + "%", backgroundColor: color }}
      ></div>
    </div>
  );
};

export default Bar;
