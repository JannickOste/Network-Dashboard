import { ContainerModule } from "inversify";
import { HostInformationRepository } from "./src/repository/HostInformationRepository";

const lanScannerContainerModule = new ContainerModule((bind) => {
    bind(HostInformationRepository).toSelf().inSingletonScope();
})

export default lanScannerContainerModule;