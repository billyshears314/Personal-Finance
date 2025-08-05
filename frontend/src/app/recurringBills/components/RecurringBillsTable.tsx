import { RecurringBill } from "@/types";

type paidStatus = "paid" | "due" | "overdue";

interface RecurringBillsTableProps {
  recurringBills: RecurringBill[];
}

const RecurringBillsTable = ({ recurringBills }: RecurringBillsTableProps) => {
  const row = (
    billTitle: string,
    billIcon: string,
    dueDate: string,
    amount: number,
    status: paidStatus
  ) => {
    return (
      <tr className="h-16">
        <td>
          <div className="flex items-center">
            <img src={billIcon} className="w-8 rounded-full" />
            <div className="font-bold ml-3">{billTitle}</div>
          </div>
        </td>
        <td className="text-sm text-left">
          {dueDate} {status}
        </td>
        {/* <td className="font-bold text-right">${amount.toFixed(2)}</td> */}
        <td className="font-bold text-right">{typeof amount}</td>
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
            return (
              <>
                {/* // <div key={recurringBill.id}> */}
                {row(
                  recurringBill.party.name,
                  recurringBill.party.iconUrl,
                  recurringBill.dueDate,
                  recurringBill.amount,
                  "paid"
                )}
                {/* // </div> */}
              </>
            );
          })}
          {/* // {row("Spark Electric Solutions", "Monthly-2nd", 100.0, "paid")}
          // {row("Serenity Spa & Wellness", "Monthly-3rd", 30.0, "paid")}
          // {row("Nimbus Data Storage", "Monthly-21st", 9.99, "overdue")}
          // {row("EcoFuel Energy", "Monthly-29th", 35.0, "due")} */}
        </tbody>
      </table>
    </div>
  );
};

export default RecurringBillsTable;
