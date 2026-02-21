
export type EntityModule<T = unknown> = (... args: unknown[]) => T;

export default class EntityModuleCollection
{
    public constructor(
        private readonly modules: Readonly<EntityModule[]> = []
    ) {

    }

    public add(... modules: EntityModule[]) 
    {
        modules.push(...modules)
    }

    public getAll(){
        return this.modules;
    }
}