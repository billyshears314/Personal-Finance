"use client";

import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import TotalBillsCard from "./components/TotalBillsCard";
import SummaryCard from "./components/SummaryCard";
import RecurringBillsTable from "./components/RecurringBillsTable";
import ContentContainer from "../../components/ContentContainer";
import { useAppStore } from "@/stores/useAppStore";

const RecurringBillsPage = () => {
  const { recurringBills, fetchRecurringBills, loading, error } = useAppStore(
    useShallow((state) => ({
      recurringBills: state.recurringBills,
      fetchRecurringBills: state.fetchRecurringBills,
      loading: state.loading,
      error: state.error,
    }))
  );

  useEffect(() => {
    fetchRecurringBills();
  }, [fetchRecurringBills]);

  return (
    <ContentContainer title="Recurring Bills">
      <div className="flex gap-8">
        <div className="w-1/3">
          <div className="mb-4">
            <TotalBillsCard />
          </div>
          <div>
            <SummaryCard />
          </div>
        </div>
        <div className="w-2/3">
          <RecurringBillsTable recurringBills={recurringBills} />
        </div>
      </div>
    </ContentContainer>
  );
};

export default RecurringBillsPage;
