import { War } from "./war";
import { Hero } from "./hero";
import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class Tribe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Hero, (hero) => hero.relatedTribe)
  heroes: Hero[];

  @ManyToMany(() => War)
  @JoinTable({
    name: "WarTribe",
    joinColumn: {
      name: "warId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tribeId",
      referencedColumnName: "id",
    },
  })
  wars: War[];
}
