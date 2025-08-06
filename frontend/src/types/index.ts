export interface Budget {
  id: number;
  name: string;
  spent: number;
  max: number;
  theme: Theme;
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
  entity: Entity;
  category: string;
  date: string;
  amount: number;
  party: Party;
}

export interface RecurringBill {
  id: number;
  entity: Entity;
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
  name: string;
  color: string;
}
