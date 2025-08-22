export interface Budget {
  id: number;
  name: string;
  spent: number;
  max: number;
  theme: Theme;
  transactions?: Transaction[];
}

export interface Pot {
  id: number;
  name: string;
  saved: number;
  target: number;
  theme: Theme;
}

export interface Entity {
  id: number;
  name: string;
  iconSrc: string;
}

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  party: Party;
  budget: Budget;
}

export interface RecurringBill {
  id: number;
  dueDate: string;
  amount: number;
  party: Party;
}

export interface Party {
  id: number;
  name: string;
  iconUrl: string;
}

export interface Theme {
  id: number;
  name?: string;
  color?: string;
}

export interface SvgIconProps {
  fill?: string;
}

export interface PaginationMetaData {
  total: number;
  page: number;
  lastPage: number;
}

export type BarType = "regular" | "add" | "withdraw";
