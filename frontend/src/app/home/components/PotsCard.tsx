"use client";

import PreviewCard from "./PreviewCard";
import MoneyChunk from "../../../components/MoneyChunk";
import { Pot } from "@/types";

interface PotsCardProps {
  pots: Pot[];
  totalSaved: number;
}

const PotsCard = ({ pots, totalSaved }: PotsCardProps) => {
  return (
    <PreviewCard title="Pots" detailsLink="/pots">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex w-full md:w-2/5 p-4 bg-beige-100 rounded-xl items-center">
          <div className="h-full flex justify-center mr-8">
            <img src="images/icon-pot.svg" width="40" className="w-10" />
          </div>
          <div>
            <div className="text-gray-500 mb-4">Total Saved</div>
            <div className="text-4xl font-bold text-gray-900 tracking-wider">
              {`$${totalSaved}`}
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/5 flex flex-wrap">
          {pots.length > 0 &&
            pots.map((pot: Pot) => {
              return (
                <div className="w-1/2 mb-2 h-1/2" key={pot.name}>
                  <MoneyChunk
                    color={pot.theme.color || "red"}
                    name={pot.name}
                    amount={pot.saved}
                    showCents={false}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </PreviewCard>
  );
};

export default PotsCard;
