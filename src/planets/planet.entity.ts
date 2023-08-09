import { Entity, Column,  PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Satellite } from "src/satellites/satellite.entity";

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

    @OneToMany(() => Satellite, satellite => satellite.planet)
    satellite: Satellite[];
}