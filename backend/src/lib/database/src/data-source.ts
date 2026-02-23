import "reflect-metadata";
import { DataSource } from "typeorm";
import entities from "../../../config/entity-module.config";

const dataSource: DataSource = new DataSource({
    type: "better-sqlite3",
    database: "db.sqlite",
    synchronize: true,
    logging: true,
    entities: [...entities],
    migrations: ["lib/database/migrations/*.ts"],
});;

export default dataSource;