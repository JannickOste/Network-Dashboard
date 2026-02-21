import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";
import { getContainer } from "./lib/container/container";
import { App } from "./app";

(async() => {
    const container = getContainer()
    const app = new App(container);
    await app.start();
})()
