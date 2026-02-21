
import EntityModuleCollection from "../database/src/entity-module";
import HostInformation from "./src/entity/hostInformation";

const lanScannerEntityModule = new EntityModuleCollection(
     [HostInformation]
)

export default lanScannerEntityModule;