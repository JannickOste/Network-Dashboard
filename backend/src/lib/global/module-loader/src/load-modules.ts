import fs from "fs"
import path from "path" 

export type ModuleInfo = {
    filepath: string; 
    modules: any[]
}

export default async function loadModules(
    directory: string, 
    matcher: string | RegExp,
    recursive: boolean = true
) {
    if(!fs.existsSync(directory))
    {
        throw new Error(`Directory doesnt exist: ${directory}`)
    }    
    
    let modules: ModuleInfo[] = []
    const directoryItems = fs.readdirSync(directory, {withFileTypes: true}); 
    for(const dirent of directoryItems)
    {
        if(!dirent.name) continue;
        const currentPath = path.join(dirent.parentPath, dirent.name)
        if(dirent.isDirectory())
        {
            if(recursive)
            {
                modules.push(
                    ... (await loadModules(currentPath, matcher, recursive))
                )
            }
        }

        if(dirent.isFile() && (
            (typeof matcher === "string")
            ? dirent.name === matcher 
            : matcher.test(dirent.name)
        ))
        {
            const module: ModuleInfo = {
                modules: await import(currentPath),
                filepath: currentPath
            }
            
            modules.push(
                module
            )
        }
    }

    return modules;
}