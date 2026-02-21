import { Container } from "inversify";
import modules from "../../config/container.module.config";

let container: Container | null = null; 

export function getContainer(): Container 
{
    if(!container) 
    {
        container = new Container();
        container.load(
            ... modules
        )
    }

    return container;
}