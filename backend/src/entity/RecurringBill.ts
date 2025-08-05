import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Party } from "./Party";

@Entity()
export class RecurringBill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  dueDate!: string;

  @Column("numeric")
  amount!: number;

  @OneToOne(() => Party, { eager: true })
  @JoinColumn()
  party!: Party;
}
