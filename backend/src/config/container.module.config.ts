import { ContainerModule } from "inversify";
import databaseContainerModule from "../lib/database/container.module";

const modules: ContainerModule[] = [
    databaseContainerModule
]

export default modules;