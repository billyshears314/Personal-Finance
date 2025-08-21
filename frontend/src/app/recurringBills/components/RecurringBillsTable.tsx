import { RecurringBill } from "@/types";

// type paidStatus = "paid" | "due" | "overdue";

interface RecurringBillsTableProps {
  recurringBills: RecurringBill[];
}

interface RowProps {
  recurringBill: RecurringBill;
}

const RowDesktop: React.FC<RowProps> = ({ recurringBill }) => {
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

const RowMobile: React.FC<RowProps> = ({ recurringBill }) => {
  return (
    <tr key={recurringBill.id}>
      <td className="flex flex-col">
        <div className="flex items-center mt-6">
          <img src={recurringBill.party.iconUrl} className="w-8 rounded-full" />
          <div className="font-bold ml-3">{recurringBill.party.name}</div>
        </div>
        <div className="mt-2 mb-4 text-sm">{recurringBill.dueDate}</div>
      </td>
      <td className="font-bold text-right align-bottom pb-4">
        ${recurringBill.amount.toFixed(2)}
      </td>
    </tr>
  );
};

const RecurringBillsTableDesktop = ({
  recurringBills,
}: RecurringBillsTableProps) => {
  return (
    <div className="bg-white rounded-xl p-8">
      <table className="w-full">
        <thead className="hidden md:table-header-group">
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
              <RowDesktop
                recurringBill={recurringBill}
                key={recurringBill.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const RecurringBillsTableMobile = ({
  recurringBills,
}: RecurringBillsTableProps) => {
  return (
    <div className="bg-white rounded-xl p-4">
      <table className="w-full">
        <tbody className="divide-y">
          {recurringBills.map((recurringBill) => {
            return (
              <RowMobile recurringBill={recurringBill} key={recurringBill.id} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const RecurringBillsTable = ({ recurringBills }: RecurringBillsTableProps) => {
  return (
    <>
      <div className="hidden md:block">
        <RecurringBillsTableDesktop recurringBills={recurringBills} />
      </div>
      <div className="block md:hidden">
        <RecurringBillsTableMobile recurringBills={recurringBills} />
      </div>
    </>
    // <div className="bg-white rounded-xl p-8">
    //   <table className="w-full">
    //     <thead className="hidden md:table-header-group">
    //       <tr className="border-b h-10">
    //         <th className="text-gray-500 font-normal text-sm text-left">
    //           Bill Title
    //         </th>
    //         <th className="text-gray-500 font-normal text-sm text-left">
    //           Due Date
    //         </th>
    //         <th className="text-gray-500 font-normal text-sm text-right">
    //           Amount
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody className="divide-y">
    //       {recurringBills.map((recurringBill) => {
    //         return <Row recurringBill={recurringBill} key={recurringBill.id} />;
    //       })}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default RecurringBillsTable;
