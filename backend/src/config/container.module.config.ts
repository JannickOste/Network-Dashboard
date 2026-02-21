import { ContainerModule } from "inversify";
import databaseContainerModule from "../lib/database/container.module";
import httpServerContainerModule from "../lib/http-server/container.module";
import lanScannerContainerModule from "../lib/lan-scanner/container.module";

const modules: ContainerModule[] = [
    databaseContainerModule,
    httpServerContainerModule,
    lanScannerContainerModule
]

export default modules;