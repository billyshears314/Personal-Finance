"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  OverviewIcon,
  BudgetsIcon,
  PotsIcon,
  RecurringBillsIcon,
  TransactionsIcon,
} from "@/icons";

interface SidebarProps {
  empty?: string; // just to satisfy error
}

interface SidebarLinkProps {
  link: string;
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  link,
  text,
  Icon,
  active = false,
}) => {
  return (
    <Link
      href={link}
      className={`relative p-2 flow-root hover:bg-gray-700 rounded-tr-md rounded-br-md ${
        active
          ? "bg-gray-200 text-gray-800 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#277C78] "
          : ""
      }`}
    >
      <div className="flex items-center space-x-4 ml-4">
        {/* TODO: Use class names instead */}
        <Icon fill={active ? "#277C78" : "#B3B3B3"} />
        <span>{text}</span>
      </div>
    </Link>
  );
};

const navItems = [
  { href: "/", label: "Overview", icon: OverviewIcon },
  {
    href: "/transactions",
    label: "Transactions",
    icon: TransactionsIcon,
  },
  { href: "/budgets", label: "Budgets", icon: BudgetsIcon },
  { href: "/pots", label: "Pots", icon: PotsIcon },
  {
    href: "/recurringBills",
    label: "Recurring Bills",
    icon: RecurringBillsIcon,
  },
];

const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname();

  return (
    <Box className="fixed w-64 h-full bg-gray-900 text-white flex flex-col min-h-screen rounded-tr-lg rounded-br-lg">
      <div className="p-6 border-gray-700">
        <Typography variant="h6" className="font-bold">
          finance
        </Typography>
      </div>
      <nav className="flex-1 pr-6 space-y-4 text-left">
        {navItems.map((item) => {
          return (
            <SidebarLink
              key={item.label}
              link={item.href}
              text={item.label}
              Icon={item.icon}
              active={item.href === pathname}
            />
          );
        })}
      </nav>
    </Box>
  );
};

export default Sidebar;
