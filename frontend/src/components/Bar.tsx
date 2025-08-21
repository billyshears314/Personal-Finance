type BarSize = "small" | "large";
type BarType = "regular" | "add" | "withdraw";

interface BarProps {
  value: number;
  color: string;
  size?: BarSize;
  valueChange?: number | null;
  type?: BarType;
}

const Bar: React.FC<BarProps> = ({
  value,
  valueChange,
  color,
  size = "large",
  type = "regular",
}) => {
  // Don't exceed 100%
  value = Math.min(value, 100);

  const isWithdraw = type === "withdraw";

  return (
    <div
      className={`w-full bg-beige-100 rounded overflow-hidden ${
        size === "large" ? "p-1 h-8" : "h-2"
      }`}
    >
      {type === "add" || type === "withdraw" ? (
        <div className="flex h-full">
          <div
            className={`h-full rounded-l`}
            style={{
              width: isWithdraw ? `${value + valueChange}%` : value + "%",
              backgroundColor: "#201F24",
            }}
          ></div>
          {valueChange !== 0 && (
            <div
              className={"h-full rounded-r ml-[2px]"}
              style={{
                width: Math.abs(valueChange) + "%",
                backgroundColor: isWithdraw ? "#C94736" : "#277C78",
              }}
            ></div>
          )}
        </div>
      ) : (
        <div
          className={`h-full rounded transition-all duration-500 ease-in-out`}
          style={{ width: value + "%", backgroundColor: color }}
        ></div>
      )}
    </div>
  );
};

export default Bar;
