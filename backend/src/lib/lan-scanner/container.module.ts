import { ContainerModule } from "inversify";
import { HostInformationRepository } from "./src/repository/HostInformationRepository";
import { HostInformationService } from "./src/service/HostInformationService";

const lanScannerContainerModule = new ContainerModule((bind) => {
    bind(HostInformationRepository).toSelf().inSingletonScope();
    bind(HostInformationService).toSelf().inSingletonScope();
})

export default lanScannerContainerModule;