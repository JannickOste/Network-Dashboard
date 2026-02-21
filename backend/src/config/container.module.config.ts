import { ContainerModule } from "inversify";
import databaseContainerModule from "../lib/database/container.module";
import httpServerContainerModule from "../lib/http-server/container.module";

const modules: ContainerModule[] = [
    databaseContainerModule,
    httpServerContainerModule
]

export default modules;