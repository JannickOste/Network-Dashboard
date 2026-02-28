import { Column, Entity, PrimaryGeneratedColumn, EntitySchema } from "typeorm";
import "reflect-metadata";
@Entity()
export default class HostInformation {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public ipAddress!: string;
    
    @Column({
        type: "json",
    })
    public portList: number[] = [];
}