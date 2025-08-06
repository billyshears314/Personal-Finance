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
    console.log("HANDLE ADD NEW POT");
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

  // const potData = [
  //   {
  //     name: "Savings",
  //     currentValue: 159,
  //     target: 2000,
  //     theme: "green",
  //   },
  //   {
  //     name: "Concert Ticket",
  //     currentValue: 110,
  //     target: 150,
  //     theme: "yellow",
  //   },
  //   {
  //     name: "Gift",
  //     currentValue: 40,
  //     target: 60,
  //     theme: "cyan",
  //   },
  //   {
  //     name: "New Laptop",
  //     currentValue: 10,
  //     target: 1000,
  //     theme: "navy",
  //   },
  //   {
  //     name: "Holiday",
  //     currentValue: 531,
  //     target: 1440,
  //     theme: "red",
  //   },
  // ];

  return (
    <>
      <ContentContainer
        title="Pots"
        buttonText="+ Add New Pot"
        onButtonClick={handleAddNewPot}
      >
        {loading ? (
          <div>Loading</div>
        ) : (
          <div className="flex flex-wrap justify-start gap-4">
            {pots.map((pot) => {
              return (
                <div className="w-[calc(50%-8px)] pb-4" key={pot.name}>
                  <PotCard
                    title={pot.name}
                    currentValue={pot.saved}
                    target={pot.target}
                    color={pot.theme.color}
                  />
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
