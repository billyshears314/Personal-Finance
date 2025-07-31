import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RecurringBill {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: Entity

  @Column()
  dueDate: string;

  @Column()
  amount: number;
}
