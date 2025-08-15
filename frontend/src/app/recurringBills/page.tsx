"use client";

import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import TotalBillsCard from "./components/TotalBillsCard";
import SummaryCard from "./components/SummaryCard";
import RecurringBillsTable from "./components/RecurringBillsTable";
import ContentContainer from "../../components/ContentContainer";
import { useAppStore } from "@/stores/useAppStore";

const RecurringBillsPage = () => {
  const { recurringBills, fetchRecurringBills } = useAppStore(
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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 md-only:flex md-only:flex-row md-only:items-stretch md-only:gap-4">
          <div className="mb-4 md:mb-0 md-only:w-1/2 md-only:flex-1 md-only:flex-col">
            <TotalBillsCard />
          </div>
          <div className="md-only:w-1/2 md-only:flex-1 md-only:flex-col">
            <SummaryCard />
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          <RecurringBillsTable recurringBills={recurringBills} />
        </div>
      </div>
    </ContentContainer>
  );
};

export default RecurringBillsPage;
