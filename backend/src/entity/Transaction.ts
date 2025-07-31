import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "date" })
  date: string;

  @Column()
  amount: number;
}
