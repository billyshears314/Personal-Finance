import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  //TODO: THEME
}
