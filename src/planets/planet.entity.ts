import { Entity, Column,  PrimaryGeneratedColumn, OneToMany} from "typeorm";

@Entity({name: "planets"})
export class Planet{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    size: number;

    @Column()
    distanceWithEarth: number;
}