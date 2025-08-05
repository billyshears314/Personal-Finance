import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Theme } from "./Theme";
import { Transaction } from "./Transaction";

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column("numeric")
  spent!: number;

  @Column("numeric")
  max!: number;

  @OneToOne(() => Theme, { eager: true })
  @JoinColumn()
  theme!: Theme;

  @OneToMany(() => Transaction, (transaction) => transaction.budget)
  transactions: Transaction[];
}
