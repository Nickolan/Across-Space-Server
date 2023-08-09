import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Planet} from 'src/planets/planet.entity'

@Entity({name: 'satellites'})
export class Satellite{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    size: number;

    @Column()
    planetId: number;

    @ManyToOne(() => Planet, planet => planet.satellite)
    planet: Planet;
}