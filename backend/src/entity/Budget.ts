import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Theme } from "./Theme";

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  spent: number;

  @Column()
  max: number;

  @OneToOne(() => Theme, { eager: true })
  @JoinColumn()
  theme: Theme;
}
