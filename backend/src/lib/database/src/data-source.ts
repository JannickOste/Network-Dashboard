import "reflect-metadata";
import { DataSource } from "typeorm";
import entities from "../../../config/entity-module.config";

const dataSource: DataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST || "mariadb",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "appuser",
    password: process.env.DB_PASSWORD || "apppassword",
    database: process.env.DB_DATABASE || "app",
    synchronize: true,
    logging: true,
    entities: [...entities],
    migrations: ["lib/database/migrations/*.ts"],
});

export default dataSource;