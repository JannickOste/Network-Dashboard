import EntityModuleCollection from "../lib/database/src/entity-module";
import { lanScannerEntityModule } from "../lib/lan-scanner";

const collections: EntityModuleCollection[] = [
    lanScannerEntityModule
]

const entities: Function[] = collections.flatMap(v => v.getAll() as Function[]);

export default entities;