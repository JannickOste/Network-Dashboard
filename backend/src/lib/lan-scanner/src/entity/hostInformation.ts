import { Column, Entity, PrimaryGeneratedColumn, EntitySchema } from "typeorm";
import "reflect-metadata";
@Entity()
export default class HostInformation extends EntitySchema {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public ipAddress!: string;

    @Column("simple-array", {
        transformer: {
            to: (value: number[]) => value.join(","),
            from: (value: string[]) =>
                value ? value.map(v => parseInt(v)) : [],
        },
    })
    public portList: number[] = []
}