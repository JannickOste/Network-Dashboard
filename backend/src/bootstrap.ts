import "reflect-metadata";

import { App } from "./app";
import { getContainer } from "./lib/container";

(async() => {
    const container = getContainer()
    container.bind(App).toSelf().inSingletonScope();
    const app = container.get(App);
    await app.start();
})()
