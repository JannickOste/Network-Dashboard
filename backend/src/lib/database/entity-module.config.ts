import EntityModuleCollection, { EntityModule } from "./entity-module";

const collections: EntityModuleCollection[] = [

]

const entities: EntityModule[] = collections.flatMap(v => v.getAll());

export default entities;