import path from "path";
import loadModules from "../../module-loader/src/load-modules";
import { App } from "../../../app";

let initialized = false; 
export default async function loadControllers(

) {
    if(initialized) return; 

    initialized = true;
    await loadModules(
        path.join(App.AppRoot, "controllers"), 
        "route.ts"
    )
}