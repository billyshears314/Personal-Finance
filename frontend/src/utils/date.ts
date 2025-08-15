// Takes a date in the format YYYY-MM-DD and returns as DD MMM YYYY
// e.g. 2024-08-19 becomes 8 Aug 2024
export const formatDate = (str: string) => {
  const [year, month, day] = str.split("-").map(Number);

  const date = new Date(year, month - 1, day);
  const dayNum = date.getDate(); // Removes any leading zeros
  const monthName = date.toLocaleString("en-US", { month: "short" });

  return `${dayNum} ${monthName} ${year}`;
};
