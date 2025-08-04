import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Theme } from "./Theme";

@Entity()
export class Pot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  saved: number;

  @Column()
  target: number;

  @OneToOne(() => Theme, { eager: true })
  @JoinColumn()
  theme: Theme;
}
