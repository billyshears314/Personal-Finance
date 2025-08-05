"use client";

import PreviewCard from "./PreviewCard";
import MoneyChunk from "../../../components/MoneyChunk";
import { Pot } from "@/types";
// import { AppState, useAppStore } from "@/stores/useAppStore";

interface PotsCardProps {
  pots: Pot[];
}

const PotsCard = ({ pots }: PotsCardProps) => {
  // const potData = useAppStore((state: AppState) => {
  //   return {
  //     totalSaved: state.getPotsTotalSaved(),
  //     pots: pots.slice(0, 4),
  //   };
  // });

  const potData: any = [];

  return (
    <PreviewCard title="Pots" detailsLink="/pots">
      <div className="flex gap-4">
        <div className="flex w-2/5 p-4 bg-beige-100 rounded-xl">
          <div className="h-full flex justify-center mr-8">
            <img src="images/icon-pot.svg" className="w-10" />
          </div>
          <div>
            <div className="text-gray-500 mb-4">Total Saved</div>
            <div className="text-4xl font-bold text-gray-900 tracking-wider">
              {`$${potData.totalSaved}`}
            </div>
          </div>
        </div>
        <div className="w-3/5 flex flex-wrap">
          {potData.length > 0 &&
            potData.pots.map((pot: any) => {
              return (
                <div className="w-1/2 mb-2 h-1/2" key={pot.name}>
                  <MoneyChunk
                    color="green"
                    name={pot.name}
                    amount={pot.saved}
                    showCents={false}
                  />
                </div>
              );
            })}
          {/* <MoneyChunk
              color="green"
              name="Savings"
              amount={159}
              showCents={false}
            /> */}
          {/* </div> */}
          {/* <div className="w-1/2 mb-2 h-1/2">
            <MoneyChunk
              color="green"
              name="Savings"
              amount={159}
              showCents={false}
            />
          </div>
          <div className="w-1/2 mb-2 h-1/2">
            <MoneyChunk
              color="cyan"
              name="Gift"
              amount={40}
              showCents={false}
            />
          </div>
          <div className="w-1/2 mb-2 h-1/2">
            <MoneyChunk
              color="navy"
              name="Concert Ticket"
              amount={110}
              showCents={false}
            />
          </div>
          <div className="w-1/2 mb-2 h-1/2">
            <MoneyChunk
              color="yellow"
              name="New Laptop"
              amount={10}
              showCents={false}
            />
          </div> */}
        </div>
      </div>
    </PreviewCard>
  );
};

export default PotsCard;
