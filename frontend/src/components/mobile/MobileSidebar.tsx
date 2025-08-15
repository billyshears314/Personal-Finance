"use client";

import React from "react";
import { Box } from "@mui/material";
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
      className={`relative flow-root hover:bg-gray-700 rounded-tl-md rounded-tr-md mt-2 flex-1 ${
        active
          ? "bg-gray-200 text-gray-800 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-[#277C78]"
          : ""
      }`}
    >
      <div className="flex flex-col h-full items-center space-x-4 justify-center">
        {/* TODO: Use class names instead */}
        <Icon fill={active ? "#277C78" : "#B3B3B3"} />
        <span
          className={`hidden md:block text-xxs opacity-75 mt-2 ${
            active ? "text-gray-900" : "text-gray-300 opacity-100"
          }`}
        >
          {text}
        </span>
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
    <Box className="fixed bottom-0 w-full z-50 h-[52px] md:h-[74px] flex flex-row bg-gray-900 text-white rounded-tl-lg rounded-tr-lg px-4">
      <nav className="flex w-full justify-between gap-2">
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
