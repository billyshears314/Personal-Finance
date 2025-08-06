import { RecurringBill } from "@/types";

type paidStatus = "paid" | "due" | "overdue";

interface RecurringBillsTableProps {
  recurringBills: RecurringBill[];
}

const RecurringBillsTable = ({ recurringBills }: RecurringBillsTableProps) => {
  const row = (bill: RecurringBill, status: paidStatus) => {
    return (
      <tr className="h-16" key={bill.id}>
        <td>
          <div className="flex items-center">
            <img src={bill.party?.iconUrl} className="w-8 rounded-full" />
            <div className="font-bold ml-3">{bill.party?.name}</div>
          </div>
        </td>
        <td className="text-sm text-left">
          {bill.dueDate} {status}
        </td>
        <td className="font-bold text-right">${bill.amount.toFixed(2)}</td>
      </tr>
    );
  };

  return (
    <div className="bg-white rounded-xl p-8">
      <table className="w-full">
        <thead>
          <tr className="border-b h-10">
            <th className="text-gray-500 font-normal text-sm text-left">
              Bill Title
            </th>
            <th className="text-gray-500 font-normal text-sm text-left">
              Due Date
            </th>
            <th className="text-gray-500 font-normal text-sm text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {recurringBills.map((recurringBill) => {
            return <>{row(recurringBill, "paid")}</>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecurringBillsTable;
