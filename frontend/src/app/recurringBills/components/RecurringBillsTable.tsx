import { RecurringBill } from "@/types";

type paidStatus = "paid" | "due" | "overdue";

interface RecurringBillsTableProps {
  recurringBills: RecurringBill[];
}

interface RowProps {
  recurringBill: RecurringBill;
}

const Row: React.FC<RowProps> = ({ recurringBill }) => {
  return (
    <tr className="h-16" key={recurringBill.id}>
      <td>
        <div className="flex items-center">
          <img src={recurringBill.party.iconUrl} className="w-8 rounded-full" />
          <div className="font-bold ml-3">{recurringBill.party.name}</div>
        </div>
      </td>
      <td className="text-sm text-left">
        {/* TODO: ADD STATUS */}
        {recurringBill.dueDate}
      </td>
      <td className="font-bold text-right">
        ${recurringBill.amount.toFixed(2)}
      </td>
    </tr>
  );
};

const RecurringBillsTable = ({ recurringBills }: RecurringBillsTableProps) => {
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
            return <Row recurringBill={recurringBill} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecurringBillsTable;
