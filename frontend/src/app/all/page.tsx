import React from "react";
import DetailsLink from "../../components/DetailsLink";
import MoneyChunk from "../../components/MoneyChunk";
import PreviewWidget from "./components/PreviewWidget";
import MoneyBar from "../../components/MoneyBar";
import SearchBar from "../../components/SearchBar";
import Bar from "../../components/Bar";
import { Button, Select, MenuItem } from "@mui/material";
import TitleWithDot from "../../components/TitleWithDot";
import MoneyRemainingBar from "../../components/MoneyRemainingBar";
import LatestSpendingWidget from "@/components/LatestSpendingWidget";
import SpendingCard from "../../components/SpendingCard";

const AllPage = () => {
  return (
    <div className="p-4">
      {/* <DetailsLink link="/transactions" /> */}
      {/* <MoneyChunk color="green" name="Savings" amount={159} /> */}
      {/* <PreviewWidget title="Transactions" detailsLink="/transactions">
        <div className="mb-2">
          <MoneyBar color="green" name="Savings" amount={159} />
        </div>
        <div className="mb-2">
          <MoneyBar color="green" name="Savings" amount={159} />
        </div>
        <div className="mb-2">
          <MoneyBar color="green" name="Savings" amount={159} />
        </div>
      </PreviewWidget> */}
      {/* <SearchBar placeholderText="Search translation" />
      <Select label="Sort By">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Ten</MenuItem>
      </Select>
      <Button>Prev</Button>
      <Bar value={45} /> */}
      {/* <TitleWithDot title="Savings" /> */}
      {/* <MoneyRemainingBar color="green" spent={15.0} max={50.0} /> */}
      {/* <LatestSpendingWidget /> */}

      <div className="mb-8">
        <SpendingCard />
      </div>
      <div className="mb-8">
        <SpendingCard />
      </div>
    </div>
  );
};

export default AllPage;
