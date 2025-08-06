"use client";

import React, { useState, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import PotCard from "./components/PotCard";
import Button from "../../components/Button";
import ContentContainer from "../../components/ContentContainer";
import AddEditPotModal from "../../components/modals/AddEditPotModal";
import { useAppStore } from "@/stores/useAppStore";

const PotsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNewPot = () => {
    setIsModalOpen(true);
  };

  const { pots, fetchPots, loading, error } = useAppStore(
    useShallow((state) => ({
      pots: state.pots,
      fetchPots: state.fetchPots,
      loading: state.loading,
      error: state.error,
    }))
  );

  useEffect(() => {
    fetchPots();
  }, [fetchPots]);

  return (
    <>
      <ContentContainer
        title="Pots"
        buttonText="+ Add New Pot"
        onButtonClick={handleAddNewPot}
      >
        {loading && pots.length === 0 ? (
          <div>Loading</div>
        ) : (
          <div className="flex flex-wrap justify-start gap-4">
            {pots.map((pot) => {
              return (
                <div className="w-[calc(50%-8px)] pb-4" key={pot.id}>
                  <PotCard pot={pot} />
                </div>
              );
            })}
            <div className="flex-grow"></div>
          </div>
        )}
      </ContentContainer>

      {isModalOpen && <AddEditPotModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default PotsPage;
