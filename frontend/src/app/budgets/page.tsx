"use client";

import React, { useState, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import SpendingSummaryWidget from "./components/SpendingSummary";
import SpendingCard from "../../components/SpendingCard";
import ContentContainer from "../../components/ContentContainer";
import AddEditBudgetModal from "@/components/modals/AddEditBudgetModal";
import { useAppStore } from "@/stores/useAppStore";

const BudgetPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNewBudget = () => {
    console.log("HANDLE ADD NEW Budget");
    setIsModalOpen(true);
  };

  const { budgets, fetchBudgets, loading } = useAppStore(
    useShallow((state) => ({
      budgets: state.budgets,
      fetchBudgets: state.fetchBudgets,
      loading: state.loading,
      error: state.error,
    }))
  );

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <ContentContainer
          title="Budgets"
          buttonText="+ Add New Budget"
          onButtonClick={handleAddNewBudget}
        >
          <div className="flex flex-col">
            <div className="w-full mb-8 lg:pr-4 lg:w-2/5">
              <SpendingSummaryWidget />
            </div>
            <div className="w-full lg:pl-4 lg:w-3/5">
              {budgets.map((budget) => {
                return (
                  <div className="mb-8" key={budget.id}>
                    <SpendingCard
                      spent={budget.spent}
                      max={budget.max}
                      color={budget.theme.color || "red"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </ContentContainer>
      )}

      {isModalOpen && (
        <AddEditBudgetModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default BudgetPage;
