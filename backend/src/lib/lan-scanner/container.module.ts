import { ContainerModule } from "inversify";
import { HostInformationRepository } from "./src/repository/HostInformationRepository";
import { HostInformationService } from "./src/service/HostInformationService";
import HostInformationResolver from "./src/resolver/HostInformationResolver";
import HostProbeService from "./src/service/HostProbeService";
import PortProbeService from "./src/service/PortProbeService";
import PortInformationResolver from "./src/resolver/PortInformationResolver";
import NetworkInformationManager from "./src/manager/networkInformationManager";
import NetworkProbeService from "./src/service/NetworkProbeService";

const lanScannerContainerModule = new ContainerModule((bind) => {
    bind(HostInformationRepository).toSelf().inSingletonScope();
    bind(HostInformationService).toSelf().inSingletonScope();
    bind(NetworkInformationManager).toSelf().inSingletonScope();

    bind(NetworkProbeService).toSelf().inSingletonScope();
    bind(HostProbeService).toSelf().inSingletonScope();
    bind(PortProbeService).toSelf().inSingletonScope();
    
    bind(PortInformationResolver).toSelf().inSingletonScope();
    bind(HostInformationResolver).toSelf().inSingletonScope();
})

export default lanScannerContainerModule;