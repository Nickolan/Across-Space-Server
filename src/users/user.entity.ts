import { Entity, Column,  PrimaryGeneratedColumn} from "typeorm";

export type AccessLevel = "User" | "Admin";

@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: true})
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    image: string;

    @Column({type: 'enum', enum: ["User", "Admin"], default: "User"})
    AccessLevel: AccessLevel;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}