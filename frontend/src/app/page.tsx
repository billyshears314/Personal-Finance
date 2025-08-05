"use client";

import React from "react";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Card,
//   CardContent,
//   Button,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import MoneyBlock from "../components/MoneyBlock";
import {
  BudgetsCard,
  PotsCard,
  RecurringBillsCard,
  TransactionsCard,
  MoneyCard,
} from "./home/components";

import ContentContainer from "@/components/ContentContainer";
import { useAppStore } from "@/stores/useAppStore";

const Home = () => {
  const balance = useAppStore((state) => state.balance);
  const income = useAppStore((state) => state.income);
  const expenses = useAppStore((state) => state.expenses);
  const pots = useAppStore((state) => state.pots);

  return (
    <ContentContainer title="Overview">
      <div className="flex gap-4 mb-8">
        <div className="w-1/3">
          <MoneyCard title="Current Balance" amount={balance} type="active" />
        </div>
        <div className="w-1/3">
          <MoneyCard title="Income" amount={income} />
        </div>
        <div className="w-1/3">
          <MoneyCard title="Expenses" amount={expenses} />
        </div>
      </div>
      <div className="columns-2">
        <div className="mb-4">
          <PotsCard pots={pots} />
        </div>
        <div className="mb-4 pb-20">
          <TransactionsCard />
        </div>
        <div className="mb-4">
          <BudgetsCard />
        </div>
        <div className="mb-4">
          <RecurringBillsCard />
        </div>
      </div>
    </ContentContainer>
    // <div className="flex h-screen">
    //   Main Content
    //   <div className="flex-1 bg-gray-100">
    //     {/* Top Bar */}
    //     <AppBar position="static" className="bg-white shadow">
    //       <Toolbar>
    //         <IconButton
    //           edge="start"
    //           color="inherit"
    //           aria-label="menu"
    //           sx={{ mr: 2 }}
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Typography variant="h6" className="flex-1 text-gray-800">
    //           Dashboard
    //         </Typography>
    //       </Toolbar>
    //     </AppBar>

    //     {/* Dashboard Content */}
    //     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //       {/* Widget 1 */}
    //       <Card className="shadow">
    //         <CardContent>
    //           <Typography variant="h6" gutterBottom>
    //             Widget 1
    //           </Typography>
    //           <Typography color="textSecondary">Some content here</Typography>
    //         </CardContent>
    //       </Card>

    //       {/* Widget 2 */}
    //       <Card className="shadow">
    //         <CardContent>
    //           <Typography variant="h6" gutterBottom>
    //             Widget 2
    //           </Typography>
    //           <Typography color="textSecondary">Some content here</Typography>
    //         </CardContent>
    //       </Card>

    //       {/* Widget 3 */}
    //       <Card className="shadow">
    //         <CardContent>
    //           <Typography variant="h6" gutterBottom>
    //             Widget 3
    //           </Typography>
    //           <Typography color="textSecondary">Some content here</Typography>
    //         </CardContent>
    //       </Card>

    //       {/* Widget 4 */}
    //       <Card className="shadow">
    //         <CardContent>
    //           <Typography variant="h6" gutterBottom>
    //             Widget 4
    //           </Typography>
    //           <Typography color="textSecondary">Some content here</Typography>
    //         </CardContent>
    //       </Card>
    //     </div>
    //     <div className="p-6 flex flex-wrap">
    //       <div className="w-full sm:w-1/2 lg:w-1/3 px-2">
    //         <MoneyBlock label="Current Balance" value="$4,836.00" />
    //       </div>
    //       <div className="w-full sm:w-1/2 lg:w-1/3 px-2">
    //         <MoneyBlock label="Income" value="$3,814.25" />
    //       </div>
    //       <div className="w-full sm:w-1/2 lg:w-1/3 px-2">
    //         <MoneyBlock label="Expenses" value="$1,700.50" />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
