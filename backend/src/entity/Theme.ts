import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  hexColor: string;
}
