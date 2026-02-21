import { ContainerModule } from "inversify";
import dataSource from "./data-source";
import { DataSource } from "typeorm";

const databaseContainerModule = new ContainerModule((bind) => {
    bind(DataSource).toConstantValue(dataSource);
})

export default databaseContainerModule;