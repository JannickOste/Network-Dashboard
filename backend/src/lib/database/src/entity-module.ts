import { EntitySchema, EntityTarget } from "typeorm";


export default class EntityModuleCollection
{
    public constructor(
        private readonly modules: EntityTarget<any>[] = []
    ) {

    }

    public add(... modules: EntityTarget<any>[]) 
    {
        modules.push(...modules)
    }

    public getAll(){
        return this.modules;
    }
}