import EntityModuleCollection, { EntityModule } from "../lib/database/entity-module";

const collections: EntityModuleCollection[] = [

]

const entities: EntityModule[] = collections.flatMap(v => v.getAll());

export default entities;