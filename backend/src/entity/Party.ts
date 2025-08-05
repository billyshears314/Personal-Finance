import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Party {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  iconUrl!: string;
}
