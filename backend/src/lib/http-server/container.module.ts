import { ContainerModule } from "inversify";
import { HttpServer } from "./src/server";

const httpServerContainerModule = new ContainerModule((bind) => {
    bind(HttpServer).toSelf().inSingletonScope()
})


export default httpServerContainerModule;