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
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ type: "float", default: 0 })
  saved!: number;

  @Column("float")
  target!: number;

  @OneToOne(() => Theme, { eager: true })
  @JoinColumn()
  theme!: Theme;
}
