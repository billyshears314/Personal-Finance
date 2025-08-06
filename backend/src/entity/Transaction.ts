import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Party } from "./Party";
import { Budget } from "./Budget";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  date!: string;

  @Column("float")
  amount!: number;

  @OneToOne(() => Party, { eager: true })
  @JoinColumn()
  party!: Party;

  @ManyToOne(() => Budget, (budget) => budget.transactions)
  budget: Budget;
}
